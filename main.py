sonarbit.sonarbit_distance(Distance_Unit.DISTANCE_UNIT_MM, DigitalPin.P0)
wuKong.stop_all_motor()

def sr():
    wuKong.set_all_motor(0, -200)
    control.wait_micros(150)
    DR=sonarbit.sonarbit_distance(Distance_Unit.DISTANCE_UNIT_MM, DigitalPin.P0)/10
    wuKong.set_all_motor(200,0)
    control.wait_micros(150)
    wuKong.stop_all_motor()
def sl():
    wuKong.set_all_motor(200, 0)
    control.wait_micros(150)
    DL=sonarbit.sonarbit_distance(Distance_Unit.DISTANCE_UNIT_MM, DigitalPin.P0)/10
    wuKong.set_all_motor(0, -200)
    control.wait_micros(150)
    wuKong.stop_all_motor()
def mid_detect():

    DIS=sonarbit.sonarbit_distance(Distance_Unit.DISTANCE_UNIT_MM, DigitalPin.P0)/10

    if DIS>=10 and DIS<15:
        wuKong.stop_all_motor()
        sr(1)
        sl(1)
        if DL<DR: #右轉
            wuKong.set_all_motor(-200, 0)
            control.wait_micros(150)
            wuKong.stop_all_motor()
        
        elif DL>DR: #左轉
            wuKong.set_all_motor(0, 200)
            control.wait_micros(150)
            wuKong.stop_all_motor()

    else:
        wuKong.set_all_motor(15, -15)

basic.forever(mid_detect)