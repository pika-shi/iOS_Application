// スタートページ
var win = Titanium.UI.createWindow({
        title: '8-Puzzle',
        backgroundColor: '#eaf'
    });

// スタートボタン
var s_button = Titanium.UI.createButton({
        title: 'Start',
        height: 50,
        width: 200,
        top: 250
    });

// レコードボタン
var r_button = Titanium.UI.createButton({
        title: 'Record',
        height: 50,
        width: 200,
        top: 330
    });

var f_title = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/title.png');
var f_pika_shi = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/pika_shi.png');

// タイトルロゴ
var title = Titanium.UI.createImageView({
          image: f_title,
          height: 150,
          width: 250,
          top: 80,
          left: 47,
      });

// CREATED BY @pika_shi
var create_label = Titanium.UI.createLabel({
          text: 'CREATED BY @pika_shi',
          textAlign:'center',
          font:{fontSize:13},
          width:'auto',
          height: 'auto',
          top:440
      });

win.add(title);
win.add(s_button);
win.add(r_button);
win.add(create_label);
win.open();

// DBに接続
con = Titanium.Database.open('record');
// テーブルがない場合，作成
con.execute('CREATE TABLE IF NOT EXISTS TIME (TIME INTEGER)');

// パズルピースの画像を取得
var f1 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/1.png');
var f2 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/2.png');
var f3 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/3.png');
var f4 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/4.png');
var f5 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/5.png');
var f6 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/6.png');
var f7 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/7.png');
var f8 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/8.png');

// レコードページの王冠の画像
var f9 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/clown-gl01_b.png');

// レコードボタンクリック時
r_button.addEventListener('click', function()
{
  var win = Titanium.UI.createWindow({
          height:0,
          backgroundColor:'#eaf',
          bottom:0
      });

  // アニメーション
  var anime = Titanium.UI.createAnimation();
  anime.height = 500;
  anime.duration = 300;

  // クローズボタン
  var c_b = Titanium.UI.createButton({
          title:'Close',
          height:50,
          width:120,
          top:400,
          left:170
      });

  // デリートボタン
  var d_b = Titanium.UI.createButton({
          title:'Del Record',
          height:50,
          width:120,
          top:400,
          left:30
      });

  // 王冠の画像
  var v = Titanium.UI.createImageView({
          image: f9,
          height: 50,
          width: 50,
          top: 120,
          left: 59,
      });

  // タイトル
  var record_label = Titanium.UI.createLabel({
          text:'Record',
          textAlign:'center',
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:65
      });

  // 順位ラベル
  var n_2 = Titanium.UI.createLabel({
          text:'2.',
          left:76,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:180
      });

  var n_3 = Titanium.UI.createLabel({
          text:'3.',
          left:76,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:230
      });

  var n_4 = Titanium.UI.createLabel({
          text:'4.',
          left:76,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:280
      });

  var n_5 = Titanium.UI.createLabel({
          text:'5.',
          left:76,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:330
      });

  // タイムラベル
  var r_1 = Titanium.UI.createLabel({
          text:'----------',
          left:130,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:130
      });

  var r_2 = Titanium.UI.createLabel({
          text:'----------',
          left:130,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:180
      });

  var r_3 = Titanium.UI.createLabel({
          text:'----------',
          left:130,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:230
      });

  var r_4 = Titanium.UI.createLabel({
          text:'----------',
          left:130,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:280
      });

  var r_5 = Titanium.UI.createLabel({
          text:'----------',
          left:130,
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:330
      });

  win.add(v); win.add(record_label);
  win.add(n_2); win.add(n_3); win.add(n_4); win.add(n_5);
  win.add(r_1); win.add(r_2); win.add(r_3); win.add(r_4); win.add(r_5);

  // レコード数
  var cnt = con.execute('SELECT DISTINCT COUNT(*) FROM TIME').field(0);
  // レコードを取得
  var time_list = con.execute('SELECT DISTINCT TIME FROM TIME ORDER BY TIME');

  // レコードを表示
  if (cnt >= 1) {
      r_1.text = createTimeLabel(time_list.field(0));
  }

  if (cnt >= 2) {
      time_list.next();
      r_2.text = createTimeLabel(time_list.field(0));
  }

  if (cnt >= 3) {
      time_list.next();
      r_3.text = createTimeLabel(time_list.field(0));
  }

  if (cnt >= 4) {
      time_list.next();
      r_4.text = createTimeLabel(time_list.field(0));
  }

  if (cnt >= 5) {
      time_list.next();
      r_5.text = createTimeLabel(time_list.field(0));
  }

  time_list.close();

  // クローズボタンクリック時
  c_b.addEventListener('click', function()
  {
    anime.height = 0;
    win.close(anime);
  });

  // デリートボタンクリック時
  d_b.addEventListener('click', function()
  {
      var alert = Titanium.UI.createAlertDialog({
              title: 'Alert',
              message: 'Delete Reord?',
              buttonNames: ['OK','Cancel'],
              cancel: 1
          });

      // アラートダイアログ
      alert.addEventListener('click',function(event){
              if(event.index == 0){
                  con.execute('DELETE FROM TIME');
                  r_1.text = '----------';
                  r_2.text = '----------';
                  r_3.text = '----------';
                  r_4.text = '----------';
                  r_5.text = '----------';
              }
          });

      alert.show();
  });

  win.add(c_b);
  win.add(d_b);
  win.open(anime);
});

// スタートボタンクリック時
s_button.addEventListener('click', function()
{
  // セレクトページ
  var win = Titanium.UI.createWindow({
          height:0,
          backgroundColor:'#eaf',
          bottom:0
        });

  // アニメーション
  var anime = Titanium.UI.createAnimation();
  anime.height = 500;
  anime.duration = 300;

  // スタートボタン
  var s_b = Titanium.UI.createButton({
          title:'OK',
          height:50,
          width:120,
          top:400,
          left:30
  });

  // クローズボタン
  var c_b = Titanium.UI.createButton({
          title:'Close',
          height:50,
          width:120,
          top:400,
          left:170
      });

  // タイトル
  var select_label = Titanium.UI.createLabel({
          text:'Select',
          textAlign:'center',
          font:{fontSize:30},
          width:'auto',
          height:'auto',
          top:65
      });

  var original = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/original.jpg');
  var normal = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/normal.png');

  var o_v = Titanium.UI.createImageView({
          image: original,
          height: 130,
          width: 130,
          top: 230,
          left: 170
      });

  var o_flame = Titanium.UI.createView({
          height: 140,
          width: 140,
          top: 225,
          left: 165,
          backgroundColor: '#eaf',
          borderRadius: 5,
      });

  var n_v = Titanium.UI.createImageView({
          image: normal,
          height: 130,
          width: 130,
          top: 140,
          left: 20
      });

  var n_flame = Titanium.UI.createView({
          height: 140,
          width: 140,
          top: 135,
          left: 15,
          backgroundColor: '#eaf',
          borderRadius: 5,
      });

  index = 0;

  // パズル選択
  o_v.addEventListener('click', function()
  {
      o_flame.backgroundColor = '#f5e';
      n_flame.backgroundColor = '#eaf';
      index = 1;
  });

  n_v.addEventListener('click', function()
  {
      o_flame.backgroundColor = '#eaf';
      n_flame.backgroundColor = '#f5e';
      index = 2;
  });

  // クローズボタンクリック時
  c_b.addEventListener('click', function()
  {
      anime.height = 0;
      win.close(anime);
  });

  // スタートボタンクリック時
  s_b.addEventListener('click', function()
  {
      if (index == 0) {
          var alert = Titanium.UI.createAlertDialog({
                  title:'Alert',
                  message:'Select Puzzle.'
              }).show();
      }
      else {
          // パズルページ
          var win = Titanium.UI.createWindow({
                  height:0,
                  backgroundColor:'#eaf',
                  bottom:0
              });

          // アニメーション
          var anime = Titanium.UI.createAnimation();
          anime.height = 500;
          anime.duration = 300;

          // スタートボタン
          var s_b = Titanium.UI.createButton({
                  title:'Start',
                  height:50,
                  width:120,
                  top:60,
                  left:30
              });

          // クローズボタン
          var c_b = Titanium.UI.createButton({
                  title:'Close',
                  height:50,
                  width:120,
                  top:60,
                  left:170
              });

          // パズルエリア
          var view = Titanium.UI.createView({
                  height: 244,
                  width: 244,
                  top: 130,
                  borderRadius: 3,
                  backgroundColor: '#000'
              });

          win.add(view);
          win.add(s_b);
          win.add(c_b);

          // パズルピース
          if (index == 1) {
              v1 = createOriginalSquare(1, 1, 1, f1);
              v2 = createOriginalSquare(1, 82, 2, f2);
              v3 = createOriginalSquare(82, 1, 4, f3);
              v4 = createOriginalSquare(82, 82, 5, f4);
              v5 = createOriginalSquare(82, 163, 6, f5);
              v6 = createOriginalSquare(163, 1, 7, f6);
              v7 = createOriginalSquare(163, 82, 8, f7);
              v8 = createOriginalSquare(163, 163, 9, f8);
          }
          else {
              v1 = createNormalSquare(1, 1, 1);
              v2 = createNormalSquare(1, 82, 2);
              v3 = createNormalSquare(1, 163, 3);
              v4 = createNormalSquare(82, 1, 4);
              v5 = createNormalSquare(82, 82, 5);
              v6 = createNormalSquare(82, 163, 6);
              v7 = createNormalSquare(163, 1, 7);
              v8 = createNormalSquare(163, 82, 8);
          }

          view.add(v1); view.add(v2); view.add(v3); view.add(v4);
          view.add(v5); view.add(v6); view.add(v7); view.add(v8);

          // パズルピースに番号を付与
          if (index == 2) {
              l1 = createNormalLabel('1');
              l2 = createNormalLabel('2');
              l3 = createNormalLabel('3');
              l4 = createNormalLabel('4');
              l5 = createNormalLabel('5');
              l6 = createNormalLabel('6');
              l7 = createNormalLabel('7');
              l8 = createNormalLabel('8');

              v1.add(l1); v2.add(l2); v3.add(l3); v4.add(l4);
              v5.add(l5); v6.add(l6); v7.add(l7); v8.add(l8);
          }

          // 各マスの位置情報
          ar = new Array();
          // ar[0]は使用しない
          ar[0] = new Array(3);
          ar[0][0] = 0; ar[0][0] = 0; ar[0][2] = 0;
          ar[1] = new Array(3);
          ar[1][0] = 1; ar[1][1] = 1; ar[1][2] = 1;
          ar[2] = new Array(3);
          ar[2][0] = 1; ar[2][1] = 82; ar[2][2] = 2;
          ar[3] = new Array(3);
          ar[3][0] = 1; ar[3][1] = 163; ar[3][2] = 3;
          ar[4] = new Array(3);
          ar[4][0] = 82; ar[4][1] = 1; ar[4][2] = 4;
          ar[5] = new Array(3);
          ar[5][0] = 82; ar[5][1] = 82; ar[5][2] = 5;
          ar[6] = new Array(3);
          ar[6][0] = 82; ar[6][1] = 163; ar[6][2] = 6;
          ar[7] = new Array(3);
          ar[7][0] = 163; ar[7][1] = 1; ar[7][2] = 7;
          ar[8] = new Array(3);
          ar[8][0] = 163; ar[8][1] = 82; ar[8][2] = 8;
          ar[9] = new Array(3);
          ar[9][0] = 163; ar[9][1] = 163; ar[9][2] = 9;

          // タイマーラベル
          var countup_label = Titanium.UI.createLabel({
                  text: '00:00.0',
                  textAlign:'center',
                  font:{fontSize:30},
                  width:'auto',
                  height: 'auto',
                  top:385
              });
          win.add(countup_label);

          // クリアした時の表示ラベル
          clear_label = Titanium.UI.createLabel({
                  text: 'Clear!',
                  textAlign:'center',
                  font:{fontSize:30, fontFamily: 'Arial'},
                  //color: '#f00',
                  width:'auto',
                  height: 'auto',
                  top:430
              });
          win.add(clear_label);
          clear_label.hide();

          // クローズボタンクリック時
          c_b.addEventListener('click', function()
                               {
                                   anime.height = 0;
                                   win.close(anime);
                               });

          // パズルの並列実行を避けるためのカウンタ
          var count = 0;

          // カウントアップ用カウンタ
          c = 0;

          // スタートボタンクリック時
          s_b.addEventListener('click', function()
          {
              // 2回目以降の場合，タイマーを再起動
              if (c != 0) {
                  clear_label.hide();
                  clearInterval(timer);
                  c = 0;
              }
              // 0.1sごとにカウントアップ
              timer = setInterval(function(){
                      c++;
                      var m = parseInt(c / 600);
                      if (m < 10) {
                          m = "0" + m;
                      }
                      var s = ((c % 600) / 10).toFixed(1);
                      if (s < 10) {
                          s = "0" + s;
                      }
                      countup_label.text = m + ":" + s;
                  }, 100);

              // 初期値を設定
              v1, v2, v3, v4, v5, v6, v7, v8, space = Initialize(v1, v2, v3, v4, v5, v6, v7, v8);

              // クリアしたかを示すフラグ
              clear = 0;

              if (count == 0) {
                  // マスを移動
                  touchSquare(v1);
                  touchSquare(v2);
                  touchSquare(v3);
                  touchSquare(v4);
                  touchSquare(v5);
                  touchSquare(v6);
                  touchSquare(v7);
                  touchSquare(v8);
              }
              count += 1;
          });
          win.add(view);
          win.open(anime);
      }
  });

  win.add(select_label);
  win.add(o_flame);
  win.add(o_v);
  win.add(n_flame);
  win.add(n_v);
  win.add(s_b);
  win.add(c_b);
  win.open(anime);

});

// タイムラベルを生成
function createTimeLabel (time) {
    var m = parseInt(time / 600);
    if (m < 10) {
        m = "0" + m;
    }
    var s = ((time % 600) / 10).toFixed(1);
    if (s < 10) {
        s = "0" + s;
    }
    return(m + ":" + s);
}

// パズルピースを生成
function createOriginalSquare (t, l, locate, f) {
    v = Titanium.UI.createImageView({
            image: f,
            height: 80,
            width: 80,
            top: t,
            left: l,
            borderRadius: 3,
            locate: locate,
        });
    return(v);
}

// パズルピースを生成
function createNormalSquare (t, l, locate) {
    v = Titanium.UI.createView({
            height: 80,
            width: 80,
            top: t,
            left: l,
            borderRadius: 10,
            backgroundColor: '#0bf',
            locate: locate,
        });
    return(v);
}

// ラベルを生成
function createNormalLabel (text){
    l = Titanium.UI.createLabel({
            text:text,
            color:'#fff',
            textAlign:'center',
            font:{fontSize:40}
        });
    return(l);
}

function Initialize (v1, v2, v3, v4, v5, v6, v7, v8) {
    // 初期値の候補
    var i_ar = new Array(3);
    i_ar[0] = 0;
    i_ar[1] = new Array(5);
    i_ar[2] = new Array(5);
    i_ar[2][0] = new Array(6,2,9,7,3,8,1,5,4);
    i_ar[2][1] = new Array(3,8,6,7,1,4,5,9,2);
    i_ar[2][2] = new Array(9,8,7,3,4,5,1,2,6);
    i_ar[2][3] = new Array(9,5,4,2,3,7,8,1,6);
    i_ar[2][4] = new Array(3,9,2,5,1,6,4,7,8);
    i_ar[1][0] = new Array(3,6,4,1,5,2,9,7,8);
    i_ar[1][1] = new Array(2,8,6,7,3,1,9,5,4);
    i_ar[1][2] = new Array(9,5,6,8,4,3,1,7,2);
    i_ar[1][3] = new Array(8,9,5,1,7,3,4,6,2);
    i_ar[1][4] = new Array(4,2,3,7,9,1,5,8,6);

    // 乱数を生成
    var r = Math.floor(Math.random()*5);

    v1.top = ar[i_ar[index][r][0]][0]; v1.left = ar[i_ar[index][r][0]][1]; v1.locate = ar[i_ar[index][r][0]][2];
    v2.top = ar[i_ar[index][r][1]][0]; v2.left = ar[i_ar[index][r][1]][1]; v2.locate = ar[i_ar[index][r][1]][2];
    v3.top = ar[i_ar[index][r][2]][0]; v3.left = ar[i_ar[index][r][2]][1]; v3.locate = ar[i_ar[index][r][2]][2];
    v4.top = ar[i_ar[index][r][3]][0]; v4.left = ar[i_ar[index][r][3]][1]; v4.locate = ar[i_ar[index][r][3]][2];
    v5.top = ar[i_ar[index][r][4]][0]; v5.left = ar[i_ar[index][r][4]][1]; v5.locate = ar[i_ar[index][r][4]][2];
    v6.top = ar[i_ar[index][r][5]][0]; v6.left = ar[i_ar[index][r][5]][1]; v6.locate = ar[i_ar[index][r][5]][2];
    v7.top = ar[i_ar[index][r][6]][0]; v7.left = ar[i_ar[index][r][6]][1]; v7.locate = ar[i_ar[index][r][6]][2];
    v8.top = ar[i_ar[index][r][7]][0]; v8.left = ar[i_ar[index][r][7]][1]; v8.locate = ar[i_ar[index][r][7]][2];

    var location = new Array(0, {x:41, y:41}, {x:122, y:41}, {x:203, y:41}, {x:41, y:122},
                             {x:122, y:122}, {x:203, y:122}, {x:41, y:203}, {x:122, y:203}, {x:203, y:203});

    // アニメーションを初期値に戻す
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][0]];
    a.duration = 1;
    v1.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][1]];
    a.duration = 1;
    v2.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][2]];
    a.duration = 1;
    v3.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][3]];
    a.duration = 1;
    v4.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][4]];
    a.duration = 1;
    v5.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][5]];
    a.duration = 1;
    v6.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][6]];
    a.duration = 1;
    v7.animate(a);
    a = Titanium.UI.createAnimation();
    a.center = location[i_ar[index][r][7]];
    a.duration = 1;
    v8.animate(a);

    return(v1, v2, v3, v4, v5, v6, v7, v8, i_ar[index][r][8]);
}

// パズルピースを移動
function touchSquare (v) {
    var s_x; var s_y; var r; var count = 0;
    var a = Titanium.UI.createAnimation();

    v.addEventListener('touchstart', function(e)
    {
        // タッチ開始時点の座標を保存
        s_x = e.x;
        s_y = e.y;
        // 空いているスペースのチェック
        r = checkSpace(v);
    });

    v.addEventListener('touchmove', function(e)
    {
        // 右移動
        if ((e.x - s_x > 50) && (count == 0) && (r.right == 1)) {
            a.center = {x:v.left + 121, y:v.top + 40};
            a.duration = 300;
            v.animate(a);
            v.left += 81;
            v.locate += 1;
            space -= 1;
            count = 1;
        }
        // 左移動
        if ((e.x - s_x < -50) && (count == 0) && (r.left == 1)) {
            a.center = {x:v.left - 41, y:v.top + 40};
            a.duration = 300;
            v.animate(a);
            v.left -= 81;
            v.locate -= 1;
            space += 1;
            count = 1;
        }
        // 下移動
        if ((e.y - s_y > 50) && (count == 0) && (r.down == 1)) {
            a.center = {x:v.left + 40, y:v.top + 121};
            a.duration = 300;
            v.animate(a);
            v.top += 81;
            v.locate += 3;
            space -= 3;
            count = 1;
        }
        // 上移動
        if ((e.y - s_y < -50) && (count == 0) && (r.up == 1)) {
            a.center = {x:v.left + 40, y:v.top - 41};
            a.duration = 300;
            v.animate(a);
            v.top -= 81;
            v.locate -= 3;
            space += 3;
            count = 1;
        }
    });

    v.addEventListener('touchend', function(e)
    {
        count = 0;
        if (((v1.locate == 1) && (v2.locate == 2) && (v3.locate == 4) &&
            (v4.locate == 5) && (v5.locate == 6) && (v6.locate == 7) &&
             (v7.locate == 8) && (v8.locate == 9) && (clear == 0) && (index == 1)) ||
            ((v1.locate == 1) && (v2.locate == 2) && (v3.locate == 3) &&
            (v4.locate == 4) && (v5.locate == 5) && (v6.locate == 6) &&
             (v7.locate == 7) && (v8.locate == 8) && (clear == 0) && (index == 2))) {
            setTimeout(function(){
                    con.execute('INSERT INTO TIME (TIME) VALUES (?)', c);
                    if (c  ==  con.execute('SELECT MIN(TIME) FROM TIME').field(0)) {
                        clear_label.text = 'New Record!';
                        clear_label.show();
                    }
                    else {
                        clear_label.text = 'Clear!';
                        clear_label.show();
                    }
                    clearInterval(timer);
                }, 300);
            // フラグを変更
            clear = 1;
        }
    });
}

// 空いているスペースのチェック
function checkSpace (v) {
    var up = 0; var down = 0; var right = 0; var left = 0;
    if (v.locate == 1){
        if (space == 2) {
            right = 1;
        }
        if (space == 4) {
            down = 1;
        }
    }

    if (v.locate == 2){
        if (space == 1) {
            left = 1;
        }
        if (space == 3) {
            right = 1;
        }
        if (space == 5) {
            down = 1;
        }
    }

    if (v.locate == 3){
        if (space == 2) {
            left = 1;
        }
        if (space == 6) {
            down = 1;
        }
    }

    if (v.locate == 4){
        if (space == 1) {
            up = 1;
        }
        if (space == 5) {
            right = 1;
        }
        if (space == 7) {
            down = 1;
        }
    }

    if (v.locate == 5){
        if (space == 2) {
            up = 1;
        }
        if (space == 4) {
            left = 1;
        }
        if (space == 6) {
            right = 1;
        }
        if (space == 8) {
            down = 1;
        }
    }

    if (v.locate == 6){
        if (space == 3) {
            up = 1;
        }
        if (space == 5) {
            left = 1;
        }
        if (space == 9) {
            down = 1;
        }
    }

    if (v.locate == 7){
        if (space == 4) {
            up = 1;
        }
        if (space == 8) {
            right = 1;
        }
    }

    if (v.locate == 8){
        if (space == 5) {
            up = 1;
        }
        if (space == 7) {
            left = 1;
        }
        if (space == 9) {
            right = 1;
        }
    }

    if (v.locate == 9){
        if (space == 6) {
            up = 1;
        }
        if (space == 8) {
            left = 1;
        }
    }

    return {right: right, left: left, down: down, up: up};
}