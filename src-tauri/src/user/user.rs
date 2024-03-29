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

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct TimetableEntry {
    pub id: i32,
    pub date: String,
    pub time: String,
    pub class_type: String,
    pub teacher_id: i32,
    pub group_id: i32,
    pub created_at: String,
}


#[tauri::command]
pub async fn fetch_timetable(pool: State<'_, DbPool>, group_id: i32) -> Result<Vec<TimetableEntry>, String> {
    sqlx::query_as::<_, TimetableEntry>(
        "SELECT * FROM timetable WHERE group_id = $1 ORDER BY date, time"
    )
    .bind(group_id)
    .fetch_all(&pool.0)
    .await
    .map_err(|e| e.to_string())
}
