# 背景色の設定
Titanium.UI.setBackgroundColor '#000'

win = Titanium.UI.createWindow
    title:'8-Puzzle'
    backgroundColor:'#f0f'

#tab1 = Titanium.UI.createTab
    #icon:'KS_nav_views.png'
    #title:'Tab 1'
#    window:win
view1 = Titanium.UI.createView
    width: 200

button1 = Titanium.UI.createButton
    title: 'start'
    height: 32
    width: 120
    top: 120

view1.add button1
win.add view1

view2 = Titanium.UI.createView
    width: 200

button1.addEventListener 'click', ->
    Titanium.UI.currentWindow.animate
        view: view2
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT

win.open()
