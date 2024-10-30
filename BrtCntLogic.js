/*
 * Name: BrtCntLogic.js
 * Author: r.mundt 
 * Uri: http://www.bitrokk.com
 * Description: The logic of 'brt-cnt'.
 * Version 1.1
 * License: GPLv3
 * Copyright (C) 2013
   
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
// declare class
function BrtCntClass() {}

// declare class properties
BrtCntClass.prototype.EventString = new String();
BrtCntClass.prototype.PromoString = new String();
BrtCntClass.prototype.ScrollString = new String("");
BrtCntClass.prototype.EventTime = new Date();
BrtCntClass.prototype.BrtCntTimer = new Object();
BrtCntClass.prototype.BrtCntTimerFinal = new Object();
BrtCntClass.prototype.BrtCntTimerPromo = new Object();
BrtCntClass.prototype.BrtCntDisplayID = new String();

// set event time
BrtCntClass.prototype.SetEventTime = function(Day, Month, Year, Hour, Minute, Second)
{
    var _eTime = new Date(Year, Month - 1, Day, Hour, Minute, Second);
    _eTime = _eTime.getTime() / 1000;        
    return _eTime;
}

// write on cnt display
BrtCntClass.prototype.PrintOnDisplay = function(DisplayText) 
{
    var _obj = document.getElementById(this.BrtCntDisplayID)
    for (var i = 0; i < _obj.childNodes.length; i++)
    {
        _obj.childNodes[i].innerHTML = DisplayText.charAt(i);
    }
}

// calculate the cnt string
BrtCntClass.prototype.BrtCntClock = function() 
{
    var _dt = new Date();
    var _cT = _dt.getTime() / 1000;
    // calculate days, hours, mins...
    var _cD = (this.EventTime - _cT) / 60 / 60 / 24;
    var _cH = (_cD % 1) * 24;
    var _cM = (_cH % 1) * 60;
    var _cS = (_cM % 1) * 60;
    var _r = new String();
    
    // check is cnt up
    if (_cD <= 0 && _cH <= 0 && _cM <= 0 && _cS <= 0) 
    {
        window.clearInterval(this.BrtCntTimer);
        this.Final_Timer();        
    }
    else 
    {
        _r = this.SetDisplayFormat(_cD, 0);
        _r += this.SetDisplayFormat(_cH, 1);
        _r += this.SetDisplayFormat(_cM, 1);
        _r += this.SetDisplayFormat(_cS, 1);
    }
    return _r.toString();
}

// correction the displayed format
BrtCntClass.prototype.SetDisplayFormat = function(Value, Type) 
{
    Value = Math.floor(Value);
    if(Type == 0)
    {
        if (Value < 10)
            Value = "00" + Value;
        else if(Value > 10 && Value < 100)
            Value = "0" + Value;   
        else if (Value > 999)
            Value = "---";
    }
    else
    {
        if (Value < 10)
            Value = "0" + Value;     
    }
    return Value.toString();
}

// cut and set string for scrolling 
BrtCntClass.prototype.SetScrollFormat = function(DisplayText) 
{
    if (this.ScrollString.length == 0)
        this.ScrollString = DisplayText;
    else
        this.ScrollString = this.ScrollString.slice(1, this.ScrollString.length);
    return this.ScrollString;
}

// set date time format for object
BrtCntClass.prototype.SetDateTimeFormat = function(EventDateTime) 
{
    var _r = new Array(6);
    _r[0] = EventDateTime.substr(0, 2);
    _r[1] = EventDateTime.substr(3, 2);
    _r[2] = EventDateTime.substr(6, 4);
    _r[3] = EventDateTime.substr(11, 2);
    _r[4] = EventDateTime.substr(14, 2);
    _r[5] = EventDateTime.substr(17, 2);
    return _r;
}

// check if params sets
BrtCntClass.prototype.IsParameterSet = function(EventDateTime, EventText, PromoText) 
{
    var _r = new Array(false, false, false, false);
    if (EventDateTime && EventDateTime.length == 19 && typeof (EventDateTime) == 'string') {
        _r[0] = true;
    }
    if (EventText && typeof (EventText) == 'string') {
        _r[1] = true;
    }
    if (PromoText && typeof (PromoText) == 'string') {
        _r[2] = true;
    }    
    return _r;
}

// cnt event
BrtCntClass.prototype.BrtCnt_Event = function() 
{    
    this.PrintOnDisplay(this.BrtCntClock());
}

// final event
BrtCntClass.prototype.Final_Event = function() 
{
    this.PrintOnDisplay(this.SetScrollFormat(this.EventString));
}

// promo event
BrtCntClass.prototype.Promo_Event = function() 
{
    var _obj = this;
    _obj.PrintOnDisplay(this.SetScrollFormat(_obj.PromoString));
    if (_obj.ScrollString.length < 10) 
    {
        window.clearInterval(_obj.BrtCntTimerPromo);
        _obj.ScrollString = "";
        // set cnt timer
        _obj.BrtCntTimer = window.setInterval(function () { _obj.BrtCnt_Event() }, 1000);
    }
}

// set promo timer
BrtCntClass.prototype.Promo_Timer = function() 
{    
    var _obj = this;
    _obj.BrtCntTimerPromo = window.setInterval(function(){ _obj.Promo_Event() }, 600);
}

// set final timer
BrtCntClass.prototype.Final_Timer = function() 
{
    var _obj = this;
    _obj.BrtCntTimerFinal = window.setInterval(function(){ _obj.Final_Event() }, 800);
}

// first function to call
function BrtCntStart(BrtCntDisplayId, EventDateTime, EventText, PromoText) 
{ 
    var _elmObj = new BrtCntClass();
    // set properties
    _elmObj.EventString = EventText;        
    _elmObj.PromoString = PromoText;        
    _elmObj.BrtCntDisplayID = BrtCntDisplayId;           
         
    // check is params correctly sets
    var params = _elmObj.IsParameterSet(EventDateTime, EventText, PromoText);
    if (params[0] && params[1]) 
    {
        var _d = _elmObj.SetDateTimeFormat(EventDateTime);
        
        // set eventdate properties        
        _elmObj.EventTime = _elmObj.SetEventTime(_d[0], _d[1], _d[2], _d[3], _d[4], _d[5]);         
                        
        // check if promo sets
        if (params[2]) 
        {
            // init. display
            _elmObj.PrintOnDisplay("---------");                
            _elmObj.Promo_Timer(_elmObj);
        }
        else 
        {
            // init. display
            _elmObj.PrintOnDisplay("---------");
            _elmObj.BrtCntTimer = window.setInterval(function(){ _elmObj.BrtCnt_Event(_elmObj) }, 1000, _elmObj);
        }
    }
    else 
    {
        _elmObj.PrintOnDisplay("INIT?ERR");
    }    
}