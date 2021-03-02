## Тестовое задание

Реализовать REST АПИ для клиентского приложения, которое должно отображать страницу со списком студентов с возможностями:

1. добавить нового студента в этот список;
2. удалить существующего студента;
3. отредактировать существующего студента;
   У студента есть поля:

- ФИО
- дата рождения
- успеваемость (опционально из справочника)

Технологии: react, typescript; node.js, автогенерируемое swagger-описание API; typeORM; возможные значения успеваемости (неуд/уд/хор/отл) должны быть доступны клиентскому приложению через endpoint API;

## Запуск в docker

```bash
$ docker-compose up
```

Описание api доступно по `localgost:3000/api`
