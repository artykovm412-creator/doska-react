import { useEffect, useState } from 'react';

// Описываем тип объявления для TypeScript
interface Notice {
  id: number;
  title: string;
  description: string;
}

export default function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 1. При загрузке страницы забираем объявления с бэкенда
  useEffect(() => {
    fetch('ССЫЛКА_НА_ТВОЙ_БЭКЕНД/api/notices') // 👈 Вставь сюда URL своего бэкенда!
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.log('Ошибка при получении:', err));
  }, []);

  // 2. Отправка нового объявления
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    fetch('ССЫЛКА_НА_ТВОЙ_БЭКЕНД/api/notices', { // 👈 И сюда ссылку на бэкенд!
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((newNotice) => {
        setNotices([...notices, newNotice]);
        setTitle('');
        setDescription('');
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📌 Доска объявлений</h1>

      {/* Форма для отправки */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Заголовок объявления"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <textarea
          placeholder="Текст объявления"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Опубликовать
        </button>
      </form>

      {/* Список карточек */}
      <div>
        {notices.map((notice) => (
          <div key={notice.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>{notice.title}</h3>
            <p>{notice.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}