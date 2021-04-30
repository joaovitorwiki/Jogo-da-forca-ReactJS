var devs_tem = [
    "cafe",
    "caneca",
    "teclado",
    "mouse",
    "monitor",
    "computador",
    "bugs",
    "cadeira",
    "foco",
    "caderno",
    "caneta",
    "headset",
    "anticonstitucionalmente"
]

function randomWord() {
    return devs_tem[Math.floor(Math.random() * devs_tem.length)]
}

export { randomWord }