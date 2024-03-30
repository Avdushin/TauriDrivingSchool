use bcrypt::{hash, DEFAULT_COST};
// use chrono::{DateTime, Utc};
use chrono::{NaiveDate, NaiveTime};
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
pub async fn fetch_teacher_details(
    pool: State<'_, DbPool>,
    teacher_id: i32,
) -> Result<Teacher, String> {
    sqlx::query_as::<_, Teacher>(
        "SELECT id, username, email, dlc, phone FROM teachers WHERE id = $1",
    )
    .bind(teacher_id)
    .fetch_one(&pool.0)
    .await
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn remove_teacher(pool: State<'_, DbPool>, teacher_id: i32) -> Result<(), String> {
    sqlx::query!("DELETE FROM teachers WHERE id = $1", teacher_id)
        .execute(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

/*
//@ Student functions
*/

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct NewStudent {
    username: String,
    email: String,
    password: String,
    group_id: Option<i32>,
    phone: Option<String>,
}

#[tauri::command]
pub async fn create_student(
    pool: State<'_, DbPool>,
    new_student: NewStudent,
) -> Result<(), String> {
    let password_hash = hash(&new_student.password, DEFAULT_COST).unwrap_or_default();
    sqlx::query!(
        "INSERT INTO students (username, email, password, group_id, phone) VALUES ($1, $2, $3, $4, $5)",
        new_student.username,
        new_student.email,
        password_hash,
        new_student.group_id,
        new_student.phone,
    )
    .execute(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct Student {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub group_id: Option<i32>,
    pub group_name: Option<String>,
    pub group_description: Option<String>,
    pub phone: Option<String>,
}

// Допустим, вы хотите получить список всех студентов
#[tauri::command]
pub async fn fetch_students(pool: State<'_, DbPool>) -> Result<Vec<Student>, String> {
    sqlx::query_as::<_, Student>(
        "SELECT students.id, students.username, students.email, students.phone, students.group_id, 
        groups.name AS group_name, groups.description AS group_description
        FROM students
        LEFT JOIN groups ON students.group_id = groups.id",
    )
    .fetch_all(&pool.0)
    .await
    .map_err(|e| e.to_string())
}

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct StudentDetails {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub phone: Option<String>,
    pub group_id: Option<i32>,
    pub group_name: Option<String>,
    pub group_description: Option<String>,
}

// Получение данных конкретного студента
#[tauri::command]
pub async fn fetch_student_details(
    pool: State<'_, DbPool>,
    student_id: i32,
) -> Result<StudentDetails, String> {
    sqlx::query_as::<_, StudentDetails>(
        "SELECT students.id, students.username, students.email, students.phone, students.group_id, 
        groups.name AS group_name, groups.description AS group_description
        FROM students
        LEFT JOIN groups ON students.group_id = groups.id
        WHERE students.id = $1",
    )
    .bind(student_id)
    .fetch_one(&pool.0)
    .await
    .map_err(|e| e.to_string())
}

// Удаление студента
#[tauri::command]
pub async fn remove_student(pool: State<'_, DbPool>, student_id: i32) -> Result<(), String> {
    sqlx::query!("DELETE FROM students WHERE id = $1", student_id)
        .execute(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn update_student_group(
    pool: State<'_, DbPool>,
    student_id: i32,
    group_id: Option<i32>,
) -> Result<(), String> {
    sqlx::query!(
        "UPDATE students SET group_id = $1 WHERE id = $2",
        group_id,
        student_id
    )
    .execute(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}


#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
}

#[tauri::command]
pub async fn fetch_groups(pool: State<'_, DbPool>) -> Result<Vec<Group>, String> {
    sqlx::query_as::<_, Group>("SELECT id, name, description FROM groups")
        .fetch_all(&pool.0)
        .await
        .map_err(|e| e.to_string())
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct NewGroup {
    pub name: String,
    pub description: Option<String>,
}

#[tauri::command]
pub async fn create_group(pool: State<'_, DbPool>, new_group: NewGroup) -> Result<(), String> {
    sqlx::query!(
        "INSERT INTO groups (name, description) VALUES ($1, $2)",
        new_group.name,
        new_group.description,
    )
    .execute(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

/*
//@ TimeTable
*/

// use sqlx::types::time::{Date, Time};
#[derive(Debug, Clone, serde::Deserialize)]
pub struct NewTimetableEntry {
    pub date: NaiveDate,
    pub time: NaiveTime,
    pub ctype: String,
    pub teacher_id: i32,
    pub group_id: i32,
}

#[tauri::command]
pub async fn create_timetable_entry(
    pool: State<'_, DbPool>,
    entry: NewTimetableEntry,
) -> Result<(), String> {
    sqlx::query!(
        "INSERT INTO timetable (date, time, ctype, teacher_id, group_id) VALUES ($1, $2, $3, $4, $5)",
        entry.date,
        entry.time,
        entry.ctype,
        entry.teacher_id,
        entry.group_id,
    )
    .execute(&pool.0)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[derive(Debug, serde::Serialize, serde::Deserialize, sqlx::FromRow)]
pub struct TimetableEntry {
    pub id: i32,
    pub date: sqlx::types::chrono::NaiveDate,
    pub time: sqlx::types::chrono::NaiveTime,
    pub ctype: String,
    pub teacher: String,
    pub group: String,
}

#[tauri::command]
pub async fn fetch_timetable_entries(
    pool: State<'_, DbPool>,
) -> Result<Vec<TimetableEntry>, String> {
    sqlx::query_as::<_, TimetableEntry>(
        r#"
        SELECT timetable.id, timetable.date, timetable.time, timetable.ctype, teachers.username as teacher, groups.name as group
        FROM timetable
        JOIN teachers ON timetable.teacher_id = teachers.id
        JOIN groups ON timetable.group_id = groups.id
        "#
    )
    .fetch_all(&pool.0)
    .await
    .map_err(|e| e.to_string())
}

#[derive(serde::Deserialize)]
pub struct DeleteTimetableEntry {
    pub id: i32,
}

#[tauri::command]
pub async fn delete_timetable_entry(
    pool: State<'_, DbPool>,
    entry: DeleteTimetableEntry,
) -> Result<(), String> {
    sqlx::query!("DELETE FROM timetable WHERE id = $1", entry.id)
        .execute(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

/*
//     @ Payments
*/

use bigdecimal::BigDecimal;

#[derive(Debug, Clone, serde::Deserialize, serde::Serialize)]
pub struct NewPayment {
    pub student_id: i32,
    pub amount: BigDecimal,
    pub ptype: String,
}

#[tauri::command]
pub async fn create_payment(pool: State<'_, DbPool>, payment: NewPayment) -> Result<(), String> {
    let res = sqlx::query!(
        "INSERT INTO payments (student_id, amount, ctype, date, created_at, status) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_TIMESTAMP, 'не оплачено')",
        payment.student_id,
        payment.amount,
        payment.ptype,
    )
    .execute(&pool.0)
    .await;
    

    match res {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[derive(Debug, Clone, serde::Serialize, sqlx::FromRow)]
pub struct Payment {
    pub id: i32,
    pub student_id: i32,
    pub amount: BigDecimal,
    pub ptype: String,
    pub date: NaiveDate,
    pub status: String,
}

#[tauri::command]
pub async fn fetch_payments(pool: State<'_, DbPool>) -> Result<Vec<Payment>, String> {
    sqlx::query_as::<_, Payment>(
        "SELECT id, student_id, amount, ctype AS ptype, date, status FROM payments WHERE status = 'не оплачено'",
    )
    .fetch_all(&pool.0)
    .await
    .map_err(|e| e.to_string())
}


#[derive(Debug, Clone, serde::Deserialize, serde::Serialize)]
pub struct PaymentId {
    pub id: i32,
}

#[tauri::command]
pub async fn pay_payment(pool: State<'_, DbPool>, payment_id: PaymentId) -> Result<(), String> {
    let result = sqlx::query!(
        "UPDATE payments SET status = 'оплачено' WHERE id = $1",
        payment_id.id
    )
    .execute(&pool.0)
    .await;

    match result {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
