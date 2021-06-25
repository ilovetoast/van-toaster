#!/bin/bash
echo "["
while read line; do

    ## Reset variables on new network
    [[ "$line" =~ Cell || "$line" == "" ]] && {

        # If no WPA encryption info was found though "Encryption" was "On", then we have WEP
        [[ "$encryption" == "" && "$enc" =~ On ]] && encryption = "WEP"

        # If we already found one network then echo its information
        [[ "$network" != "" ]] && echo "$network '[$encryption]'}"
        network=""
        encryption=""
    }

    ## Test line content and parse as required
    [[ "$line" =~ Address ]] && mac=${line##*ss: }
    [[ "$line" =~ \(Channel ]] && { chn=${line##*nel }; chn=${chn:0:$((${#chn}-1))}; }
    [[ "$line" =~ Frequen ]] && { frq=${line##*ncy:}; frq=${frq%% *}; }
    [[ "$line" =~ Quality ]] && {
        qual=${line##*ity=}
        qual=${qual%% *}
        lvl=${line##*evel=}
        lvl=${lvl%% *}
    }

    ## Encryption is "On" if WEP or WPA, otherwise it's "Open"
    [[ "$line" =~ Encrypt ]] && enc=${line##*key:}
    [[ "$enc" =~ Off ]] && {
        [[ "$encryption" != "" ]] && encryption="${encryption},"
        encryption="${encryption}Open"
    }

    ## The ESSID is the last line of the basic channel data, so build information string now
    [[ "$line" =~ ESSID ]] && {
        essid=${line##*ID:}
        network="{'mac': '$mac',  'essid': $essid,  'frequence': '$frq', 'channel': '$chn', 'quality': '$qual',  'level': '$lvl',  'protected': '$enc', 'encryption':"  # output after ESSID
    }

    ## WPA encryption information
    [[ "$line" =~ WPA ]] && wpa=${line##*WPA} && {
        [[ "$encryption" != "" ]] && encryption="${encryption}|"
         encryption="${encryption}WPA$wpa" 
    }
    [[ "$line" =~ "Group Cipher" ]] && encryption="$encryption,${line##*: }"
    [[ "$line" =~ "Pairwise Cipher" ]] && encryption="$encryption,${line##*: }"
    [[ "$line" =~ "Authentication Suites" ]] && encryption="$encryption,${line##*: }"
done < <(iwlist wlan1 scan 2>/dev/null )
echo "]"
