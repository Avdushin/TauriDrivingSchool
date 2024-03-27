// use sqlx::{Pool, Postgres};
// use tauri::State;

// pub struct DbPool(pub Pool<Postgres>);

// #[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
// pub struct UserData {
//     pub id: i32,
//     pub username: String,
//     pub email: String,
//     pub role: String,
//     pub password: String,
//     pub source: String,
// }

// // Получение данных ползователя по id
// #[tauri::command]
// pub async fn fetch_user_data(
//     pool: State<'_, DbPool>,
//     user_id: i32,
//     source: String,
// ) -> Result<Option<UserData>, String> {
//     let query = match source.as_str() {
//         "students" => "SELECT id, username, email, 'student' as role, password, 'students' as source FROM students WHERE id = $1",
//         "teachers" => "SELECT id, username, email, 'teacher' as role, password, 'teachers' as source FROM teachers WHERE id = $1",
//         "administrators" => "SELECT id, username, email, 'administrator' as role, password, 'administrators' as source FROM administrators WHERE id = $1",
//         _ => return Err("Invalid source".into()),
//     };

//     let user = sqlx::query_as::<_, UserData>(query)
//         .bind(user_id)
//         .fetch_optional(&pool.0)
//         .await
//         .map_err(|e| e.to_string())?;

//     Ok(user)
// }
