use bcrypt::{hash, verify, DEFAULT_COST};
use serde_json::Value;
use sqlx::{Pool, Postgres};
use tauri::State;

pub struct DbPool(pub Pool<Postgres>);

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct UserData {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub role: String,
    pub password: String,
    // pub source: String,
}

//@ Регистрация студента
#[tauri::command]
pub async fn register_student(pool: State<'_, DbPool>, values: Value) -> Result<(), String> {
    let username = values.get("username").unwrap().as_str().unwrap();
    let email = values.get("email").unwrap().as_str().unwrap();
    let password = values.get("password").unwrap().as_str().unwrap();
    
    let phone = match values.get("phone") {
        Some(v) => match v.as_str() {
            Some(phone_str) => Ok(Some(phone_str)),
            None => Err("Phone number must be a string.".to_string()),
        },
        None => Ok(None),
    }?;

    let password_hash = hash(password, DEFAULT_COST).expect("Failed to hash password");
    sqlx::query!(
        "INSERT INTO students (username, email, password, role, phone) VALUES ($1, $2, $3, 'student', $4)",
        username,
        email,
        password_hash,
        phone
    )
    .execute(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn authenticate_user(
    pool: State<'_, DbPool>,
    email: String,
    password: String,
) -> Result<Option<UserData>, String> {
    // Проверяем, введен ли пароль
    if password.is_empty() {
        return Err("Password is required".into());
    }

    // Извлекаем данные пользователя из базы данных
    let user_data_option = sqlx::query_as::<_, UserData>(
        "SELECT id, username, email, 'student' as role, password FROM students WHERE email = $1
         UNION ALL
         SELECT id, username, email, 'teacher' as role, password FROM teachers WHERE email = $1
         UNION ALL
         SELECT id, username, email, 'administrator' as role, password FROM administrators WHERE email = $1"
    )
    .bind(&email)
    .fetch_optional(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    //? Проверяем, найден ли пользователь с таким email
    if let Some(user_data) = user_data_option {
        //? Проверяем совпадение пароля в базе данных
        if verify(&password, &user_data.password).unwrap_or(false) {
            //? Если пароль совпадает, возвращаем данные пользователя без пароля
            return Ok(Some(UserData {
                password: "".to_string(),
                ..user_data
            }));
        }
    }

    //? Если пользователь не найден или пароль неверен, возвращаем ошибку
    Err("User not found or password incorrect".into())
}

//@ Получение данных ползователя по id
#[tauri::command]
pub async fn fetch_user_data(
    pool: State<'_, DbPool>,
    user_id: i32,
    source: String,
) -> Result<Option<UserData>, String> {
    let query = match source.as_str() {
        "students" => "SELECT id, username, email, 'student' as role, password FROM students WHERE id = $1",
        "teachers" => "SELECT id, username, email, 'teacher' as role, password FROM teachers WHERE id = $1",
        "administrators" => "SELECT id, username, email, 'administrator' as role, password FROM administrators WHERE id = $1",
        _ => return Err("Invalid source".into()),
    };

    let user = sqlx::query_as::<_, UserData>(query)
        .bind(user_id)
        .fetch_optional(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    Ok(user)
}
