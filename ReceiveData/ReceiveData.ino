//This Arduino UNO Sketch requires the Seeed CAN-BUS Shield Libraries
//https://github.com/yexiaobo-seeedstudio/CAN_BUS_Shield
#include <SPI.h>
#include "mcp_can.h"

INT32U canId = 0x000;

unsigned char len = 0;
unsigned char buf[8];
char str[20];


void setup()
{
    Serial.begin(38400);

  START_INIT:

    if(CAN_OK == CAN.begin(CAN_500KBPS)){}
    else{goto START_INIT;}
}


void loop()
{
    if(CAN_MSGAVAIL == CAN.checkReceive()) 
    {
        CAN.readMsgBuf(&len, buf);
        canId = CAN.getCanId();
        Serial.print(canId, HEX);Serial.print(",");
        for(int i = 0; i<len; i++)
        {
            Serial.print(buf[i], HEX);Serial.print("-");
        }
        Serial.println();
    }
}
