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

### License

MIT
