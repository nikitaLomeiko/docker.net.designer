# DOCKER.NET.DESIGNER

## Онлайн конструктор для создания и проектирования сетей

### 1. Как запустить

1.1 скачиваем репозиторий

```
git clone https://github.com/nikitaLomeiko/docker.net.designer.git
```

1.2 устанавливаем node зависимости

```
npm install
```

1.3 создаем build проекта

```
npm run build
```

1.4 запускаем preview версию сайта

```
npm run preview
```

### 2. Запуск через dockerfile

2.1 билдим образ

```
docker build -t react-app .
```

2.2 запускаем образ

```
docker run -p 4173:4173 react-app
```

### 3. Code-style

3.1 Архитектурным решением для проекта является Featured Sliced Designer https://feature-sliced.github.io/documentation/ru/docs/get-started/overview

3.2 нейминг файлов имеет формат регистра - snake case с разделительным знаком ввиде точки <br>
пример: docker.constructor.tsx, file.input.tsx, convert.react.flow.to.docker.ts

3.3 нейминг директорий имеет такой-же формат регистра snake case, с разделительным знаком ввиде тире <br>
например: /docker-constructor, /file-input, /docker-toolbar

3.4 переменные, константы, функции, компоненты имеют формат регистра camel case

3.5 Interface перед именем добавляется опознавательный симовл "I" <br>
например: IProps

3.6 Диструктуризация в react-компонентах происходит внутри invoke-скобок, если попросов мало (до 2-3), в случае если пропсов больше, диструктуризация происходит внутри компонента

3.7 React-компоненты используются функциональные. Создается функция стрелочного формата с обязательной типизацией React.FC
