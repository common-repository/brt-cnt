=== brt-cnt (for Wordpress) ===

Author: r.mundt
Contributors: bitrokk
Donate link: http://www.bitrokk.com/
Tags: brt-cnt, timer, countdown, clock, javascript, bitrokk, eieruhr, stoppuhr
Requires at least: 2.9
Tested up to: 3.5.1
Stable tag: 1.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/

== Description ==

This plugin counts the time up to a event. Use the shortcode syntax with paramter in your post, the 'promotext' and the 'language' is optional.

<a href='http://bitrokk.com' target="_blank">LiveDemo</a>  

Example:

- [brt-cnt datetime="31-12-2013 23:59:59" language="d" eventtext="Happy New Year 2014" promotext="Wordpress rokks =)"]

Shortcode:

- brt-cnt

Paramters:

- datetime="DD-MM-YYYY HH:MM:SS" (DD & MM = requires each two characters; YYYY = requires four characters; HH & MM & SS = requires each two characters)

- language="e" (E for english or D for german. Default language is german. Is optional.)

- eventtext="some text" (This text scrolls after timer is up as nonstop loop.)

- promotext="some text" (This text scrolls after loading for a one shot. Is optional.)

On diplay
exceptions:

- 'INIT?ERR' -> The 'datetime' format is not correct and/or the 'datetime' and/or 'eventtext' paramter is missing.

- '---' -> The 'datetime' event lasts longer than 999 days.
		   
== Installation ==

1. By default: copy or upload the 'brt-cnt' folder to the '/wp-content/plugins/' directory via ftp or whatever and activate it =).

== Screenshots ==

1. brt-cnt in action
2. scrolling promotext
3. scrolling eventtext

== Changelog ==

= 1.2 =
* bugfixes

= 1.1 =
* bugfixes
* expand day segements
* display description available in english

= 1.0 =
* The countdown has started.