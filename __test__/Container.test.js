import Container from '../Container'

describe('test the container', () => {


    test('create container and resolve class instance', () => {
        const container = new Container()
        const dummy = class Dummy {
            constructor() {
                this.value = 1
            }
        }

        container.register('dummy', dummy)
        const dummyInstance = container.get('dummy')
        expect(dummyInstance.value).toBe(1)
    })


    test('create container and resolve a new class instance with same key', () => {
        const container = new Container()
        const dummy = class Dummy {
            constructor() {
                this.value = 1
            }
        }
        container.register('dummy', dummy)
        const dummyInstance = container.get('dummy')
        dummyInstance.value = 2
        expect(dummyInstance.value).toBe(2)

        const secondDummyInstance = container.get('dummy')
        expect(secondDummyInstance.value).toBe(1)
    })



    test('is can resolve class object dependency', () => {

        const container = new Container()

        const configObject = {
            test: 'dummy'
        }
        const dummy = class Dummy {
            constructor(configObject) {
                this.configObject = configObject
            }
        }
        container.register('configObject', configObject)
        container.register('dummy', dummy, ['configObject'])
        const dummyInstance = container.get('dummy')
        expect(dummyInstance.configObject.test).toBe('dummy')

    })


    test('is can resolve a shared singleton class', () => {

        const container = new Container()

        const dummy = class Dummy {
            constructor(configObject) {
                this.value = 1
            }
        }
        container.singleton('dummy', dummy)

        const dummyInstance = container.get('dummy')
        expect(dummyInstance.value).toBe(1)
        dummyInstance.value = 2
        const dummyInstance2 = container.get('dummy')
        expect(dummyInstance2.value).toBe(2)
    })


    test('is can resolve a class with singleton dependency', () => {

        const container = new Container()
        const singleton = class SingletonClass {
            constructor() {
                this.value = 1
            }
        }

        const dummy = class Dummy {
            constructor(singleton) {
                this.singleton = singleton
            }
        }

        container.singleton('singleton', singleton)
        container.register('dummy', dummy, ['singleton'])

        const dummyInstance = container.get('dummy')
        dummyInstance.singleton.value = 2

        const dummyInstance2 = container.get('dummy')
        expect(dummyInstance2.singleton.value).toBe(2)
    })

})