// from https://stackoverflow.com/a/14853974
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// from https://stackoverflow.com/a/20871714
function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

let data = [
['fdb bgfa cedfg abedcf defgba gbaed dagfbce fbged dgabce fb'.split(' '), 'bf dfbega fb baged'.split(' ')],
['ce cgfdea acdfe befda afgdc fec gdfbca ebdcgf cgea adgcfeb'.split(' '), 'fgcadbe cefda aebdf degcfa'.split(' ')],
['egca gdcaeb cbdfe bdaegf dgbafec ge agdcfb degcb cgadb ebg'.split(' '), 'edfbc bcdeg bfcde baefdg'.split(' ')],
['dfbc bc facgd feagb bfadegc gacfbd acgfb bagedc gacdfe cbg'.split(' '), 'afdcegb bagfc egcafd bcg'.split(' ')],
['edc aedcbf dgcf cgebf egdacbf bdega egcbfa gcedb cd edgcbf'.split(' '), 'gdcebf bedfgc dbcgfe cd'.split(' ')],
['gcfabed fed facegd abdge gcdfb fbdge befa abgdfe dgbcae ef'.split(' '), 'bgdfe befa fgedb adcbeg'.split(' ')],
['fca fbdcega cadfg ac dbca dbcgf cgfaeb dbefcg gcfbad gafde'.split(' '), 'gfbacd fdgea gdfcb bdac'.split(' ')],
['eb bgafe bgcefd fegcadb daeb eafcg gbdaf bfe edgabf agfbcd'.split(' '), 'cfdebg aegbf dbagf dgbfea'.split(' ')],
['aebfgd gbcead dfbecga gdceb decfbg aeg ae gacfd eacb edgac'.split(' '), 'ea aeg ea dfaegb'.split(' ')],
['gdc fceagd cagf cgfdbe febcad gecad gc agdeb fcade bfaecgd'.split(' '), 'fdaecg gdc cegafd adebg'.split(' ')],
['bdgcef acd bdgacf gbcfd da agbcd bfda eadgcf bcgea cfbgade'.split(' '), 'fcbaged bfdegc gecdabf adbf'.split(' ')],
['bd faebcg cdgfa fcbda fbd fbcae aebd bgcdef gebcafd cdaebf'.split(' '), 'dbae fbd gcebfa gacfd'.split(' ')],
['gbaefc gbfdec gfdbe edbgcaf fdab dfgabe gadec agbde ba gab'.split(' '), 'bag fegdb badecfg bag'.split(' ')],
['feba fb fgbca acfdg gcfedb fdbecga eacgb abcgef fbc adgbce'.split(' '), 'gcfba afeb gbafc ebgfdc'.split(' ')],
['fegbc abdfce egdba cea cgabe faegdcb edfgcb cefbag afcg ca'.split(' '), 'dbgcfe gfac bgead aegbcf'.split(' ')],
['acdbf gfebc afe ea fdeagb fgbaced cfeadb eacd fgdcab bfaec'.split(' '), 'bgadfc bfaedc agcdbf ecgadbf'.split(' ')],
['cefag dbgecf cfbga dfceag gdfcbea dfebac eg cge gdae cadfe'.split(' '), 'dagebfc ge ge cbdfae'.split(' ')],
['cgefabd agbdc dgef bedfac gcf cafgd dfegac fg fadec afgebc'.split(' '), 'decabf febdacg bcdag fgc'.split(' ')],
['dfe bdfa gfeabd dacbegf agcfeb edacg efagd gedcfb bfgea fd'.split(' '), 'aedgc fd febag acgde'.split(' ')],
['dgcf efbcga adgfbc gbcfa adfebc eabgfdc dc acd dcabg egadb'.split(' '), 'fcdeba egcabf acfdgb dbgac'.split(' ')],
['cagfdb eagdc ea gacedfb beac bagdec gdfbae eag cgfed dacbg'.split(' '), 'dafgbe adegc daegc adcge'.split(' ')],
['adf ecgbda afegb dbacgf adfgb ecgfbda cgdf fd dacbfe cgdab'.split(' '), 'eadgbc adgbf gdaebc gdebcfa'.split(' ')],
['abfecd gdbaf cdfg bfd gacfbd df badegcf fgcba acebgf eabgd'.split(' '), 'abcfde edbag cfegab fdegbca'.split(' ')],
['cdfeba dbec dc dfcea bdfea cafebdg gadfcb cagfe fcd abgfed'.split(' '), 'gdabfc eacfg cabfde bdfgca'.split(' ')],
['eadcgb acefd degac dgface bcfaegd baegdf cfdg df ecbfa def'.split(' '), 'cefad dcgf fde feadc'.split(' ')],
['ceagbd bedgfac efbdc gd edgbc gbad gdc ebgca fgecba egcfad'.split(' '), 'ebgdca fcgade edgabc fagebc'.split(' ')],
['aedbcgf fg agfdc gbcad edfcgb egcdaf daecfb fgd ceafd afge'.split(' '), 'defac fg gedfcb gdcfeba'.split(' ')],
['egfbda dbcfeg gafc abdce dgfabec afged adegc cgdfea dgc cg'.split(' '), 'gcd degfa cbead bagefd'.split(' ')],
['de aedbf aed acfgde ebgaf cafdgeb cdfab defabg bedg acefbg'.split(' '), 'efdba befag dbafc fcaged'.split(' ')],
['cdgfba dfb efadbcg dfea ecfabg gdabef gbafe dcebg fegbd fd'.split(' '), 'fgaeb dfabge eabgf gdefb'.split(' ')],
['bagcef fabeg ebca fbged afe cdefag gcdbfa bfagc agdfbce ae'.split(' '), 'fdgbe cbgaf bace gbdef'.split(' ')],
['eafdg dfc cdfgbe bdce cebgfa gfceb dgcfe cd begafcd gdcfba'.split(' '), 'edbafgc ebgfc fcedg aefdg'.split(' ')],
['aegf bgedc cfbega fgcbda cfgeb gf eafcdb feabgdc fgc feabc'.split(' '), 'cedgb facebd bgadfc gefcb'.split(' ')],
['ebacgd faecb bd cdb cgaed bdeg fgbdca dcgafe eabcd afdbegc'.split(' '), 'dbc deacg dceba gfbacd'.split(' ')],
['aeb dcabge ba edacf bdaf fcgeb cfabde agfbdce afcbe aefdgc'.split(' '), 'abfd fgecad gdaecf afcgde'.split(' ')],
['dbgc gfcea cafgd fgcdab dg abdfc bcgeafd fgd eabfdc gdaefb'.split(' '), 'deabfg cgbd dcfbag cefag'.split(' ')],
['cabgfe baedcg cgd dg acfeg adgf bfecd fbegcad egcdf fgdace'.split(' '), 'cdg egcfba defgc acbedg'.split(' ')],
['ef fbcgd afde eafcgb bfgcdae dfacge egdabc eagdc gecfd cfe'.split(' '), 'caged efgdc gdeacf fe'.split(' ')],
['ae dfeabc fgea fbcegd fcdge ace cgdae bcefadg dbagc dcafeg'.split(' '), 'cgadb becafd dcbag fgae'.split(' ')],
['eafdbg fdgc fgeadc egacd egd ebcad bgfeca acefg fdgeabc gd'.split(' '), 'afebgd cfeadg gd ecbda'.split(' ')],
['ebgfc agcbd bgcdef ea gfea eafgbc cae ecbfad cegba egdbcfa'.split(' '), 'cafbde dgcfbe aebcfd badefc'.split(' ')],
['badfce cf ebgcd acgbfed afdgeb bfagec baedf cdbfe efc dcfa'.split(' '), 'debaf bgedfca facebgd ceabgf'.split(' ')],
['ebfac dba ecgbaf ad cbfdega edcbaf feda cebgda cdafb dcbfg'.split(' '), 'dacbf adb fgacdeb fdcba'.split(' ')],
['acdebgf gbdefa gaebd dgb gbfe aedcg aedfb afdebc gb cdagfb'.split(' '), 'geadb adfgceb eacgd debcaf'.split(' ')],
['adfb adfgce ecafd dgbace bd cfegb bfeadc begdcaf fedbc bdc'.split(' '), 'bd ecdabf dceaf dbc'.split(' ')],
['gaceb fg edbgca gafb fcbeg bfaegc eadcfg gcf bfdcega bcdfe'.split(' '), 'eacfgd becadfg gf fcbed'.split(' ')],
['bdfcg ad begac gfbadc dga abcgd dcaf gcdaefb gcbdfe gefdba'.split(' '), 'dfbcg cdabg adcbg dagbc'.split(' ')],
['febgdac fgadce fa gdfbc dcgfba gcfebd afc gabcf bagec bdfa'.split(' '), 'agbec bdfa gcbaf fbcgde'.split(' ')],
['bdfgae fgead faebgc dabg bcfdge gde gefba gd edcbafg dcfae'.split(' '), 'cgfaeb fgcabe cafgeb gdcbfe'.split(' ')],
['eadcbf agfdb bfa ab dfgbc faedg aegb dcfaebg gbfaed dfcaeg'.split(' '), 'fagbd dfgab fgadb adfceg'.split(' ')],
['gaedc aegdcbf bdgf feagbc cedfg dbfec ecdbgf fge fg cbdaef'.split(' '), 'agedc dbfegc fg efcdg'.split(' ')],
['db becfag abd agebd bgcae bced efdag gbcade gbcadf gcbeafd'.split(' '), 'bd bdgefca dgeabc bd'.split(' ')],
['febag deg gefdab becdag defa dbfge gbcfd gcbeaf bfdgaec de'.split(' '), 'fead bagef abfeg aefd'.split(' ')],
['dfac aegcbfd aefcg daebgc eadcg fa bfeadg adgcef fae fgceb'.split(' '), 'cdeagfb fea cedgab bfcge'.split(' ')],
['ed dbfgce efdcb bafcged dcge bcadf afecbg dfeagb fegbc edf'.split(' '), 'debgaf ebcdf de fdgbec'.split(' ')],
['fadg dgefc da eafcd adc gdecbf bcgdae afecdbg dgafec caefb'.split(' '), 'caedf eagbcd gdaf gefdbca'.split(' ')],
['degbcf gfdbace fbced bedg abgdfc gecfa fceadb ecbfg fgb gb'.split(' '), 'gb gbdfca dceabf fcegb'.split(' ')],
['bagfce gfbac fbdcga ceab edagf eb afgeb gfdbec cfdbgea gbe'.split(' '), 'fdgceb fdage fgbac bfeag'.split(' ')],
['afbecg aecdg bfcd dfecgb febgad efdcg fed aedgfbc df efbgc'.split(' '), 'dfcb dfcb cbgef fd'.split(' ')],
['defca bgac egdfbc gfbea fgabde ceagdbf bfaecg cb afebc fcb'.split(' '), 'cb acfeb ecabf ebfca'.split(' ')],
['cdfbga befa daebc afcdbe fdabceg aed gdcbe acfdge cafbd ea'.split(' '), 'dae cedbaf dcgeb afbe'.split(' ')],
['dbefg gecad ecafgd aedgcb fecdba cb cbedg cbd ceabgfd bacg'.split(' '), 'fegdac eadgcf geabdc cedag'.split(' ')],
['abdcfg eagf cgf ecgbd badfce cabgefd gbcef aecfb fcabeg gf'.split(' '), 'gf gabfdc cgebf abcfed'.split(' ')],
['agdceb ebadc dfebc gbdac fegdac adbfgc cae ea befdgca ageb'.split(' '), 'edfbc acbefdg cdgefa bdcga'.split(' ')],
['efca fgbca gabfe eab ae cfaegb caebdg abfgcd dfgbe cadbgef'.split(' '), 'bfacge fabcgd eafbgc cfgbad'.split(' ')],
['cedbgf efbagcd aegdcb dabef feb ef badgf cdeba acfe ecdfab'.split(' '), 'ef eadfb baedcg edfacb'.split(' ')],
['af gfa egbdf ecgabd afcgdb fbadg facegd cbaf gcbda eacbdgf'.split(' '), 'abdcg gfadbec bfedg cdbga'.split(' ')],
['dgbea afeg ef cbedfg cbgdea fcabd adfbe efd efdgba gecfbda'.split(' '), 'cfbaged ecbagd fbgecd ebgda'.split(' ')],
['gcbeaf bf ebadfg dafb bcgde daegf cagfde bdacefg bfe dgebf'.split(' '), 'gceadf gefacb fgdeba gfbdea'.split(' ')],
['dgafbe dgfce cb cbafde eadbf dbca cbf cedfb gfaceb fdegbca'.split(' '), 'bedacgf bfc cdab ecbagf'.split(' ')],
['cadbef dfgac gfb bcedf gbdafe cgbe gdcfb cagbdef egfbcd bg'.split(' '), 'gdfbc ecbfdga bdcgf bacgfed'.split(' ')],
['dfcb cd gdbae gabdfce bfceg bdcefg ced cfdeag ebdcg efgcba'.split(' '), 'fgecba edbgcf cbgfed fgdeac'.split(' ')],
['ebgdcf cdfa cgafe ace gfedc cadfge aebgf adgceb fdecgab ac'.split(' '), 'cegdf gfeba edcfg ac'.split(' ')],
['agbefd bdgfe fdcegb dce ebgcd bcdga decbafg ec eacfgd cbfe'.split(' '), 'ec edgbc cgdba ec'.split(' ')],
['bgadc adbecfg gdbfce fdg dfeac agfb fdgac fg cbfgad dcgeba'.split(' '), 'gf dcfbge bgadc fg'.split(' ')],
['badegf abegc dfgc gbdaf fdgaebc cgbfa cf dcbaef cdbgaf bfc'.split(' '), 'dabgf cageb adfgb bdfagc'.split(' ')],
['ce abgdef ecdg fgbca fdage cadgef eca acfge acfbde bedfgca'.split(' '), 'cfage bagfc gbcfa eac'.split(' ')],
['gdfbe gcfeb febgda cfb fedc baceg ecgdfab dagbfc cf fbcdge'.split(' '), 'gfebc cgdefb bcf gebca'.split(' ')],
['gceabd bc ecb bdcef ebfacd fgeadcb abfc dgfec bdafge fdeba'.split(' '), 'gcbefda egcdba ecbgad gfbead'.split(' ')],
['gabec gaefbcd bgeaf ebf dbfag ef edgafb fbdgec fade bdfgac'.split(' '), 'bef abdgf fe ceagb'.split(' ')],
['bcfaged fdbgc dafcg edfacg dfb fb bdagef cfba dgbec gfdacb'.split(' '), 'fadgc cgbfad dcbeg cafb'.split(' ')],
['bdg bfdcae eagdb eacgd fagb afebd ebfcdg fcaegbd bg egdafb'.split(' '), 'fbedgc ebadf dgeabf aefbdc'.split(' ')],
['ad cgadbef eabcfd fdabgc dba dbace ecdbf fdae bdfecg acegb'.split(' '), 'bcgfda gfdcbe eafcbd cbgea'.split(' ')],
['efbda dcbfe bc bcfg egfcd gdcefb agbcde bec ecfadbg caefdg'.split(' '), 'dcagebf bc bfcdaeg cabfedg'.split(' ')],
['agde gdacef adgfc cbdfaeg cgfde cde badfec abcfdg fbcge ed'.split(' '), 'cde eafbdc cdfbae afbecd'.split(' ')],
['fdg bgfeac afgcbd bcfag fgeacd cdfb gbead fgdba cgfdaeb fd'.split(' '), 'bgacf gecdfa fd dfg'.split(' ')],
['ga agc cedgbfa bcfdea fdgcb geab gfbca ceabf edafgc cgefba'.split(' '), 'bgcfa fcagde edbgafc becaf'.split(' ')],
['agceb ecfgba decgaf eaf ef cdbaf gdcafbe fgeb gcaebd ecabf'.split(' '), 'fbdcage aegbdfc bagce fdagce'.split(' ')],
['cdage aebfdc bgacf fbeagc cfd bgfd defcgab acfgd gafbcd fd'.split(' '), 'cfadg dbface dgbf gdfac'.split(' ')],
['cefbda afcdb dgecfb dab cdefb bafdge ad deca gaecdfb acfbg'.split(' '), 'cbdgfe fecdb bdfce efbgdc'.split(' ')],
['aefbd ebcgfa ad ade egfbd abcefd cfeab bacd afedcg dbcagfe'.split(' '), 'edcbaf gfedcab dfgeb gefbd'.split(' ')],
['agdb ecfgb fcbaed agfdc bcd fgdcba faegbdc deacfg db dgcfb'.split(' '), 'dcb gcedfa agdfc bdacgfe'.split(' ')],
['gdfeab gcdfeb dg fdebc bdacef fbcegad gbced cdgf edg baecg'.split(' '), 'gcdf dg gbeac bedcf'.split(' ')],
['eb degbc bead cbegfa cdgfb gecad gbacde bce adfecg eafbgdc'.split(' '), 'dfaceg dbgce gcadfeb bcgdea'.split(' ')],
['dgcefb cad gcbad da dfcgb bcega bcfgda afdg dbfceag fcdeab'.split(' '), 'egabc bgfdce gcadb fbacgd'.split(' ')],
['gfadce eabfgc df gedab cdgf debcfa eagdbcf acgfe edfag afd'.split(' '), 'fadeg cbeadf aecgbf adfeg'.split(' ')],
['abcdg fecd ged aegcfd dgeca afegcb afcge debgfa de eafgcbd'.split(' '), 'ged efcgda gefcad aegfc'.split(' ')],
['gbfecd gafcdeb ebcgd efgbad fg dfgbc egcf egbdca fadbc fdg'.split(' '), 'dbacf gf fbdecg gdceabf'.split(' ')],
['ebdf dbafc gdcabf dagecbf cabedf afgbce ef cfaed gecad aef'.split(' '), 'ef dacbf febd gcbafe'.split(' ')],
['daebfg gfceadb agbde aegbc ebagcd cdgb cg baefc egc dgafce'.split(' '), 'cadbeg agbdec eafcb gebac'.split(' ')],
['dcfgbe ca acgde begdc dabc efdag aecdgbf ceadbg cae aecbfg'.split(' '), 'cgebd bfedgc defga bdac'.split(' ')],
['cbdf dacge fadec df dbafge eafcb fbdace dfa bgacfe cgafdeb'.split(' '), 'df eadcfb cdefa fecad'.split(' ')],
['fb feb cgeab cagdbe ebfadc gbcf adfge aebfgc acgbdef bfgea'.split(' '), 'efcadb gdcbae fbe afegd'.split(' ')],
['dgcf gaecb gfdeba bcdef dgb fgadcbe dg fdebca dcegb begfdc'.split(' '), 'bdg ceabg gabce gd'.split(' ')],
['dagc gaedb dgeabc ag ebcdg age fcaebg adfbe cdefagb gbcdfe'.split(' '), 'bdceg gecabfd acdfegb gacfdeb'.split(' ')],
['acefdg gacebd fdga bgdcfae afceg ecadf fgebc cdfbae gea ag'.split(' '), 'cfagde ega dcefab afdg'.split(' ')],
['bcgadf defgb cfea ec gdeacb efadcbg ecd ecgadf edcgf fdcag'.split(' '), 'dce fdgbe egacbfd efcagd'.split(' ')],
['dcagb dagbcef aedcgf deafb adbfg bfgc bgafdc gcedab gfa gf'.split(' '), 'gdfba fedba eafdcbg fg'.split(' ')],
['fedacb gdbcae gefda fbcae gecafb afegc gca gc edfbgac fbcg'.split(' '), 'bgcf gac ecafgb egadf'.split(' ')],
['ecfgb fdbega cbga gce bacfeg agfedc cbfgaed cefdb bgefa gc'.split(' '), 'dgacfe daefgcb gebfa ecg'.split(' ')],
['gefadb dcfbge ag abg fbcad cfgbea edga dbegf dgfba egbcdaf'.split(' '), 'ebfdga adgcebf gbdecf dbgfeca'.split(' ')],
['ecfgbd agde eacfgdb dgcabe edbcg facbd cabfeg bdace ea aeb'.split(' '), 'aeb fabdc egdcb ebacd'.split(' ')],
['ecgfda af fac cgfde cgefbd fagecb daceb gafd ebfadcg efadc'.split(' '), 'af fcegd bgceaf fca'.split(' ')],
['ca cgade adefgb dgfea edcbg dgeafc cfga dgbceaf dfaebc dca'.split(' '), 'cedga bdceg degfa ca'.split(' ')],
['gfced dgecfb ga ceafbdg afedb acdg gfeadc cebgaf fag fdgae'.split(' '), 'cgfeab ga dcfeg dbafe'.split(' ')],
['bcefda fcega dbga abgcdfe bgfdc dfgbce dca ad fgdac cadgbf'.split(' '), 'ad bacdgf da gcdeafb'.split(' ')],
['gdcea caebgdf agfdeb cfabge cbdafg gef bcef acgfb ef fagec'.split(' '), 'ecgaf fcage acged fe'.split(' ')],
['egc bdfge cedbg befc dabgecf dgfeac cgdab ce dcfebg bgfdea'.split(' '), 'dcgeaf ec egbfd ec'.split(' ')],
['gcbdaef fd dbecag fde gcdf acebf fgdbea gbdcfe dcgbe cefbd'.split(' '), 'egfdab fd cgfabed cbdegf'.split(' ')],
['abec baf ecgaf facgbe fecbdga ba fagecd bgcfda bfage dfbge'.split(' '), 'bgceadf ebdgf dfabgc acegfd'.split(' ')],
['dca eafc dafcgb cbead efabd cfbade faedbgc gdecb gfbdae ac'.split(' '), 'adefb adfecb cfbeda acfe'.split(' ')],
['eac becfgd fgadcbe geafd fcade eagbfc bcad ca abedcf fcbed'.split(' '), 'fcbed bacd fdgecb abcgfe'.split(' ')],
['bfad cbged efdgbac gdefac fd acbgf bdfgc cafbdg acgebf cdf'.split(' '), 'fdcgae gabdcf gcbdaf cabfg'.split(' ')],
['ebg bdfce gfecb dgceafb cafeg dgfcea cafegb gb cgadbe bgaf'.split(' '), 'cebgaf dcebag gbfa egacdfb'.split(' ')],
['edbacf eba dbgcfea dbef abdcge bcgfad gcaef be ebfca cdafb'.split(' '), 'gbedca cbafd edfcab bdfe'.split(' ')],
['fcdbae efacd aebd gbedfc afgdc gfcdeba aef efdbc ae cfbeag'.split(' '), 'bcfde abcgfe dcagebf gfbdce'.split(' ')],
['abg gcdfb ag afegdbc bfagd bcdefa fedgab eagbcf deag adebf'.split(' '), 'ga bdgfc efabd edbagcf'.split(' ')],
['fb befc egafcd gdbcf gecbafd fgb dgfce dcgba cdbgfe adebgf'.split(' '), 'cbgfde bf bdfceg edgbfa'.split(' ')],
['gefab efdabcg eagcbf de eabdfg geda egcfdb faebd cadbf edb'.split(' '), 'aefcgb fbade de afbge'.split(' ')],
['edfcgb ecadgb adbcf decbf fcgaed dfegc ebd dbagcef egfb be'.split(' '), 'gbef fgeb eacdgf dfacb'.split(' ')],
['dfc ecfgad abcfd befgca cgfabd cagbf gbdc dcbaefg dc bdefa'.split(' '), 'cd ebafd dc fdc'.split(' ')],
['aefgc cfdga acbefd gebdacf efg cbefga fceba eg begfdc bega'.split(' '), 'gbfdce dfbegc geba dagcf'.split(' ')],
['cfgbad fadebgc cga efgcd afecgb ac acegf ebgfa fbgeda ebac'.split(' '), 'fgbedac ac ecba beca'.split(' ')],
['dc gbcfda dbc egabc gcadbef agbcde bgdef deac bdecg gecafb'.split(' '), 'ecad gfbaec dc cegbd'.split(' ')],
['cadgef eb cgdeab ceb cbgdf befgc egcbfa cefdgab fbae cfaeg'.split(' '), 'cgdbea acbefg gaefdc gbecf'.split(' ')],
['cdfbea gbceda cgdfb cdbge geb acgefb dage eg afcgedb beacd'.split(' '), 'aebdcg gbdeafc ebdcga bcged'.split(' ')],
['cgbfed ba agefdb acbedgf adegb dcega abdf abg gfbde gbcefa'.split(' '), 'bgedf dbgfe dfab edbfcg'.split(' ')],
['ga geabc bfedacg efga bfgaec bgecf agb cdbfag abdec fcbegd'.split(' '), 'egfdbc cefabg ga gaebc'.split(' ')],
['cfebg cfgbea acdgf edgbfc dgfabec db fdebac bedg dgfcb dbf'.split(' '), 'dcebfa egbd dfb fdcgeb'.split(' ')],
['ecdgf ad ebdgac dca caebgf gebacfd fbace dabf bdecfa fecda'.split(' '), 'bagfecd dca abgcde bcefga'.split(' ')],
['de def dbeafc dcbaf efacdgb cfagdb afcegd ecdb gfeba dabfe'.split(' '), 'bdec fadeb de febag'.split(' ')],
['bdgfac ec cde fegc fdbeca fcgdb cedgfb gbecd fecbgda edagb'.split(' '), 'fcgabd ecfg bfadgc ec'.split(' ')],
['gfc fcbagd fg dfeg gbeadcf becaf bcgeda cgaed acgfed ecgaf'.split(' '), 'eadcgb cbfea gdef ceagf'.split(' ')],
['degac bcegd cedagb ebc agfbedc dfcgb adeb be cgadfe agcebf'.split(' '), 'eb daeb cgbed fcgdb'.split(' ')],
['aebcfd feabgc fgbdca bfcag df fagbd fdagceb fcdg baedg fad'.split(' '), 'debag dcfbea bgdfa gbacfd'.split(' ')],
['bef fe agebd fgacbe dcfba aebdf edfg gecdab fgcbdea afdebg'.split(' '), 'fdeba dbeaf bdceag adgbef'.split(' ')],
['cdefb gcabdf cgbdefa eg ebg fbegd bafgce bdaegf dabgf dgae'.split(' '), 'geb bfgacd gdea abgfdc'.split(' ')],
['acegdb fcge gceabf fadbe fgcba eagfdbc ce ceafb cafdbg ace'.split(' '), 'bfead dfcbgea faebd dfaeb'.split(' ')],
['agbfe bcfgdae bca gcfb gefabd bdecfa deagc cb egfcab begac'.split(' '), 'becag gedac bfgc caedbf'.split(' ')],
['adgef egcd gda beafd gcfbda cefdag gd dgcfeba egbcfa aefcg'.split(' '), 'abgdcef ebdfa edgc eafdb'.split(' ')],
['adecf faebd gaefcb ebf bfdc badge efadbc bcfeagd agcedf bf'.split(' '), 'dgaeb edcfag fb cbegfa'.split(' ')],
['gcfa becda dabgfe af ecfda efgadbc gcfaed egfcd fcgbde eaf'.split(' '), 'fae fecgd adfebg afedcg'.split(' ')],
['gbacdfe gfaecb fgeab cg fecdbg bcafg aecg abcdf fgadeb cgf'.split(' '), 'ebcfag cbdgfe bgfecd gecfbd'.split(' ')],
['adgcef gfbde dafcgb bceagd edbgc dbc baec bc eadfbgc ecgda'.split(' '), 'cb gdbeca facdeg fdbge'.split(' ')],
['fgabe ad dfbce fad facebg fbeadg fcgaed ebafd bgad gfceadb'.split(' '), 'dcfeb egdbaf fbecd efcdb'.split(' ')],
['bgfdc gbacef fgdeba abefg afec bcgfe aebfdgc ceg degacb ec'.split(' '), 'ec fegab fgcbe ec'.split(' ')],
['egfdc cbagdef fcaed fdg dcefbg dbcge fg dcbega bcfgad befg'.split(' '), 'cdeaf dgf abcgdf edfcg'.split(' ')],
['cdfgaeb eagcd decf efdcga ed fagdc gabec egd bfedag bdgacf'.split(' '), 'cdef eabcg acegdf egbac'.split(' ')],
['badfecg gdfabc bd dba acgbd fbdaec gbdf agbfc gecda fbcega'.split(' '), 'dbgac bcgfa ebgacf gcdea'.split(' ')],
['bacgfd dabec ebdgc fgcbade fdeg fbgdec dg begcf dcg cafgbe'.split(' '), 'gaefbdc dcbae fedbgc acebd'.split(' ')],
['bdcgf aedbgc befa gcfeb fgebac efagc eb efagcd efdgbac egb'.split(' '), 'gfabce acfged egdafc ecfag'.split(' ')],
['fade facbged defcb fe gdbace fgbcd cagbef bceafd feb edcba'.split(' '), 'ef cdbea fbe becdf'.split(' ')],
['edcag gaefd edcf cfegad egdbafc cfaegb aec bdcag ce gbefad'.split(' '), 'bdfgae abcgd cae cdbgaef'.split(' ')],
['cegbf ebfca gbc gc debagf cdgbef becagdf bfdge dabceg gcdf'.split(' '), 'ebfca cegbf ecbaf eafbc'.split(' ')],
['dgafe gbcdef efcdab bcga eafcdgb cefgba abe gcefb ba egbaf'.split(' '), 'gaefbc cfagbe fcbeg cedgbf'.split(' ')],
['befgac bed dfcabe db fcgeb gfeda decafbg egcbdf bfdge cbdg'.split(' '), 'eafdg agfceb febagc gbefd'.split(' ')],
['cdbfgae gcdfea agb gbfad dgfcb faegd ebda eabgfc ba bdgaef'.split(' '), 'gdfab cbaefg bdgaf fbgeac'.split(' ')],
['cabgd cbfagd fd gecbda fceadgb fgadbe fgdc ebcfa cbdfa dfa'.split(' '), 'gefabd fd cadfb gcbdea'.split(' ')],
['efga gfbce abgce cbgead cagbdf egdfcab bafecg bfecd fg gbf'.split(' '), 'fcebd geacb gadfcb fbcgae'.split(' ')],
['efg eagfd gcea bafgecd gdfebc bdaef cdafgb afgdec dgafc eg'.split(' '), 'eafdb dafbcg cadfg caeg'.split(' ')],
['ebcgad dbe efcgd caegb cgbefda dagb fabdce ebcdg cebagf bd'.split(' '), 'cfbaeg defgc fgced becfga'.split(' ')],
['bcadge fbedg aegc dbfcag ebgad gdbac gcfdeba ae eba bcdafe'.split(' '), 'gace agcefdb gbade eba'.split(' ')],
['eabd bfcagde egacd cgebfd ad dcgeba aecfg ebcdg cfdagb acd'.split(' '), 'dcgbaf cafeg egfac bfcged'.split(' ')],
['ebaf gcdeabf edgba dfacge gfbde fgdcb aecbgd bedgaf edf ef'.split(' '), 'bdegf ef adgbef dgface'.split(' ')],
['fbedca dgefa adebcgf bacfg efc fgeca fagced ce degc gaebdf'.split(' '), 'gcfea cfgeda ebfdcga ec'.split(' ')],
['ecba fedcabg bgedf age dcfgae feacgb ae agcfb ebagf cadbgf'.split(' '), 'fegba efagb afecdg afebg'.split(' ')],
['ea edbgf efadgc bdacfeg bgafe bcafg deba edbcfg debfga fea'.split(' '), 'fgedba bade gacbf adbe'.split(' ')],
['fdbage cabgfe edb efabg aegd gdecbf fbdae de fabedcg bdcaf'.split(' '), 'begdfc adefb gfdbce aged'.split(' ')],
['dafcbge febadg cfdea fdgcae ga gaf gcda bfcade egcbf cgeaf'.split(' '), 'ceagf fcegb afg adefc'.split(' ')],
['adfebc dfgb bg befacg daebf bfegda daegc bdgae gfacbde bag'.split(' '), 'aedcg gab abgde debag'.split(' ')],
['daegfb dgec aedcfbg fdcgeb bdcef fcadeb beg ge bgfce bcagf'.split(' '), 'fcgbed dbfega beg febdc'.split(' ')],
['fgcead edgbcf adebf cfb bfacge bcfae cfeag bagc gfcaebd bc'.split(' '), 'efbad abgc edgabcf acbg'.split(' ')],
['bcafegd eafdg dbfgc edgfc cdgfab geabdc gce ec egfbcd fbce'.split(' '), 'facbdg badgce dfegc aegfd'.split(' ')],
['bcdafge bedfag cfgbad abgc dgabf dgfcb cb cdb dcefg fabdec'.split(' '), 'dcb bdfagce cbfgd cdb'.split(' ')],
['afebdc adebc gdbca fbeadcg bacfeg eafd de bcdegf edc abefc'.split(' '), 'ed cgdab feda efacb'.split(' ')],
['agecfd bgcefd fecba ga egad agbfdc fcaebgd feacg gfedc fga'.split(' '), 'dega caefb fcgea fcaeb'.split(' ')],
['bfcegad facbgd egbfa ca gcafbe afec cdebg fbeadg bca acgeb'.split(' '), 'bfgace acgfdb cgedb beafg'.split(' ')],
['cefbad fd befd ecabfg gefacbd bcefa fdeca fad dgaec dbfgca'.split(' '), 'adf geadc fd dfaec'.split(' ')],
['adfbe becagf geabf ge gacbf efg gfdcea cfbdag ecfbadg becg'.split(' '), 'fgbae afdcgeb eabdf cgbaf'.split(' ')],
['fgdcae bgdfae cfdag ea egcfa gcbfe becfgda aef ceda dabgfc'.split(' '), 'gcfaed acdgbef efbgc cade'.split(' ')],
['cgbfde cdb aefcdgb cegda dgbca bafdg fbac badcfg cb gfadbe'.split(' '), 'dcb bacf cdegfb bfdag'.split(' ')],
['gdcbe bcdega geadc bfgdae fgcad eabc cgefdb gae acfbedg ea'.split(' '), 'gbdec gcdea befgdc gecda'.split(' ')],
['df abcgdf gfeba bfagdec gbeacd bcaefd abdfg abdcg fdb dcgf'.split(' '), 'fd fdcg abgdfc gbaedfc'.split(' ')],
['eg eadcf dfabeg cedg aecdfg afgcb cefdba debfcag egf aegfc'.split(' '), 'fecad fcagbed ecfag cagfb'.split(' ')],
['fbeadc gfa fg fagbd gfdebac eafdgb dacbg fcbeag fedab gefd'.split(' '), 'agedfb fg eafcdb bgedaf'.split(' ')],
['gbcadf begcfd fcbed caed dafeb eacdbf faebg cdeafgb abd ad'.split(' '), 'cbefd cfebd cead dab'.split(' ')],
['dceba gbcaed ag gdcbf geab bdaegfc acg acdbg bcfaed afcdeg'.split(' '), 'gcdbf edbca agcbd cdgba'.split(' ')],
['facbg fdgbca afc fgcade fegbacd af cgbad cgdeba fbda cefgb'.split(' '), 'fac caf fca cabfg'.split(' ')],
['badecf acbdf efac agedfb bgedc aeb baedc bgcdfa ea fgbcead'.split(' '), 'face eafc bacfd gacbdf'.split(' ')],
['bc ebfgcd gafbcd dgeacf gfbea bgc dcbe faebgdc ecfgb ecfgd'.split(' '), 'edbafgc bgefa bcfgde dfcage'.split(' ')],
];

// data = [
// ['be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb'.split(' '), 'fdgacbe cefdb cefbgd gcbe'.split(' ')],
// ['edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec'.split(' '), 'fcgedb cgb dgebacf gc'.split(' ')],
// ['fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef'.split(' '), 'cg cg fdcagb cbg'.split(' ')],
// ['fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega'.split(' '), 'efabcd cedba gadfec cb'.split(' ')],
// ['aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga'.split(' '), 'gecf egdcabf bgf bfgea'.split(' ')],
// ['fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf'.split(' '), 'gebdcfa ecba ca fadegcb'.split(' ')],
// ['dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf'.split(' '), 'cefg dcbef fcge gbcadfe'.split(' ')],
// ['bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd'.split(' '), 'ed bcgafe cdgba cbgef'.split(' ')],
// ['egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg'.split(' '), 'gbdfcae bgc cg cgb'.split(' ')],
// ['gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc'.split(' '), 'fgae cfgab fg bagce'.split(' ')],
// ]


function part1(input, output) {
    let count = 0;
    for (let test of output) {
        if (test.length == 2 || test.length == 3 || test.length == 4 || test.length == 7) {
            ++count;
        }
    }
    return count;
}

let res1 = 0;
for (let i = 0; i < data.length; ++i) {
    res1 += part1(data[i][0], data[i][1]);
}
console.log(res1);

function mapsignals(str, mapping) {
    return str.split('').map(c => mapping[c.charCodeAt(0) - 97]).sort()
}

let mappings = permutator([0, 1, 2, 3, 4, 5, 6]);

function solve(input, output) {
    let valid = 0;
    let realmapping = null;
    outer: for (let mapping of mappings) {
        let found = {};
        for (let x of input) {
            let signals = mapsignals(x, mapping);
            if (signals.length == 2 && !signals.equals([2, 5])) continue outer;
            if (signals.length == 3 && !signals.equals([0, 2, 5])) continue outer;
            if (signals.length == 4 && !signals.equals([1, 2, 3, 5])) continue outer;
            if (signals.length == 7 && !signals.equals([0, 1, 2, 3, 4, 5, 6])) continue outer;

            if (signals.length == 5) {
                // must be 2, 3 or 5
                if (signals.equals([0, 2, 3, 4, 6])) {
                    if (found['two']) continue outer;
                    found['two'] = true;
                } else if (signals.equals([0, 2, 3, 5, 6])) {
                    if (found['three']) continue outer;
                    found['three'] = true;
                } else if (signals.equals([0, 1, 3, 5, 6])) {
                    if (found['five']) continue outer;
                    found['five'] = true;
                } else {
                    continue outer;
                }
            }

            if (signals.length == 6) {
                // must be 0, 6 or 9
                if (signals.equals([0, 1, 2, 4, 5, 6])) {
                    if (found['zero']) continue outer;
                    found['zero'] = true;
                } else if (signals.equals([0, 1, 3, 4, 5, 6])) {
                    if (found['six']) continue outer;
                    found['six'] = true;
                } else if (signals.equals([0, 1, 2, 3, 5, 6])) {
                    if (found['nine']) continue outer;
                    found['nine'] = true;
                } else {
                    continue outer;
                }
            }
        }
        ++valid;
        realmapping = mapping;
    }
    if (valid != 1) {
        throw new Error('invalid');
    }
    let outputDigits = '';
    for (let x of output) {
        let ns = mapsignals(x, realmapping);
        if (ns.equals([0, 1, 2, 4, 5, 6])) outputDigits += '0';
        else if (ns.equals([2, 5])) outputDigits += '1';
        else if (ns.equals([0, 2, 3, 4, 6])) outputDigits += '2';
        else if (ns.equals([0, 2, 3, 5, 6])) outputDigits += '3';
        else if (ns.equals([1, 2, 3, 5])) outputDigits += '4';
        else if (ns.equals([0, 1, 3, 5, 6])) outputDigits += '5';
        else if (ns.equals([0, 1, 3, 4, 5, 6])) outputDigits += '6';
        else if (ns.equals([0, 2, 5])) outputDigits += '7';
        else if (ns.equals([0, 1, 2, 3, 4, 5, 6])) outputDigits += '8';
        else if (ns.equals([0, 1, 2, 3, 5, 6])) outputDigits += '9';
        else throw new Error('invalid digit');
    }
    return parseInt(outputDigits);
}

let res = 0;
for (let i = 0; i < data.length; ++i) {
    res += solve(data[i][0], data[i][1]);
}
console.log(res);
