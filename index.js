const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', tasks: [] },
  // 添加更多用户数据...
];

// 处理获取所有任务的请求
app.get('/tasks/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ tasks: user.tasks });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新任务的请求
app.post('/tasks/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { title, description, dueDate } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newTask = { id: user.tasks.length + 1, title, description, dueDate, completed: false };
    user.tasks.push(newTask);
    res.json({ message: 'Task added successfully', task: newTask });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理标记任务完成的请求
app.put('/tasks/:userId/complete/:taskId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const taskId = parseInt(req.params.taskId);

  const user = users.find((u) => u.id === userId);

  if (user) {
    const task = user.tasks.find((t) => t.id === taskId);

    if (task) {
      task.completed = true;
      res.json({ message: 'Task marked as completed', task });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
