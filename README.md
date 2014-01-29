# socketsAssets

Using this you can send assets or any other file via WebSockets. Actually, you can request any file from you `public` folder via WebSocket.

# Why

I was inspired by SPDY idea to hold one connection with server for files. It means, that it is possible to save 
a lot of time and traffic by using single connection.

You also can load a separate file or array of files or even whole directories.

You'll receive an object like
```
{
  file.js: "/*some content goed here like this: */ (function(){ ... })",
  file.css: "/* another file */"
}
```

## Plans
* I want to make it able to use some middleware in order to extend it's functionality.
* I also want to make a proper demo.
* and real life test.