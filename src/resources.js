var descriptors = "descriptors/"
var charaset = "charaset/"
var levelsFolder = "levels/"
var charasetsFolder = "charaset/"
var charasFolder = "charas/"
var resources = {
    tileset: null,
    playerChara: null,
    printerset: null,
    playerCharaset: null,
    faceset: null,
    feedback: {},
    items: {},
    levels: {},
    charasets: {},
    charas: {},
    hms: {}
};

resources.harvest = function(callback) {
    var filecount = 0;
    document.getElementsByTagName('canvas')[0].getContext('2d').fillStyle = '#FFFFFF';

    var getresource = function(getthis) {
        var toreturn = jsonGet(getthis)
        if (!(typeof toreturn.resources === "undefined")) {
            if (!(typeof toreturn.resources.audio === "undefined")) {

            }
        }
        filecount += 1
        if (!(typeof toreturn.Level === "undefined")) {
            document.getElementsByTagName('canvas')[0].getContext('2d').fillText(".", filecount, filecount)
        }
        return toreturn
    }

    this.tileset = []
    this.faceset = document.getElementById("faceset");
    this.charasetimg = document.getElementById("charasetimg");
    this.printerset = document.getElementById("printerimg");
    this.monsterimg = document.getElementById("monsterbattleimg");
    this.tile = {}
    this.pictures = {}
    this.syspictures = {}
    this.syspictures.title = document.getElementById("titleimg");
    this.syspictures.keys0 = document.getElementById("keys0");
    this.syspictures.keys1 = document.getElementById("keys1");
    this.syspictures.keys2 = document.getElementById("keys2");
    this.syspictures.controllers = document.getElementById("controllers");

    this.feedback = getresource(descriptors + "feedback.json")['Feedback'];
    this.tileslist = []

    LevelsList = init['LevelsList']
    for (var level in LevelsList) {
        var levelItem = LevelsList[level]
        console.log(descriptors + levelsFolder + levelItem)
        resources['levels'][level] = getresource(descriptors + levelsFolder + levelItem);
        var tileimage = resources['levels'][level]['Level']['tileImage']
        if (this.tileslist.indexOf(tileimage) < 0) {
            this.tileslist.push(tileimage)
        }
    }
    CharasetFileList = init['CharasetFileList']
    for (var charasetfilep in CharasetFileList) {
        var charasetfile = CharasetFileList[charasetfilep]
        console.log(descriptors + charasetsFolder + charasetfile)
        resources['charasets'] = getresource(descriptors + charasetsFolder + charasetfile)['Charaset'];
    }
    resources['charas'] = getresource(descriptors + "charas.json")['Charas'];
    this.playerCharaset = resources['charasets'][init['Player']['charaSet']];
    this.hms = getresource(descriptors + init["HMSFile"])
    this.items = getresource(descriptors + init["itemsFile"])['Items']

    this.pictureList = init['PictureList']

    pic_count = 0
    index = 0

    function loadImages(src, callback) {
        if(index < resources.tileslist.length){
            resources.tile[src] = new Image();
            resources.tile[src].onload = function() {
                index++;
                if (index < resources.tileslist.length) {
                    loadImages(resources.tileslist[index], callback);
                } else if (pic_count < resources.pictureList.length){
                    loadImages(resources.pictureList[pic_count], callback);
                } else {
                    callback()
                }
            };
            resources.tile[src].src = src;
        } else {
            var name = src
            resources.pictures[name] = new Image();
            resources.pictures[name].onload = function() {
                pic_count++;
                if(pic_count < resources.pictureList.length){
                    loadImages(resources.pictureList[pic_count], callback)
                } else {
                    callback()
                }
            };
            resources.pictures[name].src = 'img/pictures/'+name+'.png'
        }
    }

    loadImages(resources.tileslist[index], callback)


    //CharasFileList = init['CharasFileList']
    //for (var charasfilep in CharasFileList) {
    //    var charasfile = CharasFileList[charasfilep]
    //    console.log(descriptors+charasFolder+charasfile)
    //    resources['charas'] = jsonGet(descriptors+charasFolder+charasfile)['Charas'];
    //}


}
