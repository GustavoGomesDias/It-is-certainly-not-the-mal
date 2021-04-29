# BANCO DE DADOS

## LISTAS DE ANIMES (CRIADA POR CADA USUÁRIO)

### users
id | name | email | password | role
* id => int | 10 | unsigned | auto increment | primary key
* name => varchar | 150
* email => varchar | 150
* password => varchar | 150
* role => int | 10


### animes
id | name | episodes | seasons | chapterManga | image
* id => int | 10 | unsigned | auto increment | primary key
* name => varchar | 150
* episodes => varchar | 10
* seasons => varchar | 10
* chapterManga => int | 10
* image => varchar | 200

### lists
id | name | user_id
* id => int | 10 | unsigned | auto increment | primary key
* name => varchar | 300
* user_id => int | 10 | unsigned | key | foreign keys 


### lists_animes
list_id | anime_id
* list_id => int | 10 | unsigned | key | foreign keys
* anime_id => int | 10 | unsigned | key | foreign keys
