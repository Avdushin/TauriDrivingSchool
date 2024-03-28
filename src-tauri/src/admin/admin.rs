use bcrypt::{hash, DEFAULT_COST};
use sqlx::{Pool, Postgres};
use tauri::State;

pub struct DbPool(pub Pool<Postgres>);

/*
//@ Teachers functions
*/

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct NewTeacher {
    username: String,
    email: String,
    password: String,
    dlc: String,
    phone: Option<String>,
}

#[tauri::command]
pub async fn create_teacher(
    pool: State<'_, DbPool>,
    new_teacher: NewTeacher,
) -> Result<(), String> {
    let password_hash = hash(new_teacher.password, DEFAULT_COST).unwrap();
    sqlx::query!(
        "INSERT INTO teachers (username, email, password, dlc, phone) VALUES ($1, $2, $3, $4, $5)",
        new_teacher.username,
        new_teacher.email,
        password_hash,
        new_teacher.dlc,
        new_teacher.phone,
    )
    .execute(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}


#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct Teacher {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub dlc: String,
    pub phone: Option<String>,
}

#[tauri::command]
pub async fn fetch_teachers(pool: State<'_, DbPool>) -> Result<Vec<Teacher>, String> {
    sqlx::query_as::<_, Teacher>("SELECT id, username, email, dlc, phone FROM teachers")
        .fetch_all(&pool.0)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn fetch_teacher_details(pool: State<'_, DbPool>, teacher_id: i32) -> Result<Teacher, String> {
    sqlx::query_as::<_, Teacher>("SELECT id, username, email, dlc, phone FROM teachers WHERE id = $1")
        .bind(teacher_id)
        .fetch_one(&pool.0)
        .await
        .map_err(|e| e.to_string())
}