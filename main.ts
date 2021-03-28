input.onButtonPressed(Button.A, function () {
    HackbitOLEDDisplay.clear()
    HackbitOLEDDisplay.writeString("Umid.:")
    HackbitOLEDDisplay.writeNumNewLine(hackbit.readData(hackbit.dataType.humidity))
    HackbitOLEDDisplay.writeString("Temp.: ")
    HackbitOLEDDisplay.writeNumNewLine(hackbit.getTemperatureDecimal())
    HackbitOLEDDisplay.writeString("Press:")
    HackbitOLEDDisplay.writeNumNewLine(hackbit.getPressureDecimal())
    HackbitOLEDDisplay.writeString("Altit:")
    HackbitOLEDDisplay.writeNumNewLine(hackbit.getAltitudeDecimal(101325))
    HackbitOLEDDisplay.writeString("Altur:")
    HackbitOLEDDisplay.writeNumNewLine(Math.round(hackbit.getAltitudeDecimal(101325) - 599))
    HackbitOLEDDisplay.writeString("Precipitacao:")
    HackbitOLEDDisplay.writeNum(hackbit.roundwithprecision(balde * baldetombado / areafunil, 2))
    HackbitOLEDDisplay.writeStringNewLine(" mm")
    HackbitOLEDDisplay.writeString("Vento:")
    HackbitOLEDDisplay.writeNum(hackbit.roundwithprecision(DisplayVelocidadeVento, 2))
    HackbitOLEDDisplay.writeStringNewLine(" Km/h")
    HackbitOLEDDisplay.writeString("Vento:")
    HackbitOLEDDisplay.writeNum(hackbit.roundwithprecision(Displayrpm, 2))
    HackbitOLEDDisplay.writeString(" rpm")
    basic.pause(5000)
    HackbitOLEDDisplay.clear()
})
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    FrequenciaVento += 1
})
let umidade = 0
let Displayrpm = 0
let DisplayVelocidadeVento = 0
let areafunil = 0
let balde = 0
let baldetombado = 0
baldetombado = 0
balde = 1.4
areafunil = 98.52
let TempoColeta = 10
let d = 0.01571
let FrequenciaVento = 0
let VelocidadeVento = 0
DisplayVelocidadeVento = 0
let rpm = 0
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
HackbitOLEDDisplay.init(128, 64)
HackbitOLEDDisplay.clear()
basic.forever(function () {
    hackbit.queryData(
    hackbit.DHTtype.DHT11,
    DigitalPin.P13,
    true,
    false,
    true
    )
})
basic.forever(function () {
    basic.pause(TempoColeta * 1000)
    VelocidadeVento = FrequenciaVento * d / TempoColeta * 3.6
    rpm = FrequenciaVento / TempoColeta * 60
    DisplayVelocidadeVento = VelocidadeVento
    Displayrpm = rpm
    VelocidadeVento = 0
    FrequenciaVento = 0
    rpm = 0
})
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) < 10) {
        baldetombado += 1
        basic.pause(40)
    }
})
basic.forever(function () {
    serial.writeLine("")
    if (hackbit.readDataSuccessful()) {
        umidade = hackbit.readData(hackbit.dataType.humidity)
    } else {
        umidade = 0
    }
    serial.writeNumbers([umidade, hackbit.getTemperatureDecimal(), hackbit.getPressureDecimal(), hackbit.getAltitudeDecimal(101325), hackbit.roundwithprecision(balde * baldetombado / areafunil, 2), hackbit.roundwithprecision(DisplayVelocidadeVento, 2), hackbit.roundwithprecision(Displayrpm, 2)])
    basic.pause(5000)
})
