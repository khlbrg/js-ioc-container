# IoC Container for JavaScript

Register classes

```javascript

const container = new Container()

container.register('config', {key:value})
container.register('downloader', Downloader, ['config']) 
container.singleton('logger', Logger, ['config'])

```

Retrieve classes from container


```javascript

container.get('config')
container.get('downloader') // New download instance with config injected in constructor 
container.get('logger') // Logger instance
container.get('logger') // Same logger instance

```