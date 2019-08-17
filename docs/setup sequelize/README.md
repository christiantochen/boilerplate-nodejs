# Sequelize `v5.18.4`
## Fix Sequelize BelongsToMany alias feature

`node_modules/sequelize/lib/associations/belongs-to-many.js`

```
this.oneFromSource = new HasOne(this.source, this.through.model, {
    foreignKey: this.foreignKey,
    as: this.through.model.name,
});

this.oneFromTarget = new HasOne(this.target, this.through.model, {
    foreignKey: this.otherKey,
    as: this.through.model.name,
});
```

as you can see **BelongsToMany** association are not using **alias**,  
so we fix this temporary with below code until somebody fix it on sequelize

```
this.oneFromSource = new HasOne(this.source, this.through.model, {
    foreignKey: this.foreignKey,
    as: this.through.as || this.through.model.name,
});

this.oneFromTarget = new HasOne(this.target, this.through.model, {
    foreignKey: this.otherKey,
    as: this.through.as || this.through.model.name,
});
```

or you can replace it with [this file](./belongs-to-many.js)

[Link to github issue](https://github.com/sequelize/sequelize/issues/9950)