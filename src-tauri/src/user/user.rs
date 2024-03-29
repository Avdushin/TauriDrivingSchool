use bcrypt::{hash, DEFAULT_COST};
use sqlx::{Pool, Postgres, Transaction, query_as, FromRow};
use tauri::State;

pub struct DbPool(pub Pool<Postgres>);


#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct UserData {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub role: String,
    pub password: Option<String>,
    pub phone: Option<String>,
    pub group_id: Option<i32>,
    pub group_name: Option<String>,
}

// Получение данных пользователя по id
#[tauri::command]
pub async fn fetch_user_data(
    pool: State<'_, DbPool>,
    user_id: i32,
    source: String,
) -> Result<Option<UserData>, String> {
    let query = match source.as_str() {
        "students" => {
            r#"
            SELECT students.id, students.username, students.email, 'student' as role, students.password, groups.id as group_id, groups.name as group_name
            FROM students
            LEFT JOIN groups ON students.group_id = groups.id
            WHERE students.id = $1
            "#
        }
        "teachers" => {
            r#"
            SELECT id, username, email, 'teacher' as role, password, NULL::INTEGER AS group_id, NULL::TEXT AS group_name 
            FROM teachers WHERE id = $1
            "#
        }
        "administrators" => {
            r#"
            SELECT id, username, email, 'administrator' as role, password, NULL::INTEGER AS group_id, NULL::TEXT AS group_name 
            FROM administrators WHERE id = $1
            "#
        }
        _ => return Err("Invalid source".into()),
    };

    let user = sqlx::query_as::<_, UserData>(query)
        .bind(user_id)
        .fetch_optional(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    Ok(user)
}

#[tauri::command]
pub async fn update_user_data(
    pool: State<'_, DbPool>,
    id: i32,
    username: Option<String>,
    email: Option<String>,
    phone: Option<String>,
    password: Option<String>,
    role: String,
) -> Result<UserData, String> {
    let mut tx: Transaction<'_, Postgres> = pool.0.begin().await.map_err(|e| e.to_string())?;

    let table_name = match role.as_str() {
        "student" => "students",
        "teacher" => "teachers",
        "administrator" => "administrators",
        _ => return Err("Invalid role".into()),
    };

    let hashed_password = password
        .filter(|p| !p.is_empty())
        .map(|p| hash(&p, DEFAULT_COST))
        .transpose()
        .map_err(|e| e.to_string())?;

    if let Some(u) = username {
        sqlx::query(&format!("UPDATE {} SET username = $1 WHERE id = $2", table_name))
            .bind(u)
            .bind(id)
            .execute(&mut tx)
            .await
            .map_err(|e| e.to_string())?;
    }

    if let Some(e) = email {
        sqlx::query(&format!("UPDATE {} SET email = $1 WHERE id = $2", table_name))
            .bind(e)
            .bind(id)
            .execute(&mut tx)
            .await
            .map_err(|e| e.to_string())?;
    }

    if let Some(ph) = phone {
        sqlx::query(&format!("UPDATE {} SET phone = $1 WHERE id = $2", table_name))
            .bind(ph)
            .bind(id)
            .execute(&mut tx)
            .await
            .map_err(|e| e.to_string())?;
    }

    if let Some(hp) = hashed_password {
        sqlx::query(&format!("UPDATE {} SET password = $1 WHERE id = $2", table_name))
            .bind(hp)
            .bind(id)
            .execute(&mut tx)
            .await
            .map_err(|e| e.to_string())?;
    }

    let select_query = format!("SELECT id, username, email, role, NULL::text as password, phone, NULL::int as group_id, NULL::text as group_name FROM {} WHERE id = $1", table_name);
    let updated_user: UserData = sqlx::query_as::<_, UserData>(&select_query)
        .bind(id)
        .fetch_one(&mut tx)
        .await
        .map_err(|e| e.to_string())?;

    tx.commit().await.map_err(|e| e.to_string())?;

    Ok(updated_user)
}

#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct TimetableEntry {
    pub id: i32,
    pub date: sqlx::types::chrono::NaiveDate,
    pub time: sqlx::types::chrono::NaiveTime,
    pub ctype: String,
    pub teacher_id: i32,
    pub teacher_name: String,
    pub group_id: i32,
    pub group_name: String,
}

#[tauri::command]
pub async fn fetch_timetable(
    pool: State<'_, DbPool>,
    group_id: i32,
) -> Result<Vec<TimetableEntry>, String> {
    let query = r#"
    SELECT 
        timetable.id, 
        timetable.date, 
        timetable.time, 
        timetable.ctype, 
        teachers.id AS teacher_id, 
        teachers.username AS teacher_name, 
        groups.id AS group_id, 
        groups.name AS group_name
    FROM 
        timetable
        JOIN teachers ON timetable.teacher_id = teachers.id
        JOIN groups ON timetable.group_id = groups.id
    WHERE 
        timetable.group_id = $1
    ORDER BY 
        timetable.date, timetable.time;
    "#;

    let result = sqlx::query_as::<_, TimetableEntry>(query)
        .bind(group_id)
        .fetch_all(&pool.0)
        .await
        .map_err(|e| e.to_string())?;

    Ok(result)
}

#[tauri::command]
pub async fn fetch_teacher_timetable(
    pool: State<'_, DbPool>,
    teacher_id: i32,
) -> Result<Vec<TimetableEntry>, String> {
    sqlx::query_as::<_, TimetableEntry>(
        r#"
        SELECT 
            timetable.id, 
            timetable.date, 
            timetable.time, 
            timetable.ctype, 
            teachers.id AS teacher_id, 
            teachers.username AS teacher_name, 
            groups.name AS group_name,
            groups.id AS group_id
        FROM 
            timetable
        JOIN teachers ON timetable.teacher_id = teachers.id
        JOIN groups ON timetable.group_id = groups.id
        WHERE 
            timetable.teacher_id = $1
        ORDER BY 
            timetable.date, timetable.time;
        "#,
    )
    .bind(teacher_id)
    .fetch_all(&pool.0)
    .await
    .map_err(|e| e.to_string())
}
