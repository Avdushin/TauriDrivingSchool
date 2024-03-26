use bcrypt::{hash, verify, DEFAULT_COST};
use serde_json::Value;
#[warn(non_snake_case)]
use sqlx::{Pool, Postgres};
use tauri::State;

pub struct DbPool(pub Pool<Postgres>);

// Регистрация студента
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

// Функция аутентификации
#[tauri::command]
pub async fn authenticate_user(
    pool: State<'_, DbPool>,
    email: String,
    password: String,
) -> Result<bool, String> {
    let query = "
        (SELECT password FROM students WHERE email = $1)
        UNION
        (SELECT password FROM teachers WHERE email = $1)
        UNION
        (SELECT password FROM administrators WHERE email = $1)
    ";

    let record = sqlx::query_as::<_, (String,)>(query)
        .bind(&email)
        .fetch_optional(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    match record {
        Some((hashed_password,)) => {
            if verify(password, &hashed_password).expect("Password verification failed") {
                Ok(true)
            } else {
                Err("Password incorrect".into())
            }
        }
        None => Err("User not found".into()),
    }
}
