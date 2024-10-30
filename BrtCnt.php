<?php
/*
 * Plugin Name: brt-cnt (for Wordpress)
 * Plugin URI: http://www.bitrokk.com
 * Description: This plugin counts the time up to a event. Use the shortcode syntax with paramter in your post, the promotext is optional.
 * Version: 1.2
 * Author: r.mundt
 * Author URI: http://www.bitrokk.com
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

function InitBrtCntScripts(){
  
    if (!is_admin())
    {
        $style_url = WP_PLUGIN_URL . "/brt-cnt/BrtCntStyle.css";
	    $logic_url = WP_PLUGIN_URL . "/brt-cnt/BrtCntLogic.js";	
    
        wp_register_style('brt_cnt_style', $style_url, array (), '1.1' );    
        wp_enqueue_style('brt_cnt_style');
    
        wp_register_script('brt_cnt_javascript', $logic_url, array (), '1.1');    
        wp_enqueue_script('brt_cnt_javascript');
    }
}
add_action( 'init', 'InitBrtCntScripts' );

function InitBrtCnt($atts, $content = null)
{ 
	extract(shortcode_atts(array('datetime' => '', 'language' => 'd', 'eventtext' => '', 'promotext' => ''), $atts));
	
    global $post;
    $cntDisplayId = $post->ID."_".mt_rand(1,1000);
    
    $_dd = ""; $_hd = ""; $_md = ""; $_sd = "";
        
    if($language == "e" || $language == "E")
    {
        $_dd = "DAY"; $_hd = "HOUR"; $_md = "MINUTE"; $_sd = "SECOND";
    }
    else
    {
        $_dd = "TAG"; $_hd = "STUNDE"; $_md = "MINUTE"; $_sd = "SEKUNDE";
    }    
    
	return '<div class="BrtCntLayout">
			<table border="0px" class="CntLayout">
			<tr class="BrtCntHeader">
				<td colspan="3">'.$_dd.'</td><td colspan="2">'.$_hd.'</td>
				<td colspan="2">'.$_md.'</td><td colspan="2">'.$_sd.'</td>
			</tr>            
			<tr class="BrtCntDisplay" id="'.$cntDisplayId.'"><td id="BlockDay1"></td><td id="BlockDay2"><td id="BlockDay3"></td></td><td id="BlockHour1"></td><td id="BlockHour2"></td><td id="BlockMinute1"></td><td id="BlockMinute2"></td><td id="BlockSecond1"></td><td id="BlockSecond2"></td></tr>			
			</table>
			</div>
			<script type="text/javascript" language="javascript">
				var EventDateTime = "' . $datetime . '";
				var EventText = "' . $eventtext . '";
				var PromoText = "' . $promotext . '";			   
				BrtCntStart("'.$cntDisplayId.'", EventDateTime, EventText, PromoText);    
			</script>';
}
add_shortcode('brt-cnt', 'InitBrtCnt');
?>