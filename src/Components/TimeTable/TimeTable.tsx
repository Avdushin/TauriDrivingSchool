import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Table } from '@mantine/core';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const id = 1;

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // Замените 'group_id' на актуальный идентификатор группы
        const data = await invoke('fetch_timetable', { group_id: id });
        setTimetable(data);
      } catch (err) {
        console.error('Failed to fetch timetable:', err);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Type</th>
          <th>Teacher ID</th>
          <th>Group ID</th>
        </tr>
      </thead>
      <tbody>
        {timetable.map((entry) => (
          <tr key={entry?.id}>
            <td>{entry?.date}</td>
            <td>{entry?.time}</td>
            <td>{entry?.class_type}</td>
            <td>{entry?.teacher_id}</td>
            <td>{entry?.group_id}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TimeTable;
