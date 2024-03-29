// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod admin;
mod auth;
mod database;
mod user;

use crate::{
    admin::admin::{
        create_student, create_teacher, fetch_student_details, fetch_students,
        fetch_teacher_details, fetch_teachers, remove_student, remove_teacher,
        fetch_groups, create_group, create_timetable_entry, fetch_timetable_entries, delete_timetable_entry, DbPool as AdminPool,
    },
    auth::auth::{authenticate_user, register_student, DbPool as AuthPool},
    database::{create_admins::create_administrator, create_tables::create_tables},
    user::user::{fetch_timetable, fetch_user_data, fetch_teacher_timetable, DbPool as UserPool},
};
use sqlx::postgres::PgPoolOptions;
use std::env;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .connect(&database_url)
        .await
        .expect("Failed to connect to the database");

    // Создание таблиц БД и администратора
    if let Err(e) = create_tables(&pool).await {
        eprintln!("Failed to create tables: {}", e);
        return;
    } else if let Err(e) = create_administrator(&pool).await {
        eprintln!("Failed to create admins: {}", e);
        return;
    }

    tauri::Builder::default()
        .manage(AuthPool(pool.clone()))
        .manage(UserPool(pool.clone()))
        .manage(AdminPool(pool.clone()))
        .invoke_handler(tauri::generate_handler![
            register_student,
            create_student,
            fetch_students,
            fetch_student_details,
            remove_student,
            fetch_groups,
            create_group,
            authenticate_user,
            fetch_user_data,
            fetch_timetable,
            fetch_teachers,
            fetch_teacher_details,
            fetch_teacher_timetable,
            create_teacher,
            remove_teacher,
            create_timetable_entry,
            fetch_timetable_entries,
            delete_timetable_entry,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
