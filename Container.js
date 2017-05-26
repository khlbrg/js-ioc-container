class Container {

    constructor() {
        this._services = new Map()
        this._singletons = new Map()
    }

    register(name, definition, dependencies) {
        this._services.set(name, {definition: definition, dependencies: dependencies})
    }

    singleton(name, definition, dependencies) {
        this._services.set(name, {definition: definition, dependencies: dependencies, singleton:true})
    }

    get(name) {
        const c = this._services.get(name)

        if(this._isClass(c.definition)) {

            if(c.singleton) {
                const singletonInstance = this._singletons.get(name)
                if(singletonInstance) {
                    return singletonInstance
                } else {
                    const newSingletonInstance = this._createInstance(c)
                    this._singletons.set(name, newSingletonInstance)
                    return newSingletonInstance
                }
            }

            return this._createInstance(c)

        } else {
            return c.definition
        }
    }

    _getResolvedDependencies(service) {
        let classDependencies = []
        if(service.dependencies) {
            classDependencies = service.dependencies.map((dep) => {
                return this.get(dep)
            })
        }
        return classDependencies
    }

    _createInstance(service) {
        return new service.definition(...this._getResolvedDependencies(service))
    }

    _isClass(definition) {
        return typeof definition === 'function'
    }
}
export default Container
