# Padock photo search

This is a padock photo search web application.
It provides APIs, too. Data is fetched from [Keibado's site](http://www.keibado.ne.jp/keibabook/itw/index.html) and this application just save urls.

### How to make dataset

```
$ bundle exec rake keibado:import_all
```

This task imports only unimported data.
So, you can use this task to update your dataset.

### Implemented APIs

- GET /api/horses
	- required params
      - name: horse name

- GET /api/backnumbers
  - optional params
      - year: target year (ex. 2017)
      - limit: number of response data

### Local Development with Docker Compose

First, create a docker machine.

```
$ docker-machine create --driver virtualbox YourMachineName
$ eval $(docker-machine env YourMachineName)
```

Next, build docker images and set up database.

```
$ docker-compose build
$ docker-compose run web rails c # This pulls postgres and redis images
$ docker-compose run web rake db:create
$ docker-compose run web rake db:migrate
$ docker-compose up -d
```

Then, import horse data by `docker-compose run web rake keibado:import_all`.

Finally, open your browser and navigate to `http://$(docker-machine ip YourMachineName):3000/`

### License

MIT
