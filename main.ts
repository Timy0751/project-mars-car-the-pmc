// -------------------------initial setup--------------------------#
OLED12864_I2C.init(60)
sonarbit.sonarbit_distance(Distance_Unit.Distance_Unit_mm, DigitalPin.P0)
wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S7, 90)
wuKong.stopAllMotor()
function sr() {
    wuKong.setAllMotor(0, 0)
}

// ----------------------------run main----------------------------#
basic.forever(function mid_detect() {
    let LEFT: number;
    let RIGHT: number;
    // -------------------------show distance--------------------------#
    let DIS = sonarbit.sonarbit_distance(Distance_Unit.Distance_Unit_mm, DigitalPin.P0) / 10
    OLED12864_I2C.showString(0, 0, "DIS: " + DIS, 1)
    // -----------------------hit wall and stop------------------------#
    if (DIS >= 10 && DIS < 15) {
        wuKong.stopAllMotor()
        OLED12864_I2C.showString(0, 0, "AHHH!      ", 1)
        OLED12864_I2C.showString(0, 1, "MID: " + DIS, 1)
        // -------------------------turn left------------------------------#
        // wuKong.set_servo_angle(wuKong.ServoTypeList._360, wuKong.ServoList.S7, 230)
        LEFT = sonarbit.sonarbit_distance(Distance_Unit.Distance_Unit_mm, DigitalPin.P0) / 10
        OLED12864_I2C.showString(0, 2, "LEFT: " + LEFT, 1)
        // -------------------------turn right-----------------------------#
        // wuKong.set_servo_angle(wuKong.ServoTypeList._360, wuKong.ServoList.S7, 130)
        RIGHT = sonarbit.sonarbit_distance(Distance_Unit.Distance_Unit_mm, DigitalPin.P0) / 10
        OLED12864_I2C.showString(0, 3, "RIGHT: " + RIGHT, 1)
        // -----------------------compare and turn-------------------------#
        if (RIGHT >= LEFT) {
            OLED12864_I2C.showString(0, 0, "RIGHT!      ", 1)
            wuKong.setAllMotor(200, 0)
            control.waitMicros(40)
            wuKong.stopAllMotor()
        } else {
            OLED12864_I2C.showString(0, 0, "LEFT!       ", 1)
            wuKong.setAllMotor(0, -200)
            control.waitMicros(40)
            wuKong.stopAllMotor()
        }
        
        OLED12864_I2C.clear()
    } else {
        // -------------------------no wall and go-------------------------#
        OLED12864_I2C.showString(0, 1, "GOOD!", 1)
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S7, 90)
        wuKong.setAllMotor(10, -10)
    }
    
})
