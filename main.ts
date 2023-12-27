input.onButtonPressed(Button.A, function () {
    if (balken_x > 0) {
        balken_x += -1
        led.unplot(balken_x + 2, 4)
        led.plot(balken_x, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    if (status == 0) {
        radio.sendValue("go", 11)
        richtung_y = -1
        richtung_x = 1
        x = 3
        y = 3
        led.plot(3, 3)
        status = 1
    }
    if (balken_x < 3) {
        balken_x += 1
        led.unplot(balken_x - 1, 4)
        led.plot(balken_x + 1, 4)
    }
})
let y = 0
let richtung_x = 0
let richtung_y = 0
let balken_x = 0
let status = 0
let x = 0
status = 0
basic.pause(1000)
basic.forever(function () {
    if (status == 1) {
        basic.pause(500)
        y += richtung_y
        x += richtung_x
        if (x < 0 || x > 4) {
            richtung_x = richtung_x * -1
            x += richtung_x
            x += richtung_x
        }
        if (y > 3) {
            if (x + richtung_x * -1 == balken_x || x + richtung_x * -1 == balken_x + 1) {
                richtung_y = richtung_y * -1
                y += richtung_y
                y += richtung_y
            } else {
                status = 3
                radio.sendValue("lost", 137)
            }
        } else if (y == -1) {
            richtung_x = richtung_x * -1
            x += richtung_x
            if (x < 0 || x > 4) {
                richtung_x = richtung_x * -1
                x += richtung_x
                x += richtung_x
            }
            x += -4
            x = x * -1
            radio.sendValue(x.toString(), richtung_x)
        }
        basic.clearScreen()
        led.plot(x, y)
        led.plot(balken_x, 4)
        led.plot(balken_x + 1, 4)
    } else if (status == 2) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else if (status == 3) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
