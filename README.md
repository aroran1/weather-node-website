# Express Webserver 

## To watch node and handlebars file with nodemon run below
```
nodemon src/app.js -e js,hbs
```

## Heroku

Heroku :https://devcenter.heroku.com/ 

- Install Heroku
- Test heroku version: `heroku -v`
- Heroku login: `heroku login`
- Set-up ssh Key for GitHub 
- Add the ssh key to heroku `heroku keys:add` (select the right key)
- Create project in heroku `heroku create <aroran-weather-app>`
```
Output:
Creating ⬢ aroran-weather-app... done
https://aroran-weather-app.herokuapp.com/ | https://git.heroku.com/aroran-weather-app.git
```

- Add, commit and push all changes to git
- Run `git remote`
```
Output:
heroku
origin
```

- Run `git push heroku master`. This will deploy the app and if build successfully, its accessibile  from https://aroran-weather-app.herokuapp.com/ 


### App Path
https://aroran-weather-app.herokuapp.com/ | https://git.heroku.com/aroran-weather-app.git