// los campeones son los personajes que van a peliar
class Champions {
    constructor(name, damage, criticalLuck, criticalMultiplier, hp) {
        this.name = name
        this.damage = damage
        this.criticalLuck = criticalLuck
        this.criticalMultiplier = criticalMultiplier
        this.hp = hp
        this.isAlive = true
    }

    attack(target) {
        if(!this.isAlive || !target.isAlive) return false;

        let finalDamage = this.damage
        const isCritical = Math.random() < this.criticalLuck;

        if(isCritical) {
            finalDamage = Math.round(this.damage * this.criticalMultiplier)
        }

        target.recieveDamage(finalDamage)

        return { finalDamage, isCritical }
    }

    recieveDamage(damage){
        if(!this.isAlive) return false

        this.hp -= damage

        if(this.hp <= 0) {
            this.hp = 0
            this.isAlive = false
        }

        console.log(damage, this.hp, this.name)
    }
}

const champ1 = new Champions("Pancho", 20, 0.1, 1.5, 10000)
const champ2 = new Champions("Huachimingo", 21, 0.2, 1.6, 10000)

const button1 = document.querySelector("#btn1")
const button2 = document.querySelector("#btn2")

let ch1_hp = document.getElementById("vida1")
let ch2_hp = document.getElementById("vida2")

const log = document.getElementById("log")

function see_hp(id, text){
    document.getElementById(id).textContent = text
}

function see_log(texto){
    let p = document.createElement("p")
    p.textContent = texto
    log.prepend(p)
}

see_hp("vida1", champ1.hp)
see_hp("vida2", champ2.hp)

button1.addEventListener("click", () => {
    champ1.attack(champ2)
    see_hp("vida2", champ2.hp)
    see_log(champ1.name + " ataco a " + champ2.name)
})

button2.addEventListener("click", () => {
    champ2.attack(champ1)
    see_hp("vida1", champ1.hp)
    see_log(champ2.name + " ataco a " + champ1.name)
})