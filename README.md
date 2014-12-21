Quality web theme helper based in gulp
===================================

This project provide a `gulp tasks` to create a web theme applying all the best practices require the new web applications require nowadays.

It has been heavily inspired by [Google Web Starter Kit](https://github.com/google/web-starter-kit), however it only provides the building tasks and organizing conventions, it does not provide any additional resource. It is though to start a web theme development (front-end app) adding the stuff that you need, nothing is provided than the essentials to save your time to have to delete them.

## What it provides
It provides a `gulpfile` with the next main tasks:

* `init`: Create the directories scaffolding to organise your app assets.
* `serve`: Starts a web server in the port 3000. You have to use it during the theme development.
* `build`: Builds the production version of your theme.
* `serve:dist`: Starts a web server in the port 3000 with the production version of your theme.
* `clean`: Cleans the output directories use for the other tasks.

## Requirements

To use this tool, you have to be available the next tools in your `path`, so the commands have to be found by the operative system; follow the specified order:

1. `nodejs`: Version 0.10 or greater. You can find more information on its [website](http://nodejs.org).
2. `gulp`: you can install it after you have `nodejs` available through `npm`, just type `npm install -g gulp`.

## How to start

Clone the repository or just download the zip file and uncompress it.

Use you command line to go into the directory where you pull out these repository (or zipped version), you will have to do each of the following steps into this directory.

1. Execute in your command line `npm install`; it could take a little bit time because it is installing all the dependencies that the `gulp tasks` need.
2. Then if you pull this repository, you must delete a `hidden` folder named `.git`, to avoid noise with your job and be able to create your own git repository to track your web theme development.
3. Execute `gulp init`. You will get some subdirectories into `app` directory, where you should organise all the assets accordingly, bear in mind that `styles` directory may contain `scss` and `css` files, and they can be used independently.
4. Execute `gulp serve` and you will have the provided blank index under the url: `http://localhost:3000`, or a following port if `3000` port is already used, check the console output to see the port where the server is running. To stop it, just press `ctrl-c`.

You are ready to start to develop your web theme, when you make changes in the `css`, `scss` and `html` files, the browser will refresh automatically and you will see your changes without the hassle of have to refresh your browser, bear in mind that `javascript` files changes are not triggering the automatic refresh.

__NOTE__ sometimes something may go wrong and the changes are not change, in that case restart the server, just close `gulp serve` and start it again.

When you are ready, you can build your production version, just type `gulp build` and the task will create a directory called `dist` with the optimized `css` and `js` (minification and concatenation) and images to avoid overweight in your web theme and provide a good quality product. Bear in mind that this task also check your `javascript` sources using `jshint` (http://www.jshint.com/docs/) to report you some possible issues and avoid bad `javascript` practices.

## How to use the assets (JS, CSS) located outside `app`

One of the best practices today in the web font-end development is to use a package manager to track the used external libraries and what version. You can use them here with no problem and here you will se some examples.

__NOTE__ all the examples use [bower](http://bower.io/), but you could use another one.

If you install all the dependencies into the default `bower` directory you will have them into `bower_components`, however you will not use it this into your `app` directory because it contains to much files that you may not use, moreover you want that you build process also optimizes them, because in the case of `bower`, it should only provide the assets as sources, leaving the optimization task to the build system (you can read more [here](https://github.com/bower/bower/issues/368))

The `gulpfile` use an awesome plugin that allows to take your references of the `css` and `js` files of your `html` files and change them to other path and name for the production distribution, moreover they will be optimized in the `build` task, and everything just giving the instruction in the `html` files through comments.

Any `js` and `css` specified without any instruction will be conserved with the same reference, so if you don't need to change anything just reference them as normal.

Let's see an example of referencing `jquery` installed with `bower` and `bower_components` is in root's folder.

In the part of your html to include `jquery` you must write:

```html
	<!-- build:js(bower_components) /vendor/jquery.min.js -->
    <script src="/jquery/dist/jquery.js" type="text/javascript"></script>
    <!-- endbuild -->
```

That is everything, you are specifying to build a `js`, in case of a `css` is the same but writing `css`. After you specify the base path where the `src` property have to look for the file and the next one is the path that will be used when you build your production version. Don't worry when you build your production version, it will copy the file from `bower_components` to the path and name you specified, in this case `/vendor/jquery.min.js` and it will optimize it.

It also allows to specify several files in the `bulild` block, hence they will be concatenated to a single file with the specified name.

You can see more about it in [its repository](https://github.com/jonkemp/gulp-useref)

## License

MIT license and Creative Commons.
Read the LICENSE file for more information.

However some sources have been taken or heavily inspired by [Google Web Starter Kit](https://github.com/google/web-starter-kit) which is release under Apache 2.0 license with a Copyright of Google Inc, so it provides some sources in __original version__ or a __modified version__ .

## Credits

Thanks to all the open source community that have released and contributed to create and improve any piece of source, tool and resource used to create this.
