(function(){
'use strict';

var DEFAULT_FOOD_TREE = [
  {name:'猪肉', emoji:'🥓', bg:'#F7D8D2', items:['五花肉','猪里脊','排骨','猪绞肉','猪蹄','培根火腿']},
  {name:'鸡肉', emoji:'🍗', bg:'#F8E3C8', items:['鸡胸肉','鸡腿肉','鸡翅','全鸡','鸡绞肉']},
  {name:'牛肉', emoji:'🥩', bg:'#F2D0CC', items:['牛里脊','牛腩','牛排','牛绞肉']},
  {name:'海鲜水产', emoji:'🦐', bg:'#D6EAEA', items:['虾','鱼','贝类','蟹','鱿鱼']},
  {name:'蔬菜', emoji:'🥬', bg:'#DFEEDA', items:['菠菜','生菜','番茄','西兰花','土豆','南瓜','蘑菇','青椒','胡萝卜','白菜','黄瓜','茄子','洋葱']},
  {name:'蛋奶豆制品', emoji:'🥚', bg:'#F8EBC9', items:['鸡蛋','豆腐','牛奶','芝士','酸奶','淡奶油']},
  {name:'米面主食', emoji:'🍚', bg:'#EFE4D2', items:['米饭','面条','意面','面粉','燕麦','面包']},
  {name:'其他', emoji:'🍽️', bg:'#E7E1D8', items:['水果','坚果','调味料']}
];
var DEFAULT_METHODS = ['电饭锅','炒','煎炸','蒸','煮炖','烤','凉拌','免开火','空气炸锅','微波炉'];

var SAMPLES = [
  {
    title:'番茄炒蛋', minutes:8, baseServings:2, favorite:true,
    foods:['蔬菜/番茄','蛋奶豆制品/鸡蛋'], methods:['炒'], tags:['快手','下饭'],
    ingredients:[{n:'番茄',q:2,u:'个',t:'main'},{n:'鸡蛋',q:3,u:'个',t:'main'},{n:'小葱',q:1,u:'根',t:'se'},{n:'白糖',q:1,u:'茶匙',t:'se'},{n:'食用油',q:1,u:'汤匙',t:'se'},{n:'盐',q:null,u:'',t:'se'}],
    steps:['番茄顶部划十字，开水烫 30 秒后去皮切块；鸡蛋打散加一小勺水。','热锅倒油，蛋液下锅稍凝固就快速划散，盛出备用。','锅里再放少许油，下番茄块中火炒出汁，加白糖和少许盐。','倒回鸡蛋翻匀，撒葱花出锅。'],
    note:'番茄去皮口感更软；蛋液里加一点水，炒出来会更嫩。'
  },
  {
    title:'蒜蓉炒生菜', minutes:6, baseServings:2, favorite:false,
    foods:['蔬菜/生菜'], methods:['炒'], tags:['快手','素食'],
    ingredients:[{n:'生菜',q:1,u:'颗',t:'main'},{n:'蒜',q:3,u:'瓣',t:'se'},{n:'蚝油',q:1,u:'汤匙',t:'se'},{n:'食用油',q:1,u:'汤匙',t:'se'},{n:'盐',q:null,u:'',t:'se'}],
    steps:['生菜掰开洗净，甩干水分；蒜切末。','热锅下油和蒜末，小火爆香。','转大火下生菜，快速翻炒 30 秒至刚塌软。','沿锅边淋蚝油，翻匀立刻关火。'],
    note:'全程大火快炒，出锅前才调味，不然会出水。'
  },
  {
    title:'菠菜蛋花汤', minutes:10, baseServings:2, favorite:false,
    foods:['蔬菜/菠菜','蛋奶豆制品/鸡蛋'], methods:['煮炖'], tags:['清淡','暖胃'],
    ingredients:[{n:'菠菜',q:150,u:'g',t:'main'},{n:'鸡蛋',q:1,u:'个',t:'main'},{n:'姜',q:2,u:'片',t:'se'},{n:'香油',q:1,u:'茶匙',t:'se'},{n:'盐',q:null,u:'',t:'se'}],
    steps:['菠菜洗净切段，开水焯 20 秒去草酸后捞出。','锅中加水与姜片烧开，下菠菜煮 1 分钟。','蛋液打散，边搅边细细淋入，形成蛋花。','加盐调味，关火淋香油。'],
    note:'淋蛋液时火调小、水流别太急，蛋花才漂亮。'
  },
  {
    title:'电饭锅排骨焖饭', minutes:45, baseServings:3, favorite:false,
    foods:['猪肉/排骨','米面主食/米饭','蔬菜/胡萝卜'], methods:['电饭锅'], tags:['一锅出','懒人'],
    ingredients:[{n:'排骨',q:400,u:'g',t:'main'},{n:'大米',q:2,u:'杯',t:'main'},{n:'胡萝卜',q:1,u:'根',t:'main'},{n:'生抽',q:2,u:'汤匙',t:'se'},{n:'老抽',q:1,u:'茶匙',t:'se'},{n:'姜',q:3,u:'片',t:'se'},{n:'冰糖',q:1,u:'茶匙',t:'se'}],
    steps:['排骨冷水下锅焯去血沫，沥干；胡萝卜切丁。','排骨加生抽、老抽、冰糖、姜片抓匀，腌 10 分钟。','大米洗净放入电饭锅，加正常煮饭量的水，铺上排骨和胡萝卜丁。','按下煮饭键，跳闸后再焖 10 分钟，拌匀即可。'],
    note:'水比平时少一点点，因为排骨会出汁。'
  },
  {
    title:'红烧五花肉', minutes:60, baseServings:3, favorite:false,
    foods:['猪肉/五花肉'], methods:['煮炖'], tags:['下饭','硬菜'],
    ingredients:[{n:'五花肉',q:500,u:'g',t:'main'},{n:'冰糖',q:20,u:'g',t:'se'},{n:'生抽',q:2,u:'汤匙',t:'se'},{n:'老抽',q:1,u:'汤匙',t:'se'},{n:'料酒',q:2,u:'汤匙',t:'se'},{n:'姜',q:4,u:'片',t:'se'},{n:'八角',q:1,u:'个',t:'se'}],
    steps:['五花肉切 3 cm 方块，冷水下锅加姜片料酒焯 3 分钟，洗净沥干。','锅里少油下冰糖，小火炒到枣红色，立刻下肉块翻炒上色。','加生抽、老抽、料酒、八角，倒热水没过肉面。','大火烧开转小火盖盖炖 40 分钟，开盖收汁到浓稠挂勺。'],
    note:'炒糖色别过头，发苦就没救了；中途一定加热水。'
  },
  {
    title:'酥炸猪里脊', minutes:25, baseServings:2, favorite:false,
    foods:['猪肉/猪里脊'], methods:['煎炸'], tags:['宴客','香脆'],
    ingredients:[{n:'猪里脊',q:300,u:'g',t:'main'},{n:'鸡蛋',q:1,u:'个',t:'main'},{n:'淀粉',q:3,u:'汤匙',t:'se'},{n:'面包糠',q:60,u:'g',t:'se'},{n:'料酒',q:1,u:'汤匙',t:'se'},{n:'盐',q:null,u:'',t:'se'},{n:'食用油',q:null,u:'',t:'se'}],
    steps:['里脊切 1 cm 厚片，用刀背拍松，加料酒和盐腌 15 分钟。','按淀粉、蛋液、面包糠的顺序依次裹匀。','油烧到六成热（筷子周围冒小泡），下肉片中火炸 2 分钟定型。','捞出升温复炸 30 秒至金黄，沥油后切条。'],
    note:'复炸一次才脆；一次别下太多，油温会掉。'
  },
  {
    title:'电饭锅盐焗鸡', minutes:50, baseServings:4, favorite:false,
    foods:['鸡肉/全鸡'], methods:['电饭锅'], tags:['一锅出','宴客'],
    ingredients:[{n:'三黄鸡',q:1,u:'只',t:'main'},{n:'盐焗鸡粉',q:1,u:'包',t:'se'},{n:'姜',q:5,u:'片',t:'se'},{n:'小葱',q:3,u:'根',t:'se'},{n:'食用油',q:1,u:'汤匙',t:'se'}],
    steps:['整鸡处理干净擦干，内外抹匀盐焗鸡粉和少许油，腌 20 分钟。','电饭锅底铺满姜片和葱段，把鸡整只放进去。','按煮饭键，跳闸后保温再焖 15 分钟。','取出稍放凉，撕块或斩件，淋锅里的鸡汁。'],
    note:'锅底一定要铺满葱姜，防粘还增香。'
  },
  {
    title:'香煎鸡胸肉', minutes:18, baseServings:2, favorite:false,
    foods:['鸡肉/鸡胸肉'], methods:['煎炸'], tags:['高蛋白','备餐'],
    ingredients:[{n:'鸡胸肉',q:2,u:'块',t:'main'},{n:'橄榄油',q:1,u:'汤匙',t:'se'},{n:'黑胡椒',q:null,u:'',t:'se'},{n:'盐',q:null,u:'',t:'se'},{n:'柠檬',q:0.5,u:'个',t:'se'},{n:'蒜',q:2,u:'瓣',t:'se'}],
    steps:['鸡胸横刀片成两片，用刀背拍松，两面抹盐和黑胡椒。','平底锅倒油，中火下蒜瓣和鸡胸，每面煎 3 分钟不要频繁翻动。','关火盖盖焖 3 分钟，用余温把中心焖熟。','取出静置 3 分钟再切，挤柠檬汁。'],
    note:'拍松和静置是嫩的关键，煎完别马上切。'
  },
  {
    title:'蒜香黄油虾', minutes:15, baseServings:2, favorite:false,
    foods:['海鲜水产/虾'], methods:['煎炸'], tags:['快手','高蛋白'],
    ingredients:[{n:'大虾',q:300,u:'g',t:'main'},{n:'黄油',q:20,u:'g',t:'se'},{n:'蒜',q:4,u:'瓣',t:'se'},{n:'柠檬',q:0.5,u:'个',t:'se'},{n:'黑胡椒',q:null,u:'',t:'se'},{n:'盐',q:null,u:'',t:'se'}],
    steps:['虾去壳开背去虾线，用厨房纸吸干水分，撒盐和黑胡椒。','平底锅融化黄油，小火爆香蒜末至微金黄。','转中火下虾，两面各煎约 1 分钟至变色卷曲。','挤柠檬汁，翻匀后立刻关火装盘。'],
    note:'虾一定要擦干，否则会出水变成煮虾。'
  },
  {
    title:'奶油蘑菇意面', minutes:20, baseServings:2, favorite:false,
    foods:['米面主食/意面','蔬菜/蘑菇','蛋奶豆制品/淡奶油'], methods:['煮炖'], tags:['西式','一人食'],
    ingredients:[{n:'意面',q:180,u:'g',t:'main'},{n:'口蘑',q:150,u:'g',t:'main'},{n:'淡奶油',q:120,u:'ml',t:'main'},{n:'蒜',q:2,u:'瓣',t:'se'},{n:'帕玛森芝士',q:20,u:'g',t:'main'},{n:'橄榄油',q:1,u:'汤匙',t:'se'},{n:'盐',q:null,u:'',t:'se'}],
    steps:['烧一大锅水，加盐，按包装时间把意面煮到略偏硬，留半碗面汤。','口蘑切片，蒜切末；锅中橄榄油炒香蒜末，下蘑菇炒到出水收干。','倒淡奶油小火煮 2 分钟，加芝士碎和少许面汤调成浓稠酱汁。','意面下锅翻匀，盐和黑胡椒调味，收汁后盛盘。'],
    note:'面汤里的淀粉能让酱汁挂在面上，别倒掉。'
  },
  {
    title:'南瓜浓汤', minutes:25, baseServings:3, favorite:false,
    foods:['蔬菜/南瓜','蔬菜/洋葱','蛋奶豆制品/牛奶'], methods:['煮炖'], tags:['暖胃','素食'],
    ingredients:[{n:'南瓜',q:400,u:'g',t:'main'},{n:'洋葱',q:0.5,u:'个',t:'main'},{n:'牛奶',q:200,u:'ml',t:'main'},{n:'黄油',q:15,u:'g',t:'se'},{n:'盐',q:null,u:'',t:'se'},{n:'黑胡椒',q:null,u:'',t:'se'}],
    steps:['南瓜去皮切块，洋葱切丝。','锅中融化黄油，洋葱炒软后下南瓜翻炒 2 分钟。','加水没过食材，盖盖煮 15 分钟至南瓜软烂。','用手持料理棒打细，倒牛奶小火加热，盐和胡椒调味。'],
    note:'想要更顺滑可以过一遍筛；太稠就补一点热水。'
  },
  {
    title:'隔夜燕麦杯', minutes:5, baseServings:1, favorite:false,
    foods:['米面主食/燕麦','蛋奶豆制品/酸奶'], methods:['免开火'], tags:['备餐','早餐'],
    ingredients:[{n:'燕麦片',q:50,u:'g',t:'main'},{n:'牛奶',q:120,u:'ml',t:'main'},{n:'酸奶',q:80,u:'g',t:'main'},{n:'奇亚籽',q:1,u:'茶匙',t:'main'},{n:'蓝莓',q:30,u:'g',t:'main'},{n:'蜂蜜',q:1,u:'茶匙',t:'se'}],
    steps:['燕麦片、奇亚籽和牛奶在密封罐里搅匀。','冷藏静置一夜（至少 4 小时）。','吃之前铺上酸奶，放蓝莓，淋蜂蜜。'],
    note:'水果临吃再放，隔夜会出水影响口感。'
  }
];

var KEY = 'recipe-box-v1';
/* v12 好吃餐厅：默认标签词表与评分维度，用户可在「管理」里任意增减改名 */
var DEFAULT_PLACE_TAGS = ['日料','火锅','西餐','咖啡甜品','中式','烧烤','约会','朋友聚餐','一人食','安静','有包间','适合请客'];
var DEFAULT_PLACE_DIMS = ['口味','环境','服务','性价比'];
var PLACE_PH = ['🍽️','🍜','🍲','🍰','☕','🍻','🥢','🐟','🍕','🥗'];
var state, ui, toastTimer;
var CKEY = 'recipe-box-cloud-v1', CFN = 'recipe-box-data.json', GH_API = 'https://api.github.com';
var cloud, booted = false, cloudTimer = null, cloudBusy = false, cloudPending = null;
var SEASONING = ['盐','海盐','食用盐','白糖','糖','冰糖','红糖','蜂蜜','枫糖',
  '生抽','老抽','酱油','料酒','蚝油','醋','香醋','番茄酱','豆瓣酱','沙拉酱','黄豆酱',
  '黑胡椒','胡椒','白胡椒','五香粉','辣椒粉','花椒','八角','咖喱','鸡精','味精','盐焗鸡粉',
  '香油','芝麻油','食用油','橄榄油','黄油','猪油','辣椒油',
  '淀粉','生粉','面包糠','芝麻','白芝麻',
  '小葱','葱','葱花','香葱','大葱','姜','姜片','姜丝','蒜','蒜末','蒜蓉','蒜瓣',
  '香菜','干辣椒','小米辣','柠檬','柠檬汁'];
var MAIN_OVERRIDE = ['洋葱','面粉','奶粉','蒜苗','蒜薹','韭葱','葱头'];
var COUNT_UNITS = ['个','根','瓣','片','颗','只','块','条','袋','把','茶匙','汤匙','杯','包'];

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function fmt(n){
  if(n===null||n===undefined||n==='') return '';
  var v = Math.round(Number(n)*100)/100;
  return isFinite(v) ? String(v) : '';
}
function pad(n){ return n<10 ? '0'+n : ''+n; }
function fmtStamp(iso){
  if(!iso) return '';
  var d = new Date(iso);
  if(isNaN(d.getTime())) return '';
  return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
}
function dateKey(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function todayKey(){ return dateKey(new Date()); }
function fmtDay(key){ return Number(key.slice(5,7))+'月'+Number(key.slice(8,10))+'日'; }
function weekdayCN(key){
  var d = new Date(Number(key.slice(0,4)), Number(key.slice(5,7))-1, Number(key.slice(8,10)));
  return ['周日','周一','周二','周三','周四','周五','周六'][d.getDay()];
}
function shiftMonth(mk, delta){
  var d = new Date(Number(mk.slice(0,4)), Number(mk.slice(5,7))-1+delta, 1);
  return d.getFullYear()+'-'+pad(d.getMonth()+1);
}
function daysInMonth(y,m){ return new Date(y, m+1, 0).getDate(); }
function firstWeekday(y,m){ return (new Date(y,m,1).getDay()+6)%7; }

function calcFactor(h,w,age){
  var bmr = 10*Number(w) + 6.25*Number(h) - 5*Number(age) - 161;
  var tdee = bmr * 1.375;
  var f = Math.round((tdee/1900)*100)/100;
  return Math.min(1.2, Math.max(0.7, f));
}
function suggestFactor(){
  var p = state && state.profile ? state.profile : {height:163,weight:45};
  return calcFactor(Number(p.height)||163, Number(p.weight)||45, 30);
}
function profileFactor(){
  var f = state && state.profile ? Number(state.profile.factor) : 0.85;
  return (isFinite(f) && f>0) ? f : 0.85;
}
function guessSeasoning(n){
  n = String(n||'').trim();
  if(!n) return false;
  if(SEASONING.indexOf(n)>-1) return true;
  if(MAIN_OVERRIDE.indexOf(n)>-1) return false;
  return /(姜|蒜|葱花|香葱|小葱|大葱|香菜|八角|花椒|干辣椒|小米辣|胡椒|酱油|蚝油|料酒|香油|橄榄油|食用油|冰糖|蜂蜜|淀粉|生粉|面包糠|鸡精|味精|盐$|糖$|醋$|油$|酱$|粉$)/.test(n);
}
function ingType(ing){
  if(!ing) return 'main';
  if(ing.t==='se' || ing.t==='main') return ing.t;
  return guessSeasoning(ing.n || ing.name) ? 'se' : 'main';
}
function splitIngs(r){
  var main = [], se = [];
  (r.ingredients||[]).forEach(function(x,i){
    var o = { x:x, i:i };
    (ingType(x)==='se' ? se : main).push(o);
  });
  return {main:main, se:se};
}

/* ============ 营养标签知识库（v15，定性、不含任何数值） ============
   依据小红书「高营养食材」笔记的 6 类营养素，只做「有 / 无」的定性判断。
   keys 用于食材名包含匹配（已含常见别名）；不记录、不显示任何含量数值。 */
var NUTRIENT_GROUPS = [
  { key:'fiber', label:'膳食纤维', emoji:'🌾', tip:'燕麦、红薯、玉米、菌菇',
    keys:['燕麦','奇亚籽','红薯','地瓜','紫薯','玉米','苹果','梨','全麦','糙米','黑米','杂粮','藜麦','荞麦',
          '黄豆','黑豆','红豆','绿豆','毛豆','豌豆','西兰花','西蓝花','花椰菜','菜花','胡萝卜','南瓜',
          '香菇','口蘑','蘑菇','金针菇','木耳','秋葵','芹菜','海带','魔芋','牛油果','火龙果','蓝莓'] },
  { key:'vitd', label:'维生素D', emoji:'☀️', tip:'鸡蛋黄、三文鱼、香菇',
    keys:['鸡蛋','蛋黄','三文鱼','鲑鱼','沙丁鱼','秋刀鱼','鲭鱼','金枪鱼','香菇','干香菇','带鱼','鲈鱼','鳕鱼','巴沙鱼','鱼肝油'] },
  { key:'vitc', label:'维生素C', emoji:'🍊', tip:'彩椒、猕猴桃、草莓、番茄',
    keys:['橙','橘','柑橘','柚子','草莓','猕猴桃','奇异果','彩椒','甜椒','红椒','青椒','柿子椒','鲜枣','冬枣',
          '红枣','番茄','西红柿','西兰花','西蓝花','柠檬','生菜','油菜','芥蓝','苦瓜','小白菜','娃娃菜'] },
  { key:'calcium', label:'钙', emoji:'🦴', tip:'牛奶、豆腐、芝麻酱、深绿叶菜',
    keys:['牛奶','酸奶','奶酪','芝士','乳酪','豆腐','豆干','豆皮','豆浆','虾皮','芝麻酱','黑芝麻','芝麻',
          '西蓝花','西兰花','小油菜','油菜','芥蓝','荠菜','苋菜','小鱼干','紫菜','海带'] },
  { key:'protein', label:'蛋白质', emoji:'💪', tip:'鸡蛋、鸡胸肉、鱼虾、豆腐',
    keys:['鸡蛋','蛋白','蛋黄','鸡胸','鸡腿','鸡翅','鸡肉','牛肉','牛里脊','牛腩','猪里脊','排骨','瘦肉',
          '虾','鱼','三文鱼','豆腐','豆干','豆浆','牛奶','酸奶','芝士','奶酪'] },
  { key:'iron', label:'铁', emoji:'🩸', tip:'菠菜、猪肝、黑木耳、牛肉',
    keys:['菠菜','猪肝','鸭血','鸡血','猪血','动物肝','黑木耳','木耳','黄豆','黑豆','牛肉','牛里脊',
          '猪里脊','瘦肉','蛤蜊','花蛤','贝类','芝麻酱','黑芝麻','红豆','樱桃','桂圆'] }
];
function normFood(s){ return String(s==null?'':s).replace(/\s+/g,'').toLowerCase(); }
/* 食材名 -> 命中的营养标签 { key:[食材名,...] }。默认只传主料，调味料量小不计入。 */
function ingredientsNutrients(ings){
  var hits = {};
  (ings||[]).forEach(function(x){
    var raw = (x && typeof x==='object') ? (x.n||x.name) : x;
    var n = normFood(raw);
    if(!n) return;
    NUTRIENT_GROUPS.forEach(function(g){
      for(var i=0;i<g.keys.length;i++){
        if(n.indexOf(g.keys[i])>-1){
          if(!hits[g.key]) hits[g.key]=[];
          if(hits[g.key].indexOf(raw)<0) hits[g.key].push(raw);
          break;
        }
      }
    });
  });
  return hits;
}
function mainIngredients(r){ return splitIngs(r||{}).main.map(function(o){ return o.x; }); }
/* 场景1：一道菜的营养亮点标签 */
function recipeNutritionTags(r){
  var hits = ingredientsNutrients(mainIngredients(r));
  return NUTRIENT_GROUPS.filter(function(g){ return (hits[g.key]||[]).length; })
    .map(function(g){ return {key:g.key,label:g.label,emoji:g.emoji,foods:hits[g.key]}; });
}

/* ============ v17 营养知识库（每100g含量，带数值，每类 11-12 项） ============
   权威来源：
   - 蛋白质 / 钙：用户提供的两张图 + 《中国食物成分表》（第6版）补充（央视一套科普、百度健康医学科普）。
   - 维生素C：《中国食物成分表标准版》（第6版）/《中国营养科学全书》（第2版），南方医院营养科整理。
   - 膳食纤维：百度健康医学科普（浙江省肿瘤医院专家审阅）。
   - 铁：百度健康医学科普（北京大学人民医院专家审阅）。
   - 维生素D：百度健康医学科普 + 复禾健康（IU÷40 换算为 µg）。
   每项 food: {n:名称, e:emoji, v:每100g含量}。数值用于科普对比，不作为摄入建议。 */
var NUTRIENT_KB = [
  { key:'protein', label:'蛋白质', unit:'g', sub:'每100g食物含量 · 常见高蛋白食物',
    note:'肌肉、皮肤和免疫力的基础。鱼虾肉蛋奶豆都是优质来源；动植物搭配吃，氨基酸更互补。',
    src:'用户营养图 + 《中国食物成分表》第6版',
    foods:[
      {n:'纯牛奶', e:'🥛', v:3}, {n:'豆腐', e:'⬜', v:8}, {n:'燕麦', e:'🌾', v:10},
      {n:'鸡蛋', e:'🥚', v:13}, {n:'鸭肉(去皮)', e:'🦆', v:15.5}, {n:'豆腐干', e:'⬜', v:16},
      {n:'虾仁', e:'🍤', v:19}, {n:'牛肉', e:'🥩', v:20}, {n:'猪里脊', e:'🥓', v:20.2},
      {n:'鸡胸肉', e:'🍗', v:24}, {n:'黄豆(干)', e:'🫘', v:35}, {n:'黑豆(干)', e:'🫘', v:36}
    ]},
  { key:'calcium', label:'钙', unit:'mg', sub:'每100g食物含量 · 常见高钙食物',
    note:'骨骼牙齿的主要成分。奶类、豆制品和绿叶菜是日常主力；虾皮芝麻酱含量高但盐/油也多，别靠它们猛补。',
    src:'用户营养图 + 《中国食物成分表》第6版（央视一套科普）',
    foods:[
      {n:'豆浆', e:'🥤', v:5}, {n:'西蓝花', e:'🥦', v:47}, {n:'牛奶', e:'🥛', v:120},
      {n:'豆腐', e:'⬜', v:138}, {n:'油菜薹', e:'🥬', v:156}, {n:'紫菜', e:'🌿', v:264},
      {n:'荠菜', e:'🌿', v:294}, {n:'海带(干)', e:'🌊', v:348}, {n:'芝麻', e:'🌰', v:780},
      {n:'奶酪', e:'🧀', v:799}, {n:'虾皮', e:'🦐', v:991}, {n:'芝麻酱', e:'🥜', v:1057}
    ]},
  { key:'vitc', label:'维生素C', unit:'mg', sub:'每100g食物含量 · 常见果蔬',
    note:'帮助抗氧化、促进铁吸收。新鲜果蔬是主力，怕久煮，能生吃的别煮太久。',
    src:'《中国食物成分表》第6版 /《中国营养科学全书》第2版（南方医院营养科整理）',
    foods:[
      {n:'苹果', e:'🍎', v:4}, {n:'番茄', e:'🍅', v:14}, {n:'柠檬', e:'🍋', v:22},
      {n:'柚子', e:'🍊', v:23}, {n:'橙子', e:'🍊', v:33}, {n:'木瓜', e:'🍈', v:43},
      {n:'草莓', e:'🍓', v:47}, {n:'西蓝花', e:'🥦', v:51}, {n:'苦瓜', e:'🥒', v:56},
      {n:'猕猴桃', e:'🥝', v:62}, {n:'彩椒', e:'🫑', v:128}, {n:'鲜枣', e:'🌰', v:243}
    ]},
  { key:'fiber', label:'膳食纤维', unit:'g', sub:'每100g食物含量 · 全谷物豆类蔬果',
    note:'促进肠道蠕动、增加饱腹感。全谷物、豆类和蔬果里较多；突然加太多会胀气，记得多喝水。',
    src:'百度健康医学科普（浙江省肿瘤医院专家审阅）',
    foods:[
      {n:'米饭', e:'🍚', v:0.3}, {n:'番茄', e:'🍅', v:1.2}, {n:'土豆(带皮)', e:'🥔', v:2.2},
      {n:'苹果', e:'🍎', v:2.4}, {n:'西蓝花', e:'🥦', v:3.0}, {n:'红薯(带皮)', e:'🍠', v:3.0},
      {n:'毛豆', e:'🫛', v:4.5}, {n:'豌豆', e:'🫛', v:5.0}, {n:'牛油果', e:'🥑', v:6.7},
      {n:'燕麦', e:'🌾', v:10.6}, {n:'杏仁', e:'🌰', v:12.5}, {n:'奇亚籽', e:'🌱', v:34.4}
    ]},
  { key:'iron', label:'铁', unit:'mg', sub:'每100g食物含量 · 常见高铁食物',
    note:'造血必需。红肉、动物血和肝脏里的血红素铁更好吸收；植物铁可搭配维C提升吸收率。',
    src:'百度健康医学科普（北京大学人民医院专家审阅）',
    foods:[
      {n:'牛肉', e:'🥩', v:2.6}, {n:'菠菜', e:'🥬', v:2.9}, {n:'羊肉', e:'🍖', v:3.1},
      {n:'苋菜', e:'🥬', v:5.4}, {n:'扁豆', e:'🫘', v:6.2}, {n:'牡蛎', e:'🦪', v:6.8},
      {n:'黄豆', e:'🫘', v:8.2}, {n:'南瓜籽', e:'🎃', v:8.8}, {n:'芝麻', e:'🌰', v:14.6},
      {n:'猪肝', e:'🫀', v:22.6}, {n:'蛤蜊', e:'🐚', v:28}, {n:'黑木耳(干)', e:'🍄', v:97.4}
    ]},
  { key:'vitd', label:'维生素D', unit:'µg', sub:'每100g食物含量 · 天然食物较少',
    note:'帮助钙吸收，晒太阳也能合成。天然食物里含量普遍不高，多脂鱼和菌菇相对突出（数值由 IU 换算）。',
    src:'百度健康医学科普 + 复禾健康（IU÷40 换算）',
    foods:[
      {n:'牛奶', e:'🥛', v:0.1}, {n:'虾', e:'🦐', v:0.5}, {n:'猪肝', e:'🫀', v:1.25},
      {n:'鸡蛋', e:'🥚', v:2.0}, {n:'牡蛎', e:'🦪', v:2.0}, {n:'沙丁鱼', e:'🐠', v:5.0},
      {n:'鲭鱼', e:'🐟', v:6.0}, {n:'金枪鱼', e:'🐟', v:7.0}, {n:'干香菇', e:'🍄', v:8.7},
      {n:'三文鱼', e:'🍣', v:13.2}, {n:'日晒香菇', e:'🍄', v:20}
    ]}
];
function scaleForIng(ing, ratio, f){
  if(ing.q===null||ing.q===undefined||ing.q==='') return null;
  var k = ingType(ing)==='se' ? (0.9 + 0.1*f) : f;
  var v = Number(ing.q) * ratio * k;
  var u = ing.u||'';
  if(COUNT_UNITS.indexOf(u)>-1) return Math.max(0.5, Math.round(v*2)/2);
  if(v>=10) return Math.round(v);
  return Math.round(v*100)/100;
}
function qtyText(ing, ratio, f){
  if(ing.q===null||ing.q===undefined||ing.q==='') return '适量';
  var v = fmt(scaleForIng(ing, ratio, f));
  return (v? v+' ' : '') + (ing.u||'');
}
function friendlySum(a,b){ var s = Number(a)+b; return s>=10 ? Math.round(s) : Math.round(s*100)/100; }

function catState(){
  if(!state.categories || !Array.isArray(state.categories.foods) || !Array.isArray(state.categories.methods)){
    state.categories = { foods: clone(DEFAULT_FOOD_TREE), methods: clone(DEFAULT_METHODS) };
  }
  return state.categories;
}
function foodTree(){ return catState().foods; }
function methods(){ return catState().methods; }
function foodGroup(name){
  var t = foodTree();
  for(var i=0;i<t.length;i++) if(t[i].name===name) return t[i];
  return t[t.length-1] || {name:'其他', emoji:'🍽️', bg:'#E7E1D8', items:[]};
}
function iconFor(r){ return foodGroup(((r.foods||[])[0]||'').split('/')[0]); }
function leaf(f){ var p = String(f||'').split('/'); return p[p.length-1]; }
function methodText(r){ return (r.methods||[]).join(' / ') || '未分类'; }

function defaultState(){
  var now = Date.now();
  return {
    recipes: SAMPLES.map(function(r,i){ var c = clone(r); c.id = 'sample-'+i; c.createdAt = now-i*1000; return c; }),
    checklist: [],
    log: {},
    profile: {height:163, weight:45, factor:calcFactor(163,45,30)},
    categories: { foods: clone(DEFAULT_FOOD_TREE), methods: clone(DEFAULT_METHODS) },
    places: [],
    placeConfig: { tags: clone(DEFAULT_PLACE_TAGS), dims: clone(DEFAULT_PLACE_DIMS) }
  };
}
function load(){
  try{
    var raw = localStorage.getItem(KEY);
    if(raw){
      var d = JSON.parse(raw);
      if(d && Array.isArray(d.recipes)){ d.checklist = Array.isArray(d.checklist)?d.checklist:[]; return d; }
    }
  }catch(e){}
  return defaultState();
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); markDirty(); return true; }catch(e){ toast('保存失败，浏览器存储可能已满'); return false; } }
function recipeById(id){ for(var i=0;i<state.recipes.length;i++) if(state.recipes[i].id===id) return state.recipes[i]; return null; }
function toast(msg, opt){
  var t = document.getElementById('toast');
  t.className = 'toast';
  t.textContent = '';
  t.appendChild(document.createTextNode(msg));
  if(opt && opt.label){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'toast-act';
    b.setAttribute('data-act', opt.act || 'cook-undo');
    if(opt.id) b.setAttribute('data-id', opt.id);
    b.textContent = opt.label;
    t.appendChild(b);
    t.classList.add('with-act');
  }
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('show'); }, (opt && opt.label) ? 5000 : 2000);
}

function inferFoods(r){
  var out = [];
  (r.ingredients||[]).forEach(function(ing){
    var n = ing.n || '';
    if(!n || ingType(ing)==='se') return;
    foodTree().forEach(function(g){
      g.items.forEach(function(it){
        if((n.indexOf(it)>-1 || it.indexOf(n)>-1) && out.length < 4){
          var v = g.name+'/'+it;
          if(out.indexOf(v)<0) out.push(v);
        }
      });
    });
  });
  return out;
}
/* 关键词表：[默认做法名, 文本命中词]。推断时按「用户当前做法列表」动态匹配，
   所以把「炒」改名成「快炒」后，导入的炒菜仍会归到「快炒」，不会写回已删掉的旧名。*/
var METHOD_KEYS = [
  ['电饭锅','电饭锅'],['空气炸锅','空气炸锅'],['微波炉','微波'],
  ['煎炸','炸'],['煎炸','煎'],['蒸','蒸'],['烤','烤'],['凉拌','凉拌'],
  ['煮炖','炖'],['煮炖','煮'],['炒','炒']
];
function inferMethods(r){
  var text = [r.title, (r.steps||[]).join(' '), r.note||'', (r.tags||[]).join(' ')].join(' ');
  var valid = methods(), out = [];
  METHOD_KEYS.forEach(function(p){
    var want = p[0], kw = p[1];
    if(text.indexOf(kw)<0 || out.length>=3) return;
    var hit = '';
    for(var i=0;i<valid.length;i++){
      var m = valid[i];
      if(m===want){ hit=m; break; }
      if(!hit && (m.indexOf(kw)>-1 || m.indexOf(want)>-1)) hit=m;
    }
    if(hit && out.indexOf(hit)<0) out.push(hit);
  });
  return out;
}
function migrate(){
  var changed = false;
  if(!state.categories || !Array.isArray(state.categories.foods) || !Array.isArray(state.categories.methods)){
    state.categories = { foods: clone(DEFAULT_FOOD_TREE), methods: clone(DEFAULT_METHODS) };
    changed = true;
  }
  var byTitle = {};
  SAMPLES.forEach(function(s){ byTitle[s.title] = s; });
  var oldSample = state.recipes.some(function(r){ return /^sample-\d+$/.test(r.id) && !Array.isArray(r.foods); });
  if(oldSample){
    var favs = {};
    state.recipes.forEach(function(r){ if(/^sample-\d+$/.test(r.id) && r.favorite) favs[r.title] = 1; });
    var mine = state.recipes.filter(function(r){ return !/^sample-\d+$/.test(r.id); });
    var now = Date.now();
    var fresh = SAMPLES.map(function(s,i){ var c = clone(s); c.id='sample-'+i; c.createdAt=now-i*1000; c.favorite=!!favs[s.title]; return c; });
    state.recipes = mine.concat(fresh);
    changed = true;
  }
  state.recipes.forEach(function(r){
    if(typeof r.cookCount!=='number'){ r.cookCount=0; changed=true; }
    if(typeof r.lastCooked!=='string'){ r.lastCooked=''; changed=true; }
    if(!Array.isArray(r.cookLog)){
      var legacy=[], ln=Number(r.cookCount)||0, ld=String(r.lastCooked||'');
      for(var li=0; li<ln; li++) legacy.push({d:ld, src:'legacy'});
      r.cookLog = legacy; changed = true;
    }
    if(!Array.isArray(r.images)){ r.images=[]; changed=true; }
    if(typeof r.sourceUrl!=='string'){ r.sourceUrl=''; changed=true; }
    if(typeof r.sourcePlatform!=='string'){ r.sourcePlatform=''; changed=true; }
    if(typeof r.sourceText!=='string'){ r.sourceText=''; changed=true; }
    if(!Array.isArray(r.foods)){ r.foods = byTitle[r.title] ? clone(byTitle[r.title].foods) : inferFoods(r); changed = true; }
    if(!Array.isArray(r.methods)){ r.methods = byTitle[r.title] ? clone(byTitle[r.title].methods) : inferMethods(r); changed = true; }
    var ref = byTitle[r.title];
    (r.ingredients||[]).forEach(function(ing){
      if(ing.t==='se' || ing.t==='main') return;
      var same = ref ? (ref.ingredients||[]).filter(function(x){ return x.n===ing.n; })[0] : null;
      ing.t = same ? same.t : ingType(ing);
      changed = true;
    });
  });
  state.checklist.forEach(function(x){
    if(x.t!=='se' && x.t!=='main'){ x.t = ingType(x); changed = true; }
  });
  if(!state.log || typeof state.log!=='object'){ state.log = {}; changed = true; }
  if(!state.profile || typeof state.profile!=='object'){
    state.profile = {height:163, weight:45, factor:calcFactor(163,45,30)};
    changed = true;
  }
  if(state.profile.factor===undefined){ state.profile.factor = suggestFactor(); changed = true; }
  if(!Array.isArray(state.places)){ state.places = []; changed = true; }
  if(!state.placeConfig || typeof state.placeConfig!=='object' ||
     !Array.isArray(state.placeConfig.tags) || !Array.isArray(state.placeConfig.dims)){
    state.placeConfig = { tags: clone(DEFAULT_PLACE_TAGS), dims: clone(DEFAULT_PLACE_DIMS) };
    changed = true;
  }
  state.places.forEach(function(p){
    if(!Array.isArray(p.tags)){ p.tags=[]; changed=true; }
    if(!p.scores || typeof p.scores!=='object'){ p.scores={}; changed=true; }
    if(!Array.isArray(p.images)){ p.images=[]; changed=true; }
    if(typeof p.review!=='string'){ p.review=''; changed=true; }
    if(p.status!=='want' && p.status!=='been'){ p.status='been'; changed=true; }
    if(p.coverMode!=='first' && p.coverMode!=='pick' && p.coverMode!=='random'){ p.coverMode='first'; changed=true; }
    if(typeof p.coverId!=='string'){ p.coverId=''; changed=true; }
    if(typeof p.ph!=='string'){ p.ph='🍽️'; changed=true; }
    (p.images||[]).forEach(function(im){ if(!im.id){ im.id=uid(); changed=true; } });
  });
  if(changed) save();
}

ui = { tab:'recipes', q:'', food:'全部', sub:'全部', method:'全部', onlyFav:false, detail:null,
       calMonth:todayKey().slice(0,7), calDay:todayKey(), listMode:'merged',
       catTab:'food', imp:null, lb:null, cookHist:false,
       recSub:'cal', placeQ:'', placeStatus:'all', placeTag:'全部', placeSort:'score',
       placeForm:null, placeDetail:null, pcfgTab:'tag', placeRandom:{}, share:null,
       nutriWeek:todayKey(), kbKey:'protein' };
cloud = loadCloud();
state = load();
migrate();
catState();
save();

function topbarHTML(){
  var h1, sub;
  if(ui.tab==='recipes'){
    h1='食谱盒子'; sub='共 '+state.recipes.length+' 道菜 · 按食材和做法找';
  }else if(ui.tab==='list'){
    var total, left;
    if(ui.listMode==='merged'){
      var mg = mergedList();
      total = mg.length; left = mg.filter(function(g){ return !g.done; }).length;
    }else{
      total = state.checklist.length; left = state.checklist.filter(function(x){return !x.done;}).length;
    }
    h1='购物清单'; sub= total ? (left+' 样待买 · 共 '+total+' 样') : '还没有要买的东西';
  }else if(ui.tab==='record'){
    if(ui.recSub==='places'){
      h1='好吃餐厅'; sub='共 '+state.places.length+' 家 · 按评分和标签挑';
    }else{
      h1='饮食记录'; sub='';
    }
  }else if(ui.tab==='knowledge'){
    h1='营养知识'; sub='常见营养素的每100g含量速查';
  }else{
    h1='我的'; sub='份量标准与数据备份';
  }
  return '<div class="row"><div><h1>'+h1+'</h1><div class="sub">'+sub+'</div></div></div>';
}

function matchQuery(r,q){
  if(!q) return true;
  var hay = [r.title, (r.tags||[]).join(' '), (r.foods||[]).join(' '), (r.methods||[]).join(' '),
             (r.note||''), (r.ingredients||[]).map(function(i){return i.n;}).join(' ')].join(' ').toLowerCase();
  return hay.indexOf(q.toLowerCase())>-1;
}
function foodMatches(r){
  if(ui.food==='全部') return true;
  return (r.foods||[]).some(function(f){
    if(ui.sub!=='全部') return f === ui.food+'/'+ui.sub;
    return f === ui.food || f.indexOf(ui.food+'/')===0;
  });
}
function filteredRecipes(){
  return state.recipes.filter(function(r){
    if(ui.onlyFav && !r.favorite) return false;
    if(!foodMatches(r)) return false;
    if(ui.method!=='全部' && (r.methods||[]).indexOf(ui.method)<0) return false;
    return matchQuery(r, ui.q);
  }).sort(function(a,b){ return (b.createdAt||0)-(a.createdAt||0); });
}
function tagLabels(r){ return (r.methods||[]).concat((r.foods||[]).map(leaf)).concat(r.tags||[]); }
function cardHTML(r){
  var c = iconFor(r);
  var tags = tagLabels(r).slice(0,3).map(function(t){ return '<span class="tag">'+esc(t)+'</span>'; }).join('');
  if(r.cookCount>0) tags += '<span class="tag cooked">做过 '+Number(r.cookCount)+' 次</span>';
  return '<article class="card" data-act="open" data-id="'+esc(r.id)+'">'+
    '<div class="thumb" style="background:'+c.bg+'">'+c.emoji+'</div>'+
    '<div class="card-body"><h3>'+esc(r.title)+'</h3>'+
    '<div class="meta">'+esc(r.minutes||'—')+' 分钟 · '+esc(r.baseServings||2)+' 人份 · '+esc(methodText(r))+'</div>'+
    '<div class="tags">'+tags+'</div></div>'+
    '<button class="fav '+(r.favorite?'on':'')+'" data-act="fav" data-id="'+esc(r.id)+'" aria-label="收藏">'+(r.favorite?'♥':'♡')+'</button>'+
  '</article>';
}
function recipeListHTML(){
  var arr = filteredRecipes();
  if(!arr.length){
    var txt = state.recipes.length ? '换个食材、做法或关键词试试' : '还没有食谱，先加一道想做的菜吧';
    return '<div class="empty"><div class="big">🍽️</div><h3>这里空空的</h3><p>'+txt+'</p>'+
      (state.recipes.length?'':'<button type="button" data-act="add">新增食谱</button>')+'</div>';
  }
  return arr.map(cardHTML).join('');
}
function usedSubs(big){
  var seen = {}, out = [];
  state.recipes.forEach(function(r){
    (r.foods||[]).forEach(function(f){
      var p = f.split('/');
      if(p[0]===big && p[1] && !seen[p[1]]){ seen[p[1]]=1; out.push(p[1]); }
    });
  });
  return out;
}
function chipRow(list, current, act, key){
  return list.map(function(v){
    return '<button type="button" class="chip '+(current===v?'on':'')+'" data-act="'+act+'" '+key+'="'+esc(v)+'">'+esc(v)+'</button>';
  }).join('');
}
function recipesHTML(){
  var f1 = ['全部'].concat(foodTree().map(function(g){return g.name;}));
  var f2 = ui.food==='全部' ? [] : ['全部细分'].concat(usedSubs(ui.food));
  var m1 = ['全部'].concat(methods());
  var html = '<div class="import-entry two">'+
      '<button type="button" class="imp-single" data-act="import-open"><b>＋ 导入单篇菜谱</b><small>小红书 / B站 分享文字</small></button>'+
      '<button type="button" class="imp-batch" data-act="batch-open"><b>▦ 批量导入</b><small>候选 JSON · 选题雷达</small></button>'+
    '</div>'+
    '<div class="imp-tip">每周「食谱选题雷达」生成的 <code>菜谱候选/日期.json</code>，点「批量导入」整段贴进来，一次收好。</div>';
  html += '<input class="search" id="search" type="search" placeholder="搜菜名、食材或分类" value="'+esc(ui.q)+'" autocomplete="off">';
  html += '<div class="filter-block"><div class="filter-label">按食材</div>'+
          '<div class="chips compact">'+chipRow(f1, ui.food, 'food1', 'data-v')+'</div>';
  if(f2.length>1){
    html += '<div class="chips compact sub">'+f2.map(function(vv){
      var cur = ui.sub==='全部' ? '全部细分' : ui.sub;
      return '<button type="button" class="chip '+(cur===vv?'on':'')+'" data-act="food2" data-v="'+esc(vv)+'">'+esc(vv)+'</button>';
    }).join('')+'</div>';
  }
  html += '</div>';
  html += '<div class="filter-block"><div class="filter-label">按制作方式</div>'+
          '<div class="chips compact">'+chipRow(m1, ui.method, 'method', 'data-v')+
          '<button type="button" class="chip '+(ui.onlyFav?'on':'')+'" data-act="favchip">♥ 收藏</button></div></div>';
  html += '<div class="count" id="cnt"></div><div id="recipeList">'+recipeListHTML()+'</div>';
  return html;
}
function updateRecipeList(){
  var box = document.getElementById('recipeList');
  if(box) box.innerHTML = recipeListHTML();
  var cnt = document.getElementById('cnt');
  if(cnt) cnt.textContent = '找到 '+filteredRecipes().length+' 道菜';
}
function itemKey(x){ return x.name+'|'+(x.u||''); }
function mergedList(){
  var map = {}, order = [];
  state.checklist.forEach(function(x){
    var k = itemKey(x);
    if(!map[k]){
      map[k] = {key:k, name:x.name, u:x.u||'', q:null, t:ingType(x),
                sources:[], total:0, doneCount:0};
      order.push(k);
    }
    var g = map[k];
    g.total++;
    if(g.t==='se' && ingType(x)!=='se') g.t='main';
    if(x.done) g.doneCount++;
    var s = x.recipeTitle||'手动添加';
    if(g.sources.indexOf(s)<0) g.sources.push(s);
    if(x.q!==null && x.q!==undefined && x.q!==''){
      var q = Number(x.q);
      if(isFinite(q)) g.q = g.q===null ? q : friendlySum(g.q, q);
    }
  });
  return order.map(function(k){
    var g = map[k];
    g.done = g.doneCount===g.total;
    return g;
  });
}
function listRowHTML(x){
  var qt = x.q===null||x.q===undefined||x.q==='' ? '' : fmt(x.q)+' '+(x.u||'');
  return '<div class="check-row '+(x.done?'done':'')+'">'+
    '<button type="button" class="check-box" data-act="list-toggle" data-id="'+esc(x.id)+'">✓</button>'+
    '<button type="button" class="check-main" style="text-align:left" data-act="list-toggle" data-id="'+esc(x.id)+'">'+esc(x.name)+'</button>'+
    '<span class="check-side">'+esc(qt)+'</span>'+
    '<button type="button" class="del" data-act="list-del" data-id="'+esc(x.id)+'" aria-label="删除">×</button>'+
  '</div>';
}
function byRecipeHTML(){
  var groups = {}, order = [];
  state.checklist.forEach(function(x){
    var g = x.recipeTitle||'手动添加';
    if(!groups[g]){ groups[g]=[]; order.push(g); }
    groups[g].push(x);
  });
  return order.map(function(g){
    var mains = groups[g].filter(function(x){ return ingType(x)!=='se'; });
    var seas = groups[g].filter(function(x){ return ingType(x)==='se'; });
    var inner = mains.map(listRowHTML).join('');
    if(seas.length) inner += '<div class="group-sub">调味料 · 家里常备的可以跳过</div>' + seas.map(listRowHTML).join('');
    return '<div class="group-h">'+esc(g)+'</div><div class="panel">'+inner+'</div>';
  }).join('');
}
function mergedRowHTML(g){
  var hasQty = g.q!==null;
  var qt = hasQty ? fmt(g.q)+' '+(g.u||'') : '适量';
  var src = g.sources.length>1 ? '来自 '+g.sources.length+' 处 · '+g.sources.join(' / ') : '来自 '+g.sources[0];
  return '<div class="check-row merge-row '+(g.done?'done':'')+'">'+
    '<button type="button" class="check-box" data-act="list-toggle-group" data-v="'+esc(g.key)+'">✓</button>'+
    '<button type="button" class="check-main" data-act="list-toggle-group" data-v="'+esc(g.key)+'">'+
      '<b>'+esc(g.name)+'</b><small>'+esc(src)+'</small></button>'+
    '<span class="check-side'+(hasQty?'':' approx')+'">'+esc(qt)+'</span>'+
    '<button type="button" class="del" data-act="list-del-group" data-v="'+esc(g.key)+'" aria-label="删除">×</button>'+
  '</div>';
}
function mergedViewHTML(){
  var all = mergedList();
  var mains = all.filter(function(g){ return g.t!=='se'; });
  var seas = all.filter(function(g){ return g.t==='se'; });
  var inner = mains.map(mergedRowHTML).join('');
  if(seas.length) inner += '<div class="group-sub">调味料 · 家里常备的可以跳过</div>' + seas.map(mergedRowHTML).join('');
  var merged = all.length < state.checklist.length;
  return '<div class="group-h">共 '+all.length+' 样'+(merged ? ' · 同名已合并' : '')+'</div>'+
    '<div class="panel">'+inner+'</div>';
}
function listHTML(){
  var add = '<div class="field-row" style="margin-bottom:10px">'+
    '<input class="field" id="newItem" placeholder="还想买点什么？" autocomplete="off">'+
    '<button type="button" class="btn primary" style="flex:0 0 70px" data-act="list-add">添加</button></div>';
  var mode = '<div class="list-mode">'+
    '<button type="button" data-act="list-mode" data-v="merged" class="'+(ui.listMode==='merged'?'on':'')+'">按食材合并</button>'+
    '<button type="button" data-act="list-mode" data-v="recipe" class="'+(ui.listMode==='recipe'?'on':'')+'">按菜谱查看</button></div>';
  if(!state.checklist.length){
    return add + mode + '<div class="empty"><div class="big">🧺</div><h3>清单是空的</h3><p>在食谱详情点「加入购物清单」，<br>或在「记录」里选菜，食材会自动进来。</p>'+
      '<button type="button" data-act="tab" data-tab="recipes">去挑一道菜</button></div>';
  }
  var hint = '';
  var body = ui.listMode==='merged' ? mergedViewHTML() : byRecipeHTML();
  var total, left;
  if(ui.listMode==='merged'){
    var mg = mergedList();
    total = mg.length; left = mg.filter(function(g){ return !g.done; }).length;
  }else{
    total = state.checklist.length; left = state.checklist.filter(function(x){return !x.done;}).length;
  }
  var doneRaw = state.checklist.filter(function(x){ return x.done; }).length;
  return add + mode + hint + body +
    '<div class="list-actions"><button type="button" class="btn" data-act="clear-done">清除已买 ('+doneRaw+')</button>'+
    '<button type="button" class="btn ghost-danger" data-act="clear-all">清空清单</button></div>';
}

function logDay(date){ return state.log[date] || {recipes:[], notes:[]}; }
function ensureLog(date){
  if(!state.log[date]) state.log[date] = {recipes:[], notes:[]};
  if(!Array.isArray(state.log[date].recipes)) state.log[date].recipes = [];
  if(!Array.isArray(state.log[date].notes)) state.log[date].notes = [];
  return state.log[date];
}
function calendarHTML(){
  var mk = ui.calMonth;
  var y = Number(mk.slice(0,4)), m = Number(mk.slice(5,7))-1;
  var first = firstWeekday(y,m), total = daysInMonth(y,m);
  var cells = Math.ceil((first+total)/7)*7;
  var today = todayKey();
  var html = '<div class="cal-head"><button type="button" data-act="cal-prev" aria-label="上个月">‹</button>'+
    '<b>'+y+' 年 '+(m+1)+' 月</b><button type="button" data-act="cal-next" aria-label="下个月">›</button>'+
    '<button type="button" class="today" data-act="cal-today">今天</button></div>';
  html += '<div class="cal-week">'+['一','二','三','四','五','六','日'].map(function(w){ return '<span>'+w+'</span>'; }).join('')+'</div>';
  html += '<div class="cal-grid">';
  for(var i=0;i<cells;i++){
    var dn = i-first+1;
    if(dn<1 || dn>total){ html += '<div class="cal-cell blank"></div>'; continue; }
    var key = y+'-'+pad(m+1)+'-'+pad(dn);
    var day = state.log[key];
    var hasR = day && (day.recipes||[]).length;
    var hasN = day && (day.notes||[]).length;
    html += '<button type="button" class="cal-cell'+(key===ui.calDay?' on':'')+(key===today?' is-today':'')+'" data-act="cal-day" data-v="'+key+'">'+
      '<span class="dn">'+dn+'</span><span class="marks">'+(hasR?'<i class="dot"></i>':'')+(hasN?'<i class="bar"></i>':'')+'</span></button>';
  }
  html += '</div>';
  html += '<div class="cal-legend"><span><i class="dot"></i>选了菜谱</span>'+
          '<span><i class="bar"></i>有随手记</span><span class="tip">点日期查看 / 补记</span></div>';
  return html;
}
function dayDetailHTML(){
  var date = ui.calDay;
  var day = logDay(date);
  var html = '<div class="section-title">'+esc(fmtDay(date)+' · '+weekdayCN(date))+'</div>';
  if(!(day.recipes||[]).length && !(day.notes||[]).length){
    html += '<div class="empty slim"><div class="big">📅</div><p>这天还没有记录<br>下面可以从食谱库选菜，或直接写点什么</p></div>';
  }
  if((day.recipes||[]).length){
    html += '<div class="panel">'+day.recipes.map(function(it){
      var r = recipeById(it.recipeId);
      return '<div class="log-row">'+
        '<div class="log-main"><b>'+esc(r?r.title:it.title)+'</b>'+(r?'':'<small>菜谱已删除</small>')+
        '<div class="log-sub">'+esc(r?methodText(r):'')+'</div></div>'+
        '<div class="stepper tiny"><button type="button" data-act="log-serv-minus" data-v="'+esc(it.key)+'">−</button>'+
        '<span>'+it.servings+' 人份</span><button type="button" data-act="log-serv-plus" data-v="'+esc(it.key)+'">+</button></div>'+
        '<button type="button" class="del" data-act="log-recipe-del" data-v="'+esc(it.key)+'" aria-label="移除">×</button>'+
      '</div>';
    }).join('')+'</div>';
  }
  html += '<button type="button" class="btn primary" style="width:100%;margin-top:12px" data-act="cal-add-recipe">+ 从食谱库选菜</button>';
  if((day.notes||[]).length){
    html += '<div class="section-title">随手记</div><div class="panel">'+day.notes.map(function(n){
      return '<div class="check-row"><span class="check-main">'+esc(n.text)+'</span>'+
        '<button type="button" class="del" data-act="log-note-del" data-v="'+esc(n.id)+'" aria-label="删除">×</button></div>';
    }).join('')+'</div>';
  }
  html += '<div class="field-row" style="margin-top:12px"><input class="field" id="logNote" placeholder="随手记：还吃了什么" autocomplete="off">'+
    '<button type="button" class="btn primary" style="flex:0 0 70px" data-act="log-note-add">记下</button></div>';
  html += '<div class="hint">选中的菜谱会按当前人份，把食材和调味料自动同步进购物清单；改人份或移除时清单也会跟着更新。</div>';
  return html;
}
function recordHTML(){
  var seg = '<div class="rec-sub">'+
    '<button type="button" data-act="rec-sub" data-v="cal" class="'+(ui.recSub==='cal'?'on':'')+'">饮食日历</button>'+
    '<button type="button" data-act="rec-sub" data-v="nutrition" class="'+(ui.recSub==='nutrition'?'on':'')+'">营养覆盖</button>'+
    '<button type="button" data-act="rec-sub" data-v="places" class="'+(ui.recSub==='places'?'on':'')+'">好吃餐厅 <b>'+state.places.length+'</b></button>'+
  '</div>';
  return seg + (ui.recSub==='places' ? placesHTML() : ui.recSub==='nutrition' ? nutritionHTML() : calendarHTML() + dayDetailHTML());
}
/* ================= 场景3：每周营养覆盖（v15） ================= */
function weekKeys(anchor){
  var a = anchor || todayKey();
  var d = new Date(Number(a.slice(0,4)), Number(a.slice(5,7))-1, Number(a.slice(8,10)));
  var wd = d.getDay(), diff = (wd===0 ? -6 : 1-wd); /* 以周一为一周起点 */
  var mon = new Date(d.getFullYear(), d.getMonth(), d.getDate()+diff);
  var arr = [];
  for(var i=0;i<7;i++){
    var x = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate()+i);
    arr.push(dateKey(x));
  }
  return arr;
}
function shiftWeek(anchor, delta){
  var a = anchor || todayKey();
  var d = new Date(Number(a.slice(0,4)), Number(a.slice(5,7))-1, Number(a.slice(8,10)) + delta*7);
  return dateKey(d);
}
function weeklyCoverage(){
  var keys = weekKeys(ui.nutriWeek);
  var hits = {}, loggedDays = 0, dishCount = 0;
  keys.forEach(function(k){
    var day = state.log[k];
    if(day && ((day.recipes||[]).length || (day.notes||[]).length)) loggedDays++;
    ((day && day.recipes) || []).forEach(function(it){
      dishCount++;
      var r = recipeById(it.recipeId);
      if(!r) return; /* 菜谱已删除的条目不计入 */
      var h = ingredientsNutrients(mainIngredients(r));
      Object.keys(h).forEach(function(key){ hits[key] = (hits[key]||[]).concat(h[key]); });
    });
  });
  Object.keys(hits).forEach(function(key){
    hits[key] = hits[key].filter(function(v,i,a){ return a.indexOf(v)===i; });
  });
  return { keys:keys, hits:hits, loggedDays:loggedDays, dishCount:dishCount };
}
function nutritionHTML(){
  var cov = weeklyCoverage();
  var first = cov.keys[0], last = cov.keys[6];
  var isThis = first === weekKeys(todayKey())[0];
  var head = '<div class="nutri-week">'+
    '<button type="button" data-act="nutri-week" data-v="-1" aria-label="上一周">‹</button>'+
    '<div class="nw-label"><b>'+fmtDay(first)+' — '+fmtDay(last)+'</b>'+
      '<small>'+(isThis ? '本周' : (cov.loggedDays+' 天有记录 · '+cov.dishCount+' 道菜'))+'</small></div>'+
    '<button type="button" data-act="nutri-week" data-v="1" aria-label="下一周">›</button>'+
    (isThis ? '' : '<button type="button" class="nw-today" data-act="nutri-week" data-v="0">回到本周</button>')+
  '</div>';
  var covered = NUTRIENT_GROUPS.filter(function(g){ return (cov.hits[g.key]||[]).length; }).length;
  var stats = '<div class="nutri-sum">这一周记录了 '+cov.dishCount+' 道菜 · 覆盖 '+covered+' / '+NUTRIENT_GROUPS.length+' 类营养</div>';
  var tip = '<div class="hint">统计口径：只按「饮食日历」里这一周选过的菜谱主料做定性判断，不计算摄入量，也不代表营养是否充足；随手记不计入。</div>';
  if(!cov.dishCount){
    return head + '<div class="empty slim"><div class="big">🥗</div><p>这一周还没有记录菜谱<br>去「饮食日历」选几道菜，就能看到营养覆盖</p>'+
      '<button type="button" data-act="rec-sub" data-v="cal">去饮食日历</button></div>' + tip;
  }
  var rows = NUTRIENT_GROUPS.map(function(g){
    var got = cov.hits[g.key]||[];
    return '<div class="nutri-row '+(got.length?'on':'')+'">'+
      '<div class="nr-ico">'+g.emoji+'</div>'+
      '<div class="nr-main"><b>'+g.label+'</b>'+
        '<span>'+(got.length ? '来自 '+esc(got.slice(0,5).join('、')) : '本周没吃到 · 可试试 '+esc(g.tip))+'</span></div>'+
      '<div class="nr-state">'+(got.length?'✓ 已覆盖':'— 未覆盖')+'</div>'+
    '</div>';
  }).join('');
  return head + stats + '<div class="nutri-list">'+rows+'</div>' + tip;
}

/* ================= v16 营养知识页 ================= */
function kbCurrent(){
  var k = ui.kbKey;
  for(var i=0;i<NUTRIENT_KB.length;i++) if(NUTRIENT_KB[i].key===k) return NUTRIENT_KB[i];
  return NUTRIENT_KB[0];
}
function knowledgeHTML(){
  var cur = kbCurrent();
  var chips = NUTRIENT_KB.map(function(g){
    return '<button type="button" class="chip '+(g.key===cur.key?'on':'')+'" data-act="kb-tab" data-v="'+g.key+'">'+esc(g.label)+'</button>';
  }).join('');
  var max = 0;
  cur.foods.forEach(function(f){ if(f.v>max) max=f.v; });
  var rows = cur.foods.map(function(f){
    var pct = max ? Math.max(7, Math.round(f.v/max*100)) : 0; /* 给最小值一个可见宽度 */
    return '<div class="kb-row">'+
      '<div class="kb-name"><span class="kb-emoji">'+f.e+'</span><span>'+esc(f.n)+'</span></div>'+
      '<div class="kb-track"><div class="kb-bar" style="width:'+pct+'%"></div></div>'+
      '<div class="kb-val">'+esc(fmt(f.v))+'<small>'+esc(cur.unit)+'</small></div>'+
    '</div>';
  }).join('');
  var first = cur.foods.slice().sort(function(a,b){ return a.v-b.v; })[0];
  var last = cur.foods.slice().sort(function(a,b){ return b.v-a.v; })[0];
  return '<div class="chips kb-chips">'+chips+'</div>'+
    '<div class="kb-card">'+
      '<div class="kb-head"><div class="kb-title">'+esc(cur.label)+'</div>'+
      '<div class="kb-sub">'+esc(cur.sub)+'</div></div>'+
      '<div class="kb-note">'+esc(cur.note)+'</div>'+
      '<div class="kb-bars">'+rows+'</div>'+
      '<div class="kb-foot">最高 <b>'+esc(last.n)+' '+esc(fmt(last.v))+esc(cur.unit)+'</b> · 最低 <b>'+esc(first.n)+' '+esc(fmt(first.v))+esc(cur.unit)+'</b></div>'+
    '</div>';
}
/* ================= 好吃餐厅（v12） ================= */
function placeCfg(){
  if(!state.placeConfig || typeof state.placeConfig!=='object') state.placeConfig = {};
  var c = state.placeConfig;
  if(!Array.isArray(c.tags) || !c.tags.length) c.tags = clone(DEFAULT_PLACE_TAGS);
  if(!Array.isArray(c.dims) || !c.dims.length) c.dims = clone(DEFAULT_PLACE_DIMS);
  return c;
}
function placeTags(){ return placeCfg().tags; }
function placeDims(){ return placeCfg().dims; }
function placeById(id){
  for(var i=0;i<state.places.length;i++) if(state.places[i].id===id) return state.places[i];
  return null;
}
/* 综合分 = 各维度平均分（只算评过的维度），保留 1 位小数 */
function placeScore(p){
  var sum=0, n=0;
  placeDims().forEach(function(d){ var v=Number((p.scores||{})[d])||0; if(v>0){ sum+=v; n++; } });
  return n ? Math.round(sum/n*10)/10 : 0;
}
function placeStarHTML(v){
  v = Math.max(0, Math.min(5, Math.round(Number(v)||0)));
  return '<span class="stars"><span class="on">'+'★★★★★'.slice(0,v)+'</span><span class="off">'+'☆☆☆☆☆'.slice(0,5-v)+'</span></span>';
}
function placeMatch(p,q){
  if(!q) return true;
  var hay=[p.name,(p.tags||[]).join(' '),p.review||'',p.area||'',p.price||''].join(' ').toLowerCase();
  return hay.indexOf(q.toLowerCase())>-1;
}
function filteredPlaces(){
  var arr = state.places.filter(function(p){
    if(!placeMatch(p, ui.placeQ)) return false;
    if(ui.placeStatus!=='all' && (p.status||'been')!==ui.placeStatus) return false;
    if(ui.placeTag!=='全部' && (p.tags||[]).indexOf(ui.placeTag)<0) return false;
    return true;
  });
  if(ui.placeSort==='score') arr.sort(function(a,b){ return placeScore(b)-placeScore(a) || (b.updatedAt||0)-(a.updatedAt||0); });
  else if(ui.placeSort==='recent') arr.sort(function(a,b){ return (b.updatedAt||0)-(a.updatedAt||0); });
  else arr.sort(function(a,b){ return String(a.name||'').localeCompare(String(b.name||''),'zh'); });
  return arr;
}
/* 封面：first=第一张 / pick=指定一张 / random=随机一张（同一次渲染内稳定） */
function placeCover(p){
  var imgs = p.images||[];
  if(!imgs.length) return null;
  var mode = p.coverMode || 'first';
  if(mode==='pick'){
    for(var i=0;i<imgs.length;i++) if(imgs[i].id===p.coverId) return imgs[i].data;
    return imgs[0].data;
  }
  if(mode==='random'){
    if(!ui.placeRandom) ui.placeRandom = {};
    var k = ui.placeRandom[p.id];
    if(typeof k!=='number' || k>=imgs.length) k = ui.placeRandom[p.id] = Math.floor(Math.random()*imgs.length);
    return imgs[k].data;
  }
  return imgs[0].data;
}
function placeCardHTML(p){
  var imgs = p.images||[];
  var cover = placeCover(p);
  var thumbInner = cover
    ? '<img class="place-thumb" src="'+esc(cover)+'" alt="">'
    : '<span class="place-thumb ph">'+esc(p.ph||'🍽️')+'</span>';
  var reroll = (p.coverMode==='random' && imgs.length>1)
    ? '<button type="button" class="place-reroll" data-act="place-reroll" data-id="'+esc(p.id)+'" aria-label="换一张封面">🎲</button>'
    : '';
  var thumb = '<span class="place-thumb-wrap">'+thumbInner+reroll+'</span>';
  var sc = placeScore(p);
  var tg = (p.tags||[]).slice(0,3).map(function(t){ return '<span class="tag">'+esc(t)+'</span>'; }).join('');
  return '<div class="card place-card" data-act="place-open" data-id="'+esc(p.id)+'">'+ thumb +
    '<div class="place-body">'+
      '<div class="place-name">'+esc(p.name)+(p.status==='want'?'<span class="pbadge want">想去</span>':'')+'</div>'+
      '<div class="place-score">'+(sc ? '<b>★ '+sc+'</b>'+placeStarHTML(sc) : '<span class="pmuted">未评分</span>')+'</div>'+
      '<div class="place-tags">'+tg+(p.area?'<span class="place-area">📍'+esc(p.area)+'</span>':'')+'</div>'+
      (p.review?'<div class="place-review">'+esc(p.review)+'</div>':'')+
    '</div></div>';
}
function placeListHTML(){
  var arr = filteredPlaces();
  if(!arr.length){
    var why = state.places.length ? '当前筛选下没有餐厅' : '还没收藏餐厅';
    return '<div class="empty slim"><div class="big">🍽️</div><h3>'+why+'</h3>'+
      '<p>把吃过的好店、想去的店都收进来<br>打标签、按不同方面评星，约人时一眼就能挑</p></div>';
  }
  return arr.map(placeCardHTML).join('');
}
function placesHTML(){
  var status = [['all','全部'],['been','吃过'],['want','想去']].map(function(x){
    return '<button type="button" class="chip '+(ui.placeStatus===x[0]?'on':'')+'" data-act="place-status-f" data-v="'+x[0]+'">'+x[1]+'</button>';
  }).join('');
  var tags = ['全部'].concat(placeTags()).map(function(t){
    return '<button type="button" class="chip '+(ui.placeTag===t?'on':'')+'" data-act="place-tag-f" data-v="'+esc(t)+'">'+esc(t)+'</button>';
  }).join('');
  var sorts = [['score','评分最高'],['recent','最近更新'],['name','按名字']].map(function(x){
    return '<option value="'+x[0]+'"'+(ui.placeSort===x[0]?' selected':'')+'>'+x[1]+'</option>';
  }).join('');
  return '<div class="place-tools">'+
      '<button type="button" class="btn primary" data-act="place-add">＋ 添加餐厅</button>'+
      '<button type="button" class="btn" data-act="place-config">管理标签 / 维度</button>'+
    '</div>'+
    '<input class="search" id="placeSearch" type="search" placeholder="搜店名、标签、评语、商圈" value="'+esc(ui.placeQ)+'" autocomplete="off">'+
    '<div class="chips compact">'+status+'</div>'+
    '<div class="chips compact">'+tags+'</div>'+
    '<div class="place-sort"><span id="placeCount">'+filteredPlaces().length+' 家</span>'+
      '<select class="field" id="placeSortSel">'+sorts+'</select></div>'+
    '<div id="placeList">'+placeListHTML()+'</div>'+
    '<div class="hint">综合分 = 各评分维度的平均分（没评的维度不算）。点星星可以改分，再点同一颗可清零；标签和评分维度都能自己增减、改名。</div>';
}
function updatePlaceList(){
  var box = document.getElementById('placeList');
  if(box) box.innerHTML = placeListHTML();
  var c = document.getElementById('placeCount');
  if(c) c.textContent = filteredPlaces().length+' 家';
}

/* ---- 餐厅详情 ---- */
function placeDetailSheetHTML(){
  var p = placeById(ui.placeDetail);
  if(!p) return '';
  var sc = placeScore(p);
  var imgs = (p.images||[]).map(function(im,i){
    var isC = (p.coverMode==='pick' && p.coverId===im.id);
    return '<button type="button" class="src-img'+(isC?' is-cover':'')+'" data-act="place-img-open" data-id="'+esc(p.id)+'" data-i="'+i+'">'+
      '<img src="'+esc(im.data)+'" alt="图片 '+(i+1)+'">'+
      (isC?'<span class="cover-badge">主图</span>':'')+'</button>';
  }).join('');
  var rates = placeDims().map(function(d){
    var v = Number((p.scores||{})[d])||0;
    return '<div class="rate-row"><span class="rate-name">'+esc(d)+'</span>'+placeStarHTML(v)+
      '<span class="rate-num">'+(v?v+' 星':'未评')+'</span></div>';
  }).join('');
  var tg = (p.tags||[]).map(function(t){ return '<span class="tag">'+esc(t)+'</span>'; }).join('');
  var meta = [];
  if(p.area) meta.push('📍 '+esc(p.area));
  if(p.price) meta.push('人均 '+esc(p.price));
  if(p.status==='want') meta.push('还没去 · 想去');
  var link = p.link ? '<a class="src-link" href="'+esc(p.link)+'" target="_blank" rel="noopener noreferrer">打开地图 / 点评 ↗</a>' : '';
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">餐厅详情</span>'+
      '<button type="button" data-act="place-edit" data-id="'+esc(p.id)+'">编辑</button></div>'+
    '<div class="sheet-body">'+
      '<div class="place-hero"><div class="place-hero-name">'+esc(p.name)+
        (p.status==='want'?'<span class="pbadge want">想去</span>':'')+'</div>'+
        '<div class="place-hero-score">'+(sc?'<b>★ '+sc+'</b>'+placeStarHTML(sc):'<span class="pmuted">还没有评分</span>')+'</div>'+
        (meta.length?'<div class="place-meta">'+meta.join(' · ')+'</div>':'')+'</div>'+
      (tg?'<div class="section-title">标签</div><div class="place-tag-box">'+tg+'</div>':'')+
      '<div class="section-title">分项评分</div><div class="panel place-rate-box">'+rates+'</div>'+
      (p.review?'<div class="section-title">我的评语</div><div class="panel"><div class="place-review-full">'+esc(p.review)+'</div></div>':'')+
      (imgs?'<div class="section-title">照片</div><div class="img-grid">'+imgs+'</div>':'')+
      (link?'<div class="section-title">链接</div><div class="panel src-panel">'+link+'</div>':'')+
      '<button type="button" class="btn ghost-danger" style="width:100%;margin-top:22px" data-act="place-del" data-id="'+esc(p.id)+'">删除这家餐厅</button>'+
    '</div>';
}
function openPlaceDetail(id){ ui.placeDetail = id; openSheet(placeDetailSheetHTML()); }

/* ---- 新增 / 编辑表单（草稿驱动，重开 sheet 不丢数据） ---- */
function newPlaceDraft(p){
  if(p) return clone(p);
  return { id:'', name:'', status:'been', area:'', price:'', link:'', tags:[], scores:{}, images:[], review:'',
           coverMode:'first', coverId:'', ph:'🍽️' };
}
function openPlaceForm(id){
  ui.placeForm = newPlaceDraft(id ? placeById(id) : null);
  openSheet(placeFormHTML());
}
function syncPlaceForm(){
  var f = ui.placeForm; if(!f) return;
  function val(id){ var e=document.getElementById(id); return e ? e.value : ''; }
  f.name=val('pf-name'); f.area=val('pf-area'); f.price=val('pf-price');
  f.link=val('pf-link'); f.review=val('pf-review');
}
function placeFormHTML(){
  var f = ui.placeForm || newPlaceDraft(null);
  var tagChips = placeTags().map(function(t){
    return '<button type="button" class="pick-chip '+((f.tags||[]).indexOf(t)>-1?'on':'')+'" data-act="place-tag-toggle" data-v="'+esc(t)+'">'+esc(t)+'</button>';
  }).join('');
  var rates = placeDims().map(function(d){
    var cur = Number((f.scores||{})[d])||0;
    var stars = '';
    for(var n=1;n<=5;n++) stars += '<button type="button" class="rate-b '+(n<=cur?'on':'')+'" data-act="place-star" data-dim="'+esc(d)+'" data-v="'+n+'">★</button>';
    return '<div class="rate-row"><span class="rate-name">'+esc(d)+'</span><span class="rate-stars">'+stars+'</span>'+
      '<span class="rate-num">'+(cur?cur+' 星':'未评')+'</span></div>';
  }).join('');
  var cm = f.coverMode || 'first';
  var imgs = (f.images||[]).map(function(im,i){
    var isC = (cm==='pick' && f.coverId===im.id);
    return '<div class="pf-img'+(isC?' is-cover':'')+'"><img src="'+esc(im.data)+'" alt="">'+
      '<button type="button" class="pf-del" data-act="place-img-del" data-i="'+i+'" aria-label="删除图片">×</button>'+
      '<button type="button" class="pf-cover" data-act="place-cover-pick" data-i="'+i+'">'+(isC?'✓ 主图':'设为主图')+'</button></div>';
  }).join('');
  var modes = [['first','用第一张'],['pick','指定一张'],['random','🎲 随机换']].map(function(x){
    return '<button type="button" class="pick-chip '+(cm===x[0]?'on':'')+'" data-act="place-cover-mode" data-v="'+x[0]+'">'+x[1]+'</button>';
  }).join('');
  var phOpts = PLACE_PH.map(function(e){
    return '<button type="button" class="ph-opt '+((f.ph||'🍽️')===e?'on':'')+'" data-act="place-ph" data-v="'+esc(e)+'">'+esc(e)+'</button>';
  }).join('');
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">'+(f.id?'编辑餐厅':'添加餐厅')+'</span>'+
      '<button type="button" data-act="place-save" data-id="'+esc(f.id)+'">保存</button></div>'+
    '<div class="sheet-body">'+
      '<div class="form-group"><label>店名 *</label><input class="field" id="pf-name" placeholder="比如：巷子里的那家小馆" value="'+esc(f.name)+'"></div>'+
      '<div class="form-group"><label>状态</label><div class="pick-chips">'+
        '<button type="button" class="pick-chip '+(f.status==='been'?'on':'')+'" data-act="place-form-status" data-v="been">吃过</button>'+
        '<button type="button" class="pick-chip '+(f.status==='want'?'on':'')+'" data-act="place-form-status" data-v="want">想去 / 待打卡</button>'+
      '</div></div>'+
      '<div class="form-group field-row"><div><label>商圈 / 位置</label><input class="field" id="pf-area" placeholder="比如：静安寺" value="'+esc(f.area)+'"></div>'+
        '<div><label>人均</label><input class="field" id="pf-price" placeholder="比如：120" value="'+esc(f.price)+'"></div></div>'+
      '<div class="form-group"><label>标签（可多选）</label><div class="pick-chips">'+tagChips+'</div>'+
        '<div class="field-row" style="margin-top:8px"><input class="field" id="pf-newtag" placeholder="新标签，比如：适合请客" autocomplete="off">'+
        '<button type="button" class="btn" style="flex:0 0 72px" data-act="place-tag-new">添加</button></div></div>'+
      '<div class="form-group"><label>分项评分 <span style="font-weight:400">· 点同一颗可清零</span></label>'+
        '<div class="panel place-rate-box">'+rates+'</div>'+
        '<button type="button" class="mini-add" data-act="place-config">＋ 增减 / 改名评分维度</button></div>'+
      '<div class="form-group"><label>封面图</label><div class="pick-chips">'+modes+'</div>'+
        '<div class="pf-imgs">'+imgs+'</div>'+
        '<button type="button" class="btn" style="width:100%" data-act="place-img-pick">＋ 添加图片（最多 6 张）</button>'+
        '<div class="hint tight">选「指定一张」后点照片上的「设为主图」；选「随机换」后每次进餐厅页会随机挑一张，卡片上的 🎲 可以立刻换一张。</div></div>'+
      '<div class="form-group"><label>没有照片时显示的图标</label><div class="ph-picker">'+phOpts+'</div>'+
        '<div class="hint tight">还没上传照片时，列表卡片显示这个图标；也可以直接上传一张照片当封面。</div></div>'+
      '<div class="form-group"><label>我的评语</label><textarea class="field" id="pf-review" rows="4" placeholder="哪道菜好吃、适合和谁去、要不要订位…">'+esc(f.review||'')+'</textarea></div>'+
      '<div class="form-group"><label>地图 / 点评链接（选填）</label><input class="field" id="pf-link" placeholder="https://…" value="'+esc(f.link||'')+'"></div>'+
      '<button type="button" class="btn-block" data-act="place-save" data-id="'+esc(f.id)+'">保存餐厅</button>'+
    '</div>';
}
function placeSetScore(dim, n){
  syncPlaceForm();
  var f = ui.placeForm; if(!f) return;
  if(!f.scores) f.scores = {};
  f.scores[dim] = (Number(f.scores[dim])===n) ? 0 : n;
  openSheet(placeFormHTML());
}
function placeToggleTag(t){
  syncPlaceForm();
  var f = ui.placeForm; if(!f) return;
  if(!Array.isArray(f.tags)) f.tags = [];
  var i = f.tags.indexOf(t);
  if(i>-1) f.tags.splice(i,1); else f.tags.push(t);
  openSheet(placeFormHTML());
}
function placeAddTag(){
  syncPlaceForm();
  var inp = document.getElementById('pf-newtag');
  var t = inp ? (inp.value||'').trim() : '';
  if(!t){ toast('先写个标签名'); return; }
  var list = placeTags();
  if(list.indexOf(t)<0){ list.push(t); save(); }
  if(ui.placeForm){
    if(!Array.isArray(ui.placeForm.tags)) ui.placeForm.tags=[];
    if(ui.placeForm.tags.indexOf(t)<0) ui.placeForm.tags.push(t);
  }
  openSheet(placeFormHTML());
  toast('标签「'+t+'」已加上');
}
function pickPlaceImages(){
  syncPlaceForm();
  var inp = document.createElement('input');
  inp.type='file'; inp.accept='image/*'; inp.multiple=true;
  inp.onchange = function(){
    var files = Array.prototype.slice.call(inp.files||[]);
    if(!files.length || !ui.placeForm) return;
    if(!Array.isArray(ui.placeForm.images)) ui.placeForm.images=[];
    var left = 6 - ui.placeForm.images.length;
    if(left<=0){ toast('最多 6 张图'); return; }
    var pending = files.slice(0,left), n = 0;
    pending.forEach(function(file){
      compressImage(file, function(data){
        if(data && ui.placeForm) ui.placeForm.images.push({id:uid(), data:data});
        n++;
        if(n===pending.length){ openSheet(placeFormHTML()); toast('图片已加入'); }
      });
    });
  };
  inp.click();
}
function savePlace(id){
  syncPlaceForm();
  var f = ui.placeForm; if(!f) return;
  var name = (f.name||'').trim();
  if(!name){ toast('先填餐厅名字'); return; }
  var now = Date.now(), p = id ? placeById(id) : null;
  var fields = {
    name:name, status:f.status==='want'?'want':'been', area:f.area||'', price:f.price||'', link:f.link||'',
    tags:f.tags||[], scores:f.scores||{}, images:f.images||[], review:f.review||'',
    coverMode:(f.coverMode==='pick'||f.coverMode==='random')?f.coverMode:'first',
    coverId:f.coverId||'', ph:f.ph||'🍽️', updatedAt:now
  };
  if(p){ for(var k in fields) if(fields.hasOwnProperty(k)) p[k]=fields[k]; }
  else { fields.id=uid(); fields.createdAt=now; state.places.push(fields); }
  if(save()){
    ui.placeForm = null; ui.placeRandom = {};
    closeSheet(); render();
    toast(p ? '已更新「'+name+'」' : '已收进「'+name+'」');
  }
}
function deletePlace(id){
  var p = placeById(id); if(!p) return;
  if(!confirm('删除「'+p.name+'」？照片和评语也会一起删掉。')) return;
  state.places = state.places.filter(function(x){ return x.id!==id; });
  save(); closeSheet(); render(); toast('已删除');
}

/* ---- 标签 / 评分维度词表管理 ---- */
function placeConfigSheetHTML(){
  var tab = ui.pcfgTab || 'tag';
  var list = tab==='tag' ? placeTags() : placeDims();
  var rows = list.map(function(name,i){
    return '<div class="pcfg-row"><input class="field pcfg-name" data-pcfg-i="'+i+'" value="'+esc(name)+'">'+
      '<button type="button" class="del" data-act="pcfg-del" data-i="'+i+'" aria-label="删除">×</button></div>';
  }).join('');
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">管理标签 / 评分维度</span><span style="min-width:44px"></span></div>'+
    '<div class="sheet-body">'+
      '<div class="cat-sheet-tabs">'+
        '<button type="button" data-act="pcfg-tab" data-v="tag" class="'+(tab==='tag'?'on':'')+'">餐厅标签</button>'+
        '<button type="button" data-act="pcfg-tab" data-v="dim" class="'+(tab==='dim'?'on':'')+'">评分维度</button></div>'+
      '<div class="hint tight">直接改名字后按回车或点别处即可保存；改名会自动同步到已收藏的餐厅。删掉的词也会从餐厅上移除。</div>'+
      '<div class="panel">'+rows+'</div>'+
      '<div class="field-row" style="margin-top:12px"><input class="field" id="pcfg-new" placeholder="'+(tab==='tag'?'新标签名':'新维度名，比如：摆盘')+'" autocomplete="off">'+
        '<button type="button" class="btn primary" style="flex:0 0 72px" data-act="pcfg-add">添加</button></div>'+
      '<div class="hint">标签用来分类（菜系、场合、氛围…），评分维度是你打分的不同方面。两边都能任意增减。</div>'+
    '</div>';
}
function pcfgAdd(){
  var inp = document.getElementById('pcfg-new');
  var v = inp ? (inp.value||'').trim() : '';
  if(!v){ toast('先写个名字'); return; }
  var list = ui.pcfgTab==='tag' ? placeTags() : placeDims();
  if(list.indexOf(v)>-1){ toast('已经有这个名字了'); return; }
  list.push(v); save();
  openSheet(placeConfigSheetHTML()); toast('已添加「'+v+'」');
}
function pcfgDel(i){
  var isTag = ui.pcfgTab==='tag';
  var list = isTag ? placeTags() : placeDims();
  if(list.length<=1){ toast('至少留一个'); return; }
  var old = list[i]; if(old===undefined) return;
  list.splice(i,1);
  state.places.forEach(function(p){
    if(isTag) p.tags = (p.tags||[]).filter(function(t){ return t!==old; });
    else if(p.scores) delete p.scores[old];
  });
  save(); openSheet(placeConfigSheetHTML()); toast('已删除「'+old+'」');
}
function pcfgRename(el){
  var i = Number(el.getAttribute('data-pcfg-i'));
  var isTag = ui.pcfgTab==='tag';
  var list = isTag ? placeTags() : placeDims();
  var old = list[i], nv = (el.value||'').trim();
  if(nv===old || !nv || list.indexOf(nv)>-1){
    openSheet(placeConfigSheetHTML());
    if(nv && nv!==old) toast('名字重复了');
    return;
  }
  list[i] = nv;
  state.places.forEach(function(p){
    if(isTag) p.tags = (p.tags||[]).map(function(t){ return t===old ? nv : t; });
    else if(p.scores && p.scores[old]!==undefined){ p.scores[nv]=p.scores[old]; delete p.scores[old]; }
  });
  save(); openSheet(placeConfigSheetHTML()); toast('已改成「'+nv+'」');
}
/* ================= /好吃餐厅 ================= */

function pickerListHTML(q){
  var arr = state.recipes.filter(function(r){ return !q || matchQuery(r,q); });
  if(!arr.length) return '<div class="empty slim"><p>没找到这道菜</p></div>';
  return arr.map(function(r){
    var c = iconFor(r);
    return '<div class="pick-row" data-act="picker-pick" data-id="'+esc(r.id)+'">'+
      '<span class="thumb" style="background:'+c.bg+'">'+c.emoji+'</span>'+
      '<span class="pick-body"><b>'+esc(r.title)+'</b><small>'+esc(methodText(r))+' · 基准 '+esc(r.baseServings||2)+' 人份</small></span>'+
      '<span class="pick-add">＋</span></div>';
  }).join('');
}
function pickerHTML(){
  return '<div class="sheet-top"><button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
    '<span class="t">选一道菜 · '+esc(fmtDay(ui.calDay))+'</span><span style="min-width:44px"></span></div>'+
    '<div class="sheet-body"><input class="search" id="pickerSearch" type="search" placeholder="搜菜名或分类" autocomplete="off">'+
    '<div id="pickerList">'+pickerListHTML('')+'</div></div>';
}
function rebuildLogItems(date){
  var prefix = date+'|';
  var kept = {};
  state.checklist = state.checklist.filter(function(x){
    if(x.logKey && x.logKey.indexOf(prefix)===0){
      if(x.done){ kept[x.name+'|'+(x.u||'')]=1; return true; }
      return false;
    }
    return true;
  });
  var f = profileFactor();
  var merged = {}, order = [];
  logDay(date).recipes.forEach(function(it){
    var r = recipeById(it.recipeId); if(!r) return;
    var ratio = it.servings/(r.baseServings||2);
    (r.ingredients||[]).forEach(function(ing){
      var k = ing.n+'|'+(ing.u||'');
      if(kept[k]) return;
      if(!merged[k]){ merged[k] = {name:ing.n, u:ing.u||'', q:null, t:ingType(ing)}; order.push(k); }
      var q = scaleForIng(ing, ratio, f);
      if(q!==null) merged[k].q = merged[k].q===null ? q : friendlySum(merged[k].q, q);
    });
  });
  var title = fmtDay(date)+' · 饮食记录';
  order.forEach(function(k){
    state.checklist.push({
      id:uid(), name:merged[k].name, q:merged[k].q, u:merged[k].u, t:merged[k].t,
      recipeId:'log', recipeTitle:title, logKey:date+'|auto', done:false
    });
  });
}
function addLogRecipe(date, rid){
  var r = recipeById(rid); if(!r) return false;
  var day = ensureLog(date);
  var key = date+'|'+rid;
  if(day.recipes.some(function(x){ return x.key===key; })) return false;
  day.recipes.push({key:key, recipeId:rid, title:r.title, servings:1});
  rebuildLogItems(date);
  save();
  return true;
}
function changeLogServings(date, key, delta){
  var day = logDay(date);
  day.recipes.forEach(function(it){ if(it.key===key) it.servings = Math.min(10, Math.max(1, it.servings+delta)); });
  rebuildLogItems(date); save();
}
function removeLogRecipe(date, key){
  var day = ensureLog(date);
  day.recipes = day.recipes.filter(function(x){ return x.key!==key; });
  rebuildLogItems(date);
  if(!day.recipes.length && !day.notes.length) delete state.log[date];
  save();
}
function addLogNote(date, text){
  if(!text) return;
  ensureLog(date).notes.push({id:uid(), text:text});
  save();
}
function removeLogNote(date, id){
  var day = ensureLog(date);
  day.notes = day.notes.filter(function(n){ return n.id!==id; });
  if(!day.recipes.length && !day.notes.length) delete state.log[date];
  save();
}

/* ================= 分类管理 ================= */
function catSheetHTML(){
  var tab = ui.catTab || 'food';
  var top = '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">分类管理</span>'+
      '<button type="button" data-act="cat-reset">恢复默认</button></div>';
  var tabs = '<div class="cat-sheet-tabs">'+
      '<button type="button" data-act="cat-tab" data-v="food" class="'+(tab==='food'?'on':'')+'">食材分类</button>'+
      '<button type="button" data-act="cat-tab" data-v="method" class="'+(tab==='method'?'on':'')+'">制作方式</button></div>';
  return top + '<div class="sheet-body">' + tabs + (tab==='food'?catFoodHTML():catMethodHTML()) + '</div>';
}
function catFoodHTML(){
  var h = '<div class="hint">直接改名字就会同步更新已有菜谱上的分类标记；× 删除时对应标记也会一起清掉。每个大类里的细分可单独增减。</div>';
  foodTree().forEach(function(g,i){
    h += '<div class="cat-edit-group">'+
      '<div class="cat-edit-row">'+
        '<input class="field cat-emoji" data-cact="food-emoji" data-i="'+i+'" value="'+esc(g.emoji||'🍽️')+'" maxlength="4" aria-label="图标">'+
        '<input class="field" data-cact="food-name" data-i="'+i+'" value="'+esc(g.name)+'" aria-label="大类名称">'+
        '<button type="button" class="del" data-act="cat-del" data-v="food1:'+i+'">×</button>'+
      '</div><div class="cat-sub">'+
      (g.items||[]).map(function(it,j){
        return '<div class="cat-edit-row sub">'+
          '<input class="field" data-cact="food-sub" data-i="'+i+'" data-j="'+j+'" value="'+esc(it)+'" aria-label="细分名称">'+
          '<button type="button" class="del" data-act="cat-del" data-v="food2:'+i+':'+j+'">×</button></div>';
      }).join('')+
      '<div class="cat-add-row"><input class="field" id="catSub-'+i+'" placeholder="加一个细分，如 五花肉">'+
      '<button type="button" class="mini-add" data-act="cat-add" data-v="food2:'+i+'">+ 添加</button></div>'+
      '</div></div>';
  });
  h += '<div class="cat-add-row boxed"><input class="field" id="catBigNew" placeholder="新大类名称，如 羊肉">'+
       '<button type="button" class="mini-add" data-act="cat-add" data-v="food1">+ 新大类</button></div>';
  return h;
}
function catMethodHTML(){
  var h = '<div class="hint">制作方式用于筛选和标注，比如「电饭锅」「空气炸锅」。改名字会同步更新菜谱上的标记。</div>';
  h += methods().map(function(m,i){
    return '<div class="cat-edit-row">'+
      '<input class="field" data-cact="method-name" data-i="'+i+'" value="'+esc(m)+'" aria-label="做法名称">'+
      '<button type="button" class="del" data-act="cat-del" data-v="method:'+i+'">×</button></div>';
  }).join('');
  h += '<div class="cat-add-row boxed"><input class="field" id="catMethodNew" placeholder="新做法，如 砂锅">'+
       '<button type="button" class="mini-add" data-act="cat-add" data-v="method">+ 添加</button></div>';
  return h;
}
function catAdd(v){
  var p = v.split(':'), cats = catState(), val;
  if(p[0]==='food1'){
    val = (document.getElementById('catBigNew').value||'').trim();
    if(!val){ toast('先填大类名称'); return; }
    if(cats.foods.some(function(g){return g.name===val;})){ toast('已经有这个大类了'); return; }
    cats.foods.push({name:val, emoji:'🍽️', bg:'#E7E1D8', items:[]});
  }else if(p[0]==='food2'){
    var gi = Number(p[1]), g = cats.foods[gi];
    val = (document.getElementById('catSub-'+gi).value||'').trim();
    if(!val){ toast('先填细分名称'); return; }
    if(g.items.indexOf(val)>-1){ toast('已经有这个细分了'); return; }
    g.items.push(val);
  }else{
    val = (document.getElementById('catMethodNew').value||'').trim();
    if(!val){ toast('先填做法名称'); return; }
    if(cats.methods.indexOf(val)>-1){ toast('已经有这个做法了'); return; }
    cats.methods.push(val);
  }
  save(); render(); openSheet(catSheetHTML()); toast('已添加');
}
function catDelete(v){
  var p = v.split(':'), cats = catState();
  if(p[0]==='food1'){
    var i=Number(p[1]), g=cats.foods[i]; if(!g) return;
    if(cats.foods.length<=1){ toast('至少保留一个大类'); return; }
    if(!confirm('删除大类「'+g.name+'」？已有菜谱上的这个分类标记也会移除。')) return;
    state.recipes.forEach(function(r){ r.foods=(r.foods||[]).filter(function(f){ return f.split('/')[0]!==g.name; }); });
    cats.foods.splice(i,1);
    if(ui.food===g.name){ ui.food='全部'; ui.sub='全部'; }
  }else if(p[0]==='food2'){
    var gi=Number(p[1]), j=Number(p[2]), gg=cats.foods[gi]; if(!gg) return;
    var sub=gg.items[j]; if(sub===undefined) return;
    if(!confirm('删除细分「'+sub+'」？已有菜谱上的这个标记也会移除。')) return;
    state.recipes.forEach(function(r){ r.foods=(r.foods||[]).filter(function(f){ return f!==gg.name+'/'+sub; }); });
    gg.items.splice(j,1);
    if(ui.sub===sub) ui.sub='全部';
  }else{
    var k=Number(p[1]), m=cats.methods[k]; if(m===undefined) return;
    if(cats.methods.length<=1){ toast('至少保留一种做法'); return; }
    if(!confirm('删除做法「'+m+'」？已有菜谱上的这个标记也会移除。')) return;
    state.recipes.forEach(function(r){ r.methods=(r.methods||[]).filter(function(x){ return x!==m; }); });
    cats.methods.splice(k,1);
    if(ui.method===m) ui.method='全部';
  }
  save(); render(); openSheet(catSheetHTML()); toast('已删除');
}
function catRename(el){
  var kind = el.getAttribute('data-cact'), i = Number(el.getAttribute('data-i')), j = Number(el.getAttribute('data-j'));
  var val = (el.value||'').trim(), cats = catState(), old, dup = false;
  if(kind==='food-emoji'){ if(cats.foods[i]){ cats.foods[i].emoji = val||'🍽️'; save(); } return; }
  if(kind==='food-name'){ old=cats.foods[i].name; dup=cats.foods.some(function(g,k){return k!==i&&g.name===val;}); }
  else if(kind==='food-sub'){ old=cats.foods[i].items[j]; dup=cats.foods[i].items.some(function(x,k){return k!==j&&x===val;}); }
  else { old=cats.methods[i]; dup=cats.methods.some(function(x,k){return k!==i&&x===val;}); }
  if(!val || dup){ el.value = old; toast(dup?'已经有同名分类了':'名称不能为空'); return; }
  if(val===old) return;
  if(kind==='food-name'){
    cats.foods[i].name = val;
    state.recipes.forEach(function(r){ r.foods=(r.foods||[]).map(function(f){ var pp=f.split('/'); return pp[0]===old ? val+(pp[1]?'/'+pp[1]:'') : f; }); });
    if(ui.food===old) ui.food=val;
  }else if(kind==='food-sub'){
    cats.foods[i].items[j] = val;
    var big=cats.foods[i].name;
    state.recipes.forEach(function(r){ r.foods=(r.foods||[]).map(function(f){ return f===big+'/'+old ? big+'/'+val : f; }); });
    if(ui.sub===old) ui.sub=val;
  }else{
    cats.methods[i] = val;
    state.recipes.forEach(function(r){ r.methods=(r.methods||[]).map(function(m){ return m===old?val:m; }); });
    if(ui.method===old) ui.method=val;
  }
  save(); render(); toast('已改名，菜谱标记同步更新');
}
function catReset(){
  if(!confirm('恢复成默认分类？你自己加的大类、细分和做法都会被替换。')) return;
  state.categories = { foods: clone(DEFAULT_FOOD_TREE), methods: clone(DEFAULT_METHODS) };
  ui.food='全部'; ui.sub='全部'; ui.method='全部';
  save(); render(); openSheet(catSheetHTML()); toast('已恢复默认分类');
}

/* ================= 平台菜谱导入 ================= */
/* ================= 分享内容解析 v7 =================
   目标：覆盖小红书 / B站 / 抖音常见的分享文本写法
   - emoji / 括号 / 符号前缀的小标题
   - 小标题与内容同一行（【食材】番茄 2 个、鸡蛋 3 个）
   - 一行多食材（顿号、逗号分隔）
   - 1. / 1、/ ① / 1️⃣ / 一、/ Step 1 等步骤编号
   - 完全没有小标题时靠启发式分段
   纯逻辑，不依赖 DOM，可单独在 Node 里跑断言。
*/
var ING_WORDS = '食材准备|食材清单|材料清单|准备食材|所需材料|需要准备|用料清单|食材|用料|材料|配料|原料|备料|佐料|主料';
var STEP_WORDS = '做法步骤|制作步骤|制作方法|制作过程|操作步骤|做法流程|开始制作|烹饪步骤|做法|步骤|制作|教程|过程|烹饪|操作';
var ING_H_RE = new RegExp('^(?:' + ING_WORDS + ')\\s*(?:清单|列表|部分|准备|如下)?\\s*[:：]\\s*(.*)$');
var STEP_H_RE = new RegExp('^(?:' + STEP_WORDS + ')\\s*(?:清单|列表|部分|准备|如下)?\\s*[:：]\\s*(.*)$');
var ING_BARE_RE = new RegExp('^(?:' + ING_WORDS + ')\\s*(?:清单|列表|部分|准备|如下)?$');
var STEP_BARE_RE = new RegExp('^(?:' + STEP_WORDS + ')\\s*(?:清单|列表|部分|准备|如下)?$');
var NOTE_H_RE = /^(?:小贴士|小提示|备注|提示|注意|要点|诀窍|tips?)\s*[:：]?\s*(.*)$/i;

function isNoiseLine(l){
  var s = String(l || '').trim();
  if(!s) return true;
  if(/^https?:\/\/\S+$/.test(s)) return true;
  if(/^(?:[#＃][^\s#＃]+\s*)+$/.test(s)) return true;   // #家常菜 #减脂餐 这类话题行
  if(/^@\S+/.test(s)) return true;
  if(/(复制此链接|复制打开|打开.*App|打开.*小红书|发布了一篇|分享给你|长按复制|戳这里|点击链接|看看【|惊喜哦|口令)/.test(s) && s.length < 140) return true;
  if(/^(来自|发布于|编辑于|图片|视频|收藏|点赞|评论)/.test(s) && s.length < 24) return true;
  return false;
}
function cleanLine(l){
  var s = String(l || '').replace(/^[\s\u200b]+/, '');
  s = s.replace(/^\d+(?:\uFE0F)?\u20E3\s*/, '');            // 1️⃣ 2️⃣
  s = s.replace(/^[\(（]?\d+[\)）\.、:：]\s*/, '');          // 1. 1、1) （1）
  s = s.replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/, '');                // ①
  s = s.replace(/^第?[一二三四五六七八九十]+[、\.步]\s*/, ''); // 一、第一步
  s = s.replace(/^Step\s*\d+\s*[:：.]?\s*/i, '');
  s = s.replace(/^[^\u4e00-\u9fa5A-Za-z0-9]+/, '');          // 兜底：行首 emoji / 项目符号 / 括号
  s = s.replace(/[\]】）)]+$/, '');                            // 行尾括号
  return s.trim();
}
function isNumbered(l){
  return /^\s*(?:\d+[\.、\)）:：]|\d+\uFE0F?\u20E3|[①②③④⑤⑥⑦⑧⑨⑩]|第?[一二三四五六七八九十]+[、\.]|Step\s*\d+)/i.test(String(l || ''));
}
function looksLikeIng(s){
  if(isNumbered(s)) return false;
  var parts = String(s).split(/[、，,；;]/).filter(Boolean);
  if(parts.length >= 2){
    return parts.every(function(p){
      return p.length <= 16 && (/\d/.test(p) || /(适量|少许|若干|半)/.test(p));
    });
  }
  if(s.length > 26 || /[，。！？；;]/.test(s)) return false;
  return /\d/.test(s) || /(适量|少许|若干|一点点|半)/.test(s);
}
function cleanTitle(s){
  var t = cleanLine(String(s || ''))
    .replace(/(减脂期必做|真的绝了|巨好吃|超好吃|保姆级|天花板|必做|必学|绝了|太香了|巨简单|超简单|零失败|0失败|懒人版|快手|家常菜|教程|做法|来了|分享|笔记|这道)/g, '')
    .replace(/#[\u4e00-\u9fa5A-Za-z0-9_]+/g, '')
    .replace(/[|｜].*$/, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u20E3]/gu, '')
    .replace(/^[^\u4e00-\u9fa5A-Za-z0-9]+/, '')
    .replace(/[，,。!！?？~～].*$/, '')
    .trim();
  return t.slice(0, 26) || '';
}
function extractTitle(lines, fullText){
  var i, m;
  for(i = 0; i < lines.length; i++){
    if((m = lines[i].match(/(?:菜名|名称|标题|食谱|菜谱)\s*[:：]\s*(.+)$/))){
      var tt = cleanTitle(m[1]); if(tt) return { title: tt, idx: i };
    }
  }
  for(i = 0; i < Math.min(lines.length, 6); i++){
    if((m = lines[i].match(/[【「《\[]([^】」》\]]{2,26})[】」》\]]/)) && !/(食材|做法|步骤|材料|教程|用料)/.test(m[1])){
      var bt = cleanTitle(m[1]); if(bt) return { title: bt, idx: i };
    }
  }
  if(lines.length){
    var ft = cleanTitle(lines[0]); if(ft) return { title: ft, idx: 0 };
  }
  if((m = String(fullText || '').match(/【([^】]{2,30})】/))){
    var lt = cleanTitle(m[1]); if(lt) return { title: lt, idx: -1 };
  }
  return { title: '导入的菜谱', idx: -1 };
}
function sectionOf(line){
  var raw = String(line || '').trim();
  var bracket = raw.match(/^[\[【]\s*([^\]】]{1,14})\s*[\]】]\s*(.*)$/);
  var body = bracket ? bracket[1].trim() : cleanLine(raw);
  var rest = bracket ? bracket[2].trim() : '';
  var s = body.replace(/[\[\]【】（）()]+$/g, '').trim();
  var m;
  // 小红书爱用 💡 / 📌 直接带一句提示，没有「小贴士」三个字
  if(!bracket && /^[💡📌⚠️✨🔔]/.test(raw)){
    var nt = cleanLine(raw);
    if(nt && !ING_BARE_RE.test(nt) && !STEP_BARE_RE.test(nt)) return { k: 'note', rest: nt };
  }
  if((m = s.match(NOTE_H_RE))) return { k: 'note', rest: (m[1] || '').trim() || rest };
  if((m = s.match(ING_H_RE)))  return { k: 'ing',  rest: (m[1] || '').trim() || rest };
  if((m = s.match(STEP_H_RE))) return { k: 'step', rest: (m[1] || '').trim() || rest };
  var bare = s.replace(/[:：]\s*$/, '').trim();
  if(ING_BARE_RE.test(bare))  return { k: 'ing',  rest: rest };
  if(STEP_BARE_RE.test(bare)) return { k: 'step', rest: rest };
  return null;
}
function splitIngLine(s){
  var parts = String(s).split(/[、，,；;]/).map(function(x){ return x.trim(); }).filter(Boolean);
  if(parts.length < 2) return [s];
  var allOk = parts.every(function(p){
    return p.length <= 18 && (/\d/.test(p) || /(适量|少许|若干|一点点|半)/.test(p));
  });
  return allOk ? parts : [s];
}
function splitStepLine(s){
  var parts = String(s).split(/\s+(?=\d+[\.、\)）]\s*\S)/).map(function(x){ return x.trim(); }).filter(Boolean);
  return parts.length > 1 ? parts : [s];
}
function parseImport(raw, urlOverride){
  var text = String(raw || '').replace(/\r/g, '');
  var urls = text.match(/https?:\/\/[^\s，,、"'<>）)\]】]+/g) || [];
  var url = (urlOverride || '').trim() || urls[0] || '';
  var platform = detectPlatform(url, text);
  var lines = text.split('\n').map(function(l){ return l.trim(); }).filter(function(l){ return !isNoiseLine(l); });
  var ti = extractTitle(lines, text);
  var title = ti.title || '导入的菜谱';
  if(ti.idx >= 0) lines.splice(ti.idx, 1);

  var ingLines = [], stepLines = [], noteLines = [], mode = '', seenStep = false;
  function pushIng(s){ splitIngLine(s).forEach(function(p){ var c = cleanLine(p); if(c) ingLines.push(c); }); }
  function pushStep(s){ splitStepLine(s).forEach(function(p){ var c = cleanLine(p); if(c) stepLines.push(c); }); }
  lines.forEach(function(l){
    var sec = sectionOf(l);
    if(sec){
      mode = sec.k;
      if(sec.k === 'step') seenStep = true;
      if(sec.rest){
        if(sec.k === 'ing') pushIng(sec.rest);
        else if(sec.k === 'step') pushStep(sec.rest);
        else noteLines.push(cleanLine(sec.rest));
      }
      return;
    }
    var s = cleanLine(l);
    if(!s) return;
    if(mode === 'ing'){ pushIng(s); return; }
    if(mode === 'step'){ pushStep(s); return; }
    if(mode === 'note'){ noteLines.push(s); return; }
    if(isNumbered(l)){ seenStep = true; pushStep(s); return; }
    if(seenStep){ pushStep(s); return; }
    if(looksLikeIng(s)){ pushIng(s); return; }
    pushStep(s);
  });
  ingLines = ingLines.filter(Boolean);
  stepLines = stepLines.filter(Boolean);
  var onlyLink = !!url && !ingLines.length && !stepLines.length;
  var warn = '';
  if(onlyLink) warn = '这段分享里只有链接和口令，没有帖子正文。请在 App 里长按复制正文，或把帖子截图发给我整理。';
  else if(!ingLines.length && !stepLines.length) warn = '没读到食材和做法，原文已保留，可以手填或让 AI 整理。';
  else if(!ingLines.length) warn = '只读到做法，食材请补一下，或用 AI 整理。';
  else if(!stepLines.length) warn = '只读到食材，做法请补一下，或用 AI 整理。';
  return {
    title: title, ings: ingLines.join('\n'), steps: stepLines.join('\n'), note: noteLines.join('\n'),
    url: url, platform: platform, raw: text, found: !!(ingLines.length || stepLines.length),
    nIng: ingLines.length, nStep: stepLines.length, onlyLink: onlyLink, warn: warn
  };
}
function parseIngLines(text){
  var UNIT = 'g|克|kg|千克|斤|两|ml|毫升|l|升|个|只|根|片|瓣|颗|块|条|袋|把|茶匙|汤匙|勺|杯|包|盒|罐|束|撮|滴|棵|头|尾|张';
  var numRe = new RegExp('^(.+?)\\s*(\\d+(?:\\.\\d+)?)\\s*(' + UNIT + ')?\\s*$', 'i');
  var cnRe = new RegExp('^(.+?)\\s*(半|两|一|二|三|四|五|六|七|八|九|十)\\s*(' + UNIT + ')\\s*$');
  var cnMap = { '半': 0.5, '两': 2, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };
  return String(text || '').split(/\n+/).map(function(line){
    var s = cleanLine(line);
    if(!s) return null;
    var q = null, u = '', n = s, mm;
    if((mm = s.match(numRe))){ n = mm[1].trim(); q = Number(mm[2]); u = mm[3] || ''; }
    else if((mm = s.match(cnRe))){ n = mm[1].trim(); q = cnMap[mm[2]]; u = mm[3] || ''; }
    else {
      var ma = s.match(/^(.+?)\s*(适量|少许|若干|一点点|按口味)\s*$/);
      if(ma) n = ma[1].trim();
    }
    n = n.replace(/^[\[\]【】（）()]+/, '').trim();
    if(!n) return null;
    return { n: n, q: q, u: u, t: guessSeasoning(n) ? 'se' : 'main' };
  }).filter(Boolean);
}
/* 从 AI 回复里抠出第一个完整 JSON（对象或数组），忽略解释文字与代码块 */
function findJSON(text){
  var s = String(text || '').trim();
  s = s.replace(/^```(?:json|JSON)?\s*/, '').replace(/```\s*$/, '').trim();
  try { var whole = JSON.parse(s); if(whole && typeof whole === 'object') return whole; } catch(e){}
  var pos = 0;
  while(true){
    var a = s.indexOf('{', pos), b = s.indexOf('[', pos);
    var start = (a < 0) ? b : (b < 0) ? a : Math.min(a, b);
    if(start < 0) return null;
    var open = s.charAt(start), close = open === '{' ? '}' : ']';
    var depth = 0, inStr = false, escaped = false, end = -1;
    for(var i = start; i < s.length; i++){
      var c = s.charAt(i);
      if(inStr){
        if(escaped) escaped = false;
        else if(c === '\\') escaped = true;
        else if(c === '"') inStr = false;
        continue;
      }
      if(c === '"'){ inStr = true; continue; }
      if(c === open) depth++;
      else if(c === close){ depth--; if(depth === 0){ end = i; break; } }
    }
    if(end > start){
      try { var v = JSON.parse(s.slice(start, end + 1)); if(v && typeof v === 'object') return v; } catch(e){}
    }
    pos = start + 1;
  }
}
/* 兼容 AI 常用的中文字段名 / 分组写法；分组时保留食材或调味料类型 */
function normAI(d){
  if(!d || typeof d !== 'object') return {};
  function pick(keys){
    for(var i = 0; i < keys.length; i++){
      var v = d[keys[i]];
      if(v !== undefined && v !== null && v !== '') return v;
    }
    return undefined;
  }
  function tag(x, t){
    if(typeof x === 'string') return { n:x, t:t };
    if(x && typeof x === 'object'){
      var tt = (x.t === 'se' || x.t === 'main') ? x.t : t;
      return { n:x.n || x.name || '', q:x.q, u:x.u || '', t:tt };
    }
    return null;
  }
  var o = {
    title: pick(['title', '菜名', '名称', '名字', 'recipe', 'name']),
    minutes: pick(['minutes', 'time', '耗时', '时间', '烹饪时间']),
    baseServings: pick(['baseServings', 'servings', 'serv', '份数', '人份', '份量']),
    note: pick(['note', 'tips', '小贴士', '备注', '提示']),
    tags: pick(['tags', '标签', '关键词']),
    foods: pick(['foods', '食材分类', '分类']),
    methods: pick(['methods', '做法分类', '方式', '烹饪方式']),
    sourceUrl: pick(['sourceUrl', 'url', '链接', '原帖']),
    sourcePlatform: pick(['sourcePlatform', 'platform', '平台', '来源']),
    images: pick(['images', '图片', '配图']),
    score: pick(['score', '评分', '推荐度'])
  };
  var ing = pick(['ingredients', '食材', '材料', '用料', '配料', '食材清单', '材料清单']);
  if(ing && !Array.isArray(ing) && typeof ing === 'object'){
    var arr = [];
    Object.keys(ing).forEach(function(k){
      if(!Array.isArray(ing[k])) return;
      var isSe = /调味|调料|佐料/.test(k);
      ing[k].forEach(function(x){ var z = tag(x, isSe ? 'se' : 'main'); if(z) arr.push(z); });
    });
    ing = arr;
  }
  if(!Array.isArray(ing)){
    var a = pick(['主料', '食材']) || [], b = pick(['调味料', '调料', '调味']) || [];
    ing = [];
    if(Array.isArray(a)) a.forEach(function(x){ var z = tag(x, 'main'); if(z) ing.push(z); });
    if(Array.isArray(b)) b.forEach(function(x){ var z = tag(x, 'se'); if(z) ing.push(z); });
  }
  if(typeof ing === 'string') ing = ing.split(/\n+|[、，,]/).map(function(x){ return x.trim(); }).filter(Boolean);
  o.ingredients = ing;
  var steps = pick(['steps', '做法', '步骤', '制作步骤', '流程', '做法步骤']);
  if(typeof steps === 'string') steps = steps.split(/\n+|\s+(?=\d+[\.、\)）])/).map(cleanLine).filter(Boolean);
  o.steps = steps;
  return o;
}
/* ================= 批量导入：选题雷达候选清单 ================= */
function ingFromAI(arr){
  var out = [];
  (arr || []).forEach(function(x){
    if(typeof x === 'string'){
      parseIngLines(x).forEach(function(i){ out.push(i); });
      return;
    }
    if(!x || typeof x !== 'object') return;
    var n = String(x.n || x.name || '').trim();
    if(!n) return;
    var q = (x.q === undefined || x.q === null || x.q === '') ? null : Number(x.q);
    if(!isFinite(q)) q = null;
    var u = String(x.u || '').trim();
    var t = (x.t === 'se' || x.t === 'main') ? x.t : (guessSeasoning(n) ? 'se' : 'main');
    out.push({ n:n, q:q, u:u, t:t });
  });
  return out;
}
function ingLinesFromAI(arr){
  return (arr || []).map(function(x){
    if(typeof x === 'string') return x;
    if(!x || typeof x !== 'object') return '';
    return [x.n || x.name || '', (x.q === undefined || x.q === null || x.q === '') ? '' : x.q, x.u || '']
      .filter(function(a){ return a !== ''; }).join(' ');
  }).filter(Boolean).join('\n');
}
function aiRecipes(txt){
  var v = findJSON(txt);
  if(!v) return null;
  var arr;
  if(Array.isArray(v)) arr = v;
  else {
    arr = v.recipes || v['菜谱'] || v.list || v.items || v.data;
    if(!Array.isArray(arr)) arr = [v];
  }
  var out = arr.map(normAI).filter(function(d){
    return d && (d.title || (Array.isArray(d.ingredients) && d.ingredients.length) || (Array.isArray(d.steps) && d.steps.length));
  });
  return out.length ? out : null;
}
function normTitle(s){
  return String(s || '').replace(/[\s\-—·（）()【】\[\]、,，。!！~]/g, '').toLowerCase();
}
function dupTitles(){
  var set = {};
  state.recipes.forEach(function(r){ set[normTitle(r.title)] = true; });
  return set;
}
function validFoods(arr){
  if(!Array.isArray(arr) || !arr.length) return null;
  var out = [];
  foodTree().forEach(function(g){
    (g.items || []).forEach(function(it){
      var full = g.name + '/' + it;
      if(arr.indexOf(full) > -1 || arr.indexOf(it) > -1){
        if(out.indexOf(full) < 0) out.push(full);
      }
    });
  });
  return out.length ? out : null;
}
function validMethods(arr){
  if(!Array.isArray(arr) || !arr.length) return null;
  var out = [], valid = methods();
  arr.forEach(function(m){
    if(valid.indexOf(m) > -1){ if(out.indexOf(m) < 0) out.push(m); return; }
    for(var i = 0; i < valid.length; i++){
      if(valid[i].indexOf(m) > -1 || m.indexOf(valid[i]) > -1){
        if(out.indexOf(valid[i]) < 0) out.push(valid[i]);
        break;
      }
    }
  });
  return out.length ? out : null;
}
function recipeFromAI(d, m){
  var title = String(d.title || '').trim();
  if(!title) return null;
  var ings = ingFromAI(d.ingredients);
  var steps = (Array.isArray(d.steps) ? d.steps : []).map(cleanLine).filter(Boolean);
  var url = String(d.sourceUrl || d.url || (m && m.url) || '').trim();
  var vf = validFoods(d.foods), vm = validMethods(d.methods);
  var rawImgs = d.images;
  if(typeof rawImgs === 'string') rawImgs = [rawImgs];
  var imgs = (Array.isArray(rawImgs) ? rawImgs : [])
    .filter(function(x){ return /^(https?:\/\/|data:image\/)/i.test(String(x)); })
    .slice(0, 6).map(function(x){ return { id:uid(), data:String(x) }; });
  return {
    id:uid(), title:title, minutes:Number(d.minutes) || 0,
    baseServings:Math.max(1, Number(d.baseServings) || 2),
    favorite:false, createdAt:Date.now(),
    foods:vf || inferFoods({ingredients:ings}),
    methods:vm || inferMethods({title:title, steps:steps, note:d.note || '', tags:[]}),
    tags:Array.isArray(d.tags) ? d.tags.filter(Boolean).slice(0, 8) : [],
    ingredients:ings, steps:steps, note:String(d.note || '').trim(),
    sourceUrl:url,
    sourcePlatform:String(d.sourcePlatform || '') || detectPlatform(url, (m && m.raw) || ''),
    sourceText:(m && m.raw) || '',
    images:imgs, cookCount:0, lastCooked:'', cookLog:[]
  };
}
function batchHTML(){
  var b = (ui.imp && ui.imp.batch) || [];
  if(!b.length) return '';
  var dup = dupTitles(), n = 0;
  var rows = b.map(function(x, i){
    var d = x.d, isDup = !!dup[normTitle(d.title)];
    var checked = x.picked && !isDup;
    if(checked) n++;
    var meta = [ (d.ingredients || []).length + ' 样食材', (d.steps || []).length + ' 个步骤' ];
    if(d.minutes) meta.push(d.minutes + ' 分钟');
    if(d.sourcePlatform) meta.push(d.sourcePlatform);
    return '<label class="batch-row' + (isDup ? ' dup' : '') + '">' +
      '<input type="checkbox" data-bact="pick" data-i="' + i + '"' + (checked ? ' checked' : '') + (isDup ? ' disabled' : '') + '>' +
      '<span class="batch-main"><b>' + esc(d.title || '（没写菜名）') + '</b>' +
      '<small>' + esc(meta.join(' · ')) + '</small></span>' +
      (isDup ? '<span class="batch-dup">已有</span>' : '') + '</label>';
  }).join('');
  return '<div class="batch-box">' +
    '<div class="batch-head">读到 ' + b.length + ' 道菜谱 · 勾选要收的</div>' +
    '<label class="batch-all"><input type="checkbox" data-bact="all" checked> 全选（自动跳过已有同名）</label>' +
    rows +
    '<button type="button" class="btn primary" data-act="batch-save">导入选中的 ' + n + ' 道</button>' +
    '<button type="button" class="btn ghost" data-act="batch-clear">清空候选</button>' +
    '<div class="hint tight">批量导入会按你的分类自动归好食材和做法；来源链接会保留在详情页。</div>' +
    '</div>';
}
function batchSetPicked(){
  var b = (ui.imp && ui.imp.batch) || [];
  Array.prototype.forEach.call(document.querySelectorAll('[data-bact="pick"]'), function(el){
    var i = Number(el.getAttribute('data-i'));
    if(b[i]) b[i].picked = el.checked;
  });
}
function batchUpdateCount(){
  var btn = document.querySelector('[data-act="batch-save"]');
  if(!btn) return;
  var n = ((ui.imp && ui.imp.batch) || []).filter(function(x){ return x.picked; }).length;
  btn.textContent = '导入选中的 ' + n + ' 道';
}
function batchAll(on){
  var b = (ui.imp && ui.imp.batch) || [], dup = dupTitles();
  b.forEach(function(x){ x.picked = !!on && !dup[normTitle(x.d.title)]; });
  Array.prototype.forEach.call(document.querySelectorAll('[data-bact="pick"]'), function(el){
    if(!el.disabled) el.checked = !!on;
  });
  batchUpdateCount();
}
function batchSave(){
  syncImp();
  var m = ui.imp || {}, dup = dupTitles();
  var picked = (m.batch || []).filter(function(x){ return x.picked && !dup[normTitle(x.d.title)]; });
  if(!picked.length){ toast('先勾选至少一道菜'); return; }
  var made = [];
  picked.forEach(function(x){ var r = recipeFromAI(x.d, m); if(r) made.push(r); });
  if(!made.length){ toast('没有能导入的菜谱'); return; }
  var backup = state.recipes;
  state.recipes = made.concat(state.recipes);
  if(!save()){
    state.recipes = backup;
    toast('本地空间不足，少选几道再试');
    return;
  }
  ui.imp = null;
  closeSheet(); render();
  toast('已导入 ' + made.length + ' 道菜');
}
function syncImp(){
  if(!ui.imp) return;
  var map = {impRaw:'raw', impUrl:'url', impTitle:'title', impIngs:'ings', impSteps:'steps', impNote:'note', impAI:'ai'};
  Object.keys(map).forEach(function(k){ var e=document.getElementById(k); if(e) ui.imp[map[k]]=e.value; });
}
function detectPlatform(url, text){
  if(/xiaohongshu|xhslink|\bxhs\b/i.test(url)) return '小红书';
  if(/bilibili|b23\.tv|bili/i.test(url)) return 'B站';
  if(/douyin|iesdouyin/i.test(url)) return '抖音';
  if(/小红书/.test(text||'')) return '小红书';
  if(/bilibili|B站/i.test(text||'')) return 'B站';
  return url ? '网页' : '';
}
function impSheetHTML(){
  var m = ui.imp || {};
  var imgs = (m.images||[]).map(function(im,i){
    return '<div class="imp-img"><img src="'+esc(im.data)+'" alt="图片 '+(i+1)+'">'+
      '<button type="button" data-act="imp-img-del" data-i="'+i+'" aria-label="移除图片">×</button></div>';
  }).join('');
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">导入菜谱</span>'+
      '<button type="button" data-act="imp-save">保存</button></div>'+
    '<div class="sheet-body">'+
      '<div class="form-group"><label>① 粘贴分享内容</label>'+
        '<textarea class="field" id="impRaw" rows="6" placeholder="把小红书 / B站 的分享文字连链接一起复制进来…">'+esc(m.raw||'')+'</textarea>'+
        '<div class="field-row" style="margin-top:8px">'+
          '<input class="field" id="impUrl" placeholder="原帖链接（识别后自动填）" value="'+esc(m.url||'')+'">'+
          '<button type="button" class="btn primary" style="flex:0 0 84px" data-act="imp-parse">自动整理</button></div>'+
        (m.parseInfo ? '<div class="imp-result '+(m.parseInfo.onlyLink?'warn':'ok')+'">'+esc(m.parseInfo.text)+'</div>' : '')+
        '<div class="hint tight">小红书「分享 → 复制链接」常只给出口令和链接、没有正文；这时请长按复制笔记正文，或把帖子截图发到 WorkBuddy 对话里让我整理。整理结果都能在下面手动改。</div></div>'+
      '<div class="form-group"><label>② 整理结果（可以直接改）</label>'+
        '<input class="field" id="impTitle" placeholder="菜名" value="'+esc(m.title||'')+'" style="margin-bottom:4px">'+
        '<label class="mini-label">食材 · 一行一样，如「番茄 2 个」</label>'+
        '<textarea class="field" id="impIngs" rows="4" placeholder="番茄 2 个&#10;鸡蛋 3 个&#10;盐 适量">'+esc(m.ings||'')+'</textarea>'+
        '<label class="mini-label">做法 · 一行一步</label>'+
        '<textarea class="field" id="impSteps" rows="4" placeholder="番茄切块，鸡蛋打散&#10;热锅炒蛋盛出，再炒番茄出汁">'+esc(m.steps||'')+'</textarea>'+
        '<label class="mini-label">小贴士（选填）</label>'+
        '<textarea class="field" id="impNote" rows="2">'+esc(m.note||'')+'</textarea></div>'+
      '<div class="form-group"><label>③ 原帖图片</label>'+
        '<div class="imp-imgs">'+imgs+'</div>'+
        '<button type="button" class="btn" data-act="imp-pick-img">＋ 添加图片（可多选）</button>'+
        '<div class="hint tight">图片会压缩后存在本机浏览器里，每道菜最多 6 张；详情页点开可看大图。图片里的文字无法自动识别，需要文字版请用下面的 AI 整理。</div></div>'+
      '<div class="form-group"><label>④ AI 整理 / 批量导入</label>'+
        '<div class="imp-howto">把帖子文字、截图或「选题雷达」给你的候选 JSON 粘到下面 → 点「应用整理结果」。单道菜会填进 ②，多道菜会在下面列成清单让你勾选。也可以复制提示词发给其他 AI。</div>'+
        '<button type="button" class="btn" data-act="imp-copy-prompt">复制整理提示词</button>'+
        '<textarea class="field" id="impAI" rows="3" placeholder="把 AI 回复或候选 JSON 整段粘进来（单条、数组、代码块都行）" style="margin-top:8px">'+esc(m.ai||'')+'</textarea>'+
        '<button type="button" class="btn" style="margin-top:8px" data-act="imp-apply-ai">应用整理结果</button>'+
        batchHTML()+
        '<div class="hint tight">支持单条 JSON、数组、{recipes:[…]} 和中文字段名（菜名 / 食材 / 做法 / 小贴士），带解释文字或代码块也能识别。多道菜会列出候选，勾选后一次导入。全程不经过服务器。</div></div>'+
      '<button type="button" class="btn-block" data-act="imp-save">收进食谱盒子</button>'+
      '<div class="hint">导入后可以在「编辑」里补分类、份数和用量；原帖链接和原文会一直保留。</div>'+
    '</div>';
}
/* v9 专用批量导入页：一眼可见的独立入口对应的页面，不再藏在 ④ 区底部 */
function batchSheetHTML(){
  var m = ui.imp || {};
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">批量导入候选菜谱</span>'+
      '<span style="min-width:44px"></span></div>'+
    '<div class="sheet-body">'+
      '<div class="batch-intro">把「食谱选题雷达」生成的候选 JSON 整段贴进来，一次读到多道菜，勾选后批量收进食谱盒子。<br>支持数组、{recipes:[…]}、单条对象、代码块，带解释文字的整段回复也能识别。</div>'+
      '<div class="form-group"><label>① 粘贴候选 JSON</label>'+
        '<textarea class="field mono" id="impAI" rows="8" placeholder="把 菜谱候选/2026-11-11.json 的内容整段粘进来…">'+esc(m.ai||'')+'</textarea>'+
        '<div class="field-row" style="margin-top:8px">'+
          '<button type="button" class="btn" data-act="batch-file">从文件选择</button>'+
          '<button type="button" class="btn primary" data-act="imp-apply-ai">读取候选</button></div>'+
        (m.parseInfo ? '<div class="imp-result '+(m.parseInfo.onlyLink?'warn':'ok')+'">'+esc(m.parseInfo.text)+'</div>' : '')+
      '</div>'+
      batchHTML()+
      '<div class="hint">还没有候选文件？把想吃的关键词发给我（WorkBuddy），或把多篇帖子文字一起发来，我会返回可直接粘贴的 JSON 数组。导入时会按你的分类自动归好食材和做法，来源链接保留在详情页。</div>'+
    '</div>';
}
function fallbackCopy(text){
  var ta=document.createElement('textarea');
  ta.value=text; ta.style.position='fixed'; ta.style.left='-9999px';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); toast('提示词已复制'); }catch(e){ toast('复制失败，请手动选中'); }
  document.body.removeChild(ta);
}
function impCopyPrompt(){
  syncImp();
  var raw = (ui.imp && ui.imp.raw) || '';
  var p = '请把下面这段菜谱分享内容整理成 JSON，只返回 JSON 本身，不要解释。\n'+
    '格式：{"title":"菜名","minutes":20,"baseServings":2,"ingredients":[{"n":"食材名","q":2,"u":"个"}],"steps":["第一步","第二步"],"note":"小贴士","tags":["快手"],"foods":["蔬菜/番茄"],"methods":["炒"]}\n'+
    '要求：1) 食材一行一样，数量用数字，单位单独写；没写数量就去掉 q/u。2) 调味料也列进 ingredients。3) 步骤去掉序号、一行一步。4) 归纳出简洁的菜名、小贴士和标签。5) 看不懂的地方留空数组，不要编造。6) 原文只有分享链接和口令、没有正文时，返回 {\"title\":\"\",\"ingredients\":[],\"steps\":[],\"note\":\"原文没有正文\"}。7) 原文包含多道菜时，返回对象数组而不是单个对象。\n\n原文：\n'+
    (raw || '（先把分享内容粘到导入框里再点复制，会一起带上）');
  var done = false;
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(p).then(
        function(){ toast('提示词已复制，直接发给 WorkBuddy 或任意 AI'); },
        function(){ fallbackCopy(p); }
      );
      done = true;
    }
  }catch(e){}
  if(!done) fallbackCopy(p);
}
function impApplyAI(){
  syncImp();
  var txt = ((ui.imp && ui.imp.ai) || '').trim();
  if(!txt){ toast(ui.imp && ui.imp.batchOnly ? '先把候选 JSON 粘进来' : '先把 AI 返回的 JSON 粘进来'); return; }
  var list = aiRecipes(txt);
  if(!list){ toast('没读到有效 JSON，把整段内容粘进来就行'); return; }
  if(ui.imp.batchOnly){
    ui.imp.batch = list.map(function(d){ return { d:d, picked:true }; });
    ui.imp.parseInfo = { nIng:0, nStep:0, onlyLink:false, text:'✓ 成功读到 '+list.length+' 道，下面勾选要收的' };
    openSheet(batchSheetHTML());
    toast('读到 '+list.length+' 道，勾选后批量导入');
    return;
  }
  if(list.length > 1){
    ui.imp.batch = list.map(function(d){ return { d:d, picked:true }; });
    ui.imp.parseInfo = {
      nIng:0, nStep:0, onlyLink:false,
      text:'读到 ' + list.length + ' 道菜谱，在下面勾选要收的'
    };
    openSheet(impSheetHTML());
    toast('读到 ' + list.length + ' 道，勾选后批量导入');
    return;
  }
  var d = list[0];
  ui.imp.batch = null;
  if(d.title) ui.imp.title = String(d.title);
  if(Array.isArray(d.ingredients)) ui.imp.ings = ingLinesFromAI(d.ingredients);
  if(Array.isArray(d.steps)) ui.imp.steps = d.steps.map(cleanLine).filter(Boolean).join('\n');
  if(d.note) ui.imp.note = String(d.note);
  if(d.sourceUrl) ui.imp.url = String(d.sourceUrl);
  ui.imp.aiFoods = validFoods(d.foods);
  ui.imp.aiMethods = validMethods(d.methods);
  ui.imp.aiTags = Array.isArray(d.tags) ? d.tags : null;
  ui.imp.aiMinutes = d.minutes;
  ui.imp.aiServ = d.baseServings;
  ui.imp.parseInfo = {
    nIng: Array.isArray(d.ingredients) ? d.ingredients.length : 0,
    nStep: Array.isArray(d.steps) ? d.steps.length : 0,
    onlyLink: false,
    text: 'AI 整理结果已填入，检查一下再保存'
  };
  openSheet(impSheetHTML()); toast('整理结果已填好，检查一下再保存');
}
function compressImage(file, cb){
  var reader = new FileReader();
  reader.onload = function(){
    var img = new Image();
    img.onload = function(){
      var max = 1000, w = img.width, h = img.height;
      var s = Math.min(1, max/Math.max(w,h));
      w = Math.max(1,Math.round(w*s)); h = Math.max(1,Math.round(h*s));
      var cv = document.createElement('canvas'); cv.width=w; cv.height=h;
      var ctx = cv.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h); ctx.drawImage(img,0,0,w,h);
      var data;
      try{ data = cv.toDataURL('image/jpeg',0.68); }catch(e){ data = reader.result; }
      cb(data);
    };
    img.onerror = function(){ cb(null); };
    img.src = reader.result;
  };
  reader.onerror = function(){ cb(null); };
  reader.readAsDataURL(file);
}
function saveImport(){
  syncImp();
  var m = ui.imp || {};
  var title = (m.title||'').trim();
  if(!title){ toast('先给这道菜起个名字'); return; }
  var ings = parseIngLines(m.ings);
  var steps = String(m.steps||'').split(/\n+/).map(cleanLine).filter(Boolean);
  var url = (m.url||'').trim();
  var r = {
    id:uid(), title:title, minutes:0, baseServings:2, favorite:false, createdAt:Date.now(),
    foods: inferFoods({ingredients:ings}),
    methods: inferMethods({title:title, steps:steps, note:m.note||'', tags:[]}),
    tags:[], ingredients:ings, steps:steps, note:(m.note||'').trim(),
    sourceUrl:url, sourcePlatform:detectPlatform(url, m.raw||''), sourceText:m.raw||'',
    images:(m.images||[]).slice(0,6), cookCount:0, lastCooked:'', cookLog:[]
  };
  if(m.aiFoods) r.foods = m.aiFoods;
  if(m.aiMethods) r.methods = m.aiMethods;
  if(m.aiTags) r.tags = m.aiTags;
  if(m.aiMinutes!==undefined) r.minutes = Number(m.aiMinutes)||0;
  if(m.aiServ!==undefined) r.baseServings = Math.max(1, Number(m.aiServ)||2);
  state.recipes.unshift(r);
  if(!save()){
    state.recipes.shift();
    toast('图片太多存不下，删掉几张再试');
    return;
  }
  ui.imp = null;
  closeSheet(); render(); toast('已导入「'+title+'」');
}

/* ================= 制作次数 / 大图查看 ================= */
/* 每次制作留一条记录，才能精确撤销、恢复上一次日期、逐条删除 */
function cookEntries(r){
  if(!Array.isArray(r.cookLog)){
    var out=[], n=Number(r.cookCount)||0, d=String(r.lastCooked||'');
    for(var i=0;i<n;i++) out.push({d:d, src:'legacy'});
    r.cookLog = out;
  }
  return r.cookLog;
}
function syncCookMeta(r){
  var list = cookEntries(r);
  r.cookCount = list.length;
  r.lastCooked = list.length ? (list[list.length-1].d || '') : '';
}
function cookOnce(){
  var r = recipeById(ui.detail && ui.detail.id); if(!r) return;
  cookEntries(r).push({d:todayKey(), src:'plus'});
  syncCookMeta(r);
  save(); rerenderDetail(); render();
  toast('第 '+r.cookCount+' 次做「'+r.title+'」');
}
function cookToday(){
  var r = recipeById(ui.detail && ui.detail.id); if(!r) return;
  var d = todayKey();
  var added = addLogRecipe(d, r.id);
  if(added){
    cookEntries(r).push({d:d, src:'today'});
    syncCookMeta(r);
    save();
  }
  rerenderDetail(); render();
  toast(added ? '已记到今天，清单同步更新' : '今天已经记过这道菜了');
}
/* 撤销第 idx 条（默认最后一条）。若来自「记到今天」，连带移除当天饮食记录并重建清单 */
function cookUndo(rid, idx){
  var r = recipeById(rid); if(!r){ toast('找不到这道菜'); return; }
  var list = cookEntries(r);
  if(!list.length){ toast('还没有制作记录'); return; }
  var at = (typeof idx==='number' && idx>=0 && idx<list.length) ? idx : list.length-1;
  var e = list.splice(at,1)[0];
  syncCookMeta(r);
  if(e && e.src==='today' && e.d){
    var day = state.log[e.d];
    if(day && (day.recipes||[]).some(function(x){ return x.recipeId===rid; })){
      removeLogRecipe(e.d, e.d+'|'+rid);
    }
  }
  save();
  if(ui.detail && ui.detail.id===rid) rerenderDetail();
  render();
  toast('已撤销 1 次记录，现在 '+r.cookCount+' 次');
}
function cookHistoryHTML(r){
  if(!ui.cookHist) return '';
  var list = cookEntries(r);
  if(!list.length) return '<div class="cook-hist-empty">还没有制作记录</div>';
  var rows = list.map(function(e,i){
    var when = e.d ? fmtDay(e.d) : '日期未记录';
    var src = e.src==='today' ? '记到今天' : (e.src==='legacy' ? '旧记录' : '手动记录');
    return '<div class="cook-hist-row">'+
      '<span class="ch-no">'+(i+1)+'</span>'+
      '<span class="ch-main">'+esc(when)+'<small>'+src+'</small></span>'+
      '<button type="button" class="ch-del" data-act="cook-del" data-id="'+esc(r.id)+'" data-i="'+i+'">删除</button>'+
    '</div>';
  }).join('');
  return '<div class="cook-hist">'+rows+'</div>';
}
function openLightbox(imgs, i){
  var lb = document.getElementById('lightbox'); if(!lb || !imgs.length) return;
  ui.lb = {imgs:imgs, i:i};
  lb.innerHTML = '<button type="button" class="lb-close" data-act="lb-close" aria-label="关闭">×</button>'+
    '<img src="'+esc(imgs[i].data)+'" alt="菜谱大图">'+
    (imgs.length>1 ? '<button type="button" class="lb-nav prev" data-act="lb-nav" data-v="-1">‹</button>'+
                     '<button type="button" class="lb-nav next" data-act="lb-nav" data-v="1">›</button>' : '')+
    '<div class="lb-count">'+(i+1)+' / '+imgs.length+'</div>';
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
}
function lbNav(d){
  if(!ui.lb) return;
  var n = ui.lb.imgs.length;
  ui.lb.i = (ui.lb.i + d + n) % n;
  openLightbox(ui.lb.imgs, ui.lb.i);
}
function closeLightbox(){
  var lb = document.getElementById('lightbox');
  if(lb){ lb.classList.remove('open'); lb.innerHTML=''; lb.setAttribute('aria-hidden','true'); }
  ui.lb = null;
}
function meHTML(){
  var fav = state.recipes.filter(function(r){return r.favorite;}).length;
  var left = state.checklist.filter(function(x){return !x.done;}).length;
  var p = state.profile;
  var f = profileFactor();
  return '<div class="stat"><div><b>'+state.recipes.length+'</b><span>道食谱</span></div>'+
    '<div><b>'+fav+'</b><span>已收藏</span></div>'+
    '<div><b>'+left+'</b><span>待购买</span></div></div>'+
    '<div class="section-title">我的 1 人份标准</div>'+
    '<div class="panel"><div class="profile-box">'+
      '<div class="field-row"><div><label>身高 cm</label><input class="field" id="p-height" type="number" inputmode="decimal" value="'+esc(p.height)+'"></div>'+
      '<div><label>体重 kg</label><input class="field" id="p-weight" type="number" inputmode="decimal" value="'+esc(p.weight)+'"></div></div>'+
      '<div class="factor-line">1 人份系数 <b id="factorVal">'+esc(fmt(f))+'</b><span>标准成人份的 '+Math.round(f*100)+'%</span></div>'+
      '<input type="range" id="f-factor" min="0.7" max="1.2" step="0.01" value="'+esc(f)+'">'+
      '<button type="button" class="btn" style="width:100%;margin-top:10px" data-act="factor-reset">按体型重算</button>'+
      '<div class="hint">按 '+esc(p.height)+'cm / '+esc(p.weight)+'kg 估算日需约 '+Math.round(calcFactor(p.height,p.weight,30)*1900)+' kcal（年龄按 30 岁、轻活动估算），对照 1900 kcal 得出系数。主料按系数调整，调味料基本保持，可数食材取整到半份，避免味道变淡或出现 0.85 个番茄。这是份量换算参考，不是营养建议；滑块可按体感微调。</div>'+
    '</div></div>'+
    '<div class="section-title">云同步 · GitHub</div>'+
    '<div class="panel">'+
      '<div class="cloud-head"><span class="cloud-dot '+(cloudReady()?'on':'')+'"></span><b>'+(cloudReady()?'已连接':'未连接')+'</b>'+
        '<span>'+(cloud.lastSyncAt? '上次同步 '+esc(fmtStamp(cloud.lastSyncAt)) : '还没同步过')+'</span></div>'+
      '<div class="cloud-btns">'+
        '<button type="button" class="btn primary" data-act="cloud-sync">⇅ 智能同步</button>'+
        '<button type="button" class="btn" data-act="cloud-up">↑ 上传</button>'+
        '<button type="button" class="btn" data-act="cloud-down">↓ 下载</button>'+
      '</div>'+
      '<div class="setting-row" data-act="cloud-setup"><div>连接 / 更换 GitHub<small>填 Token 自动建私有 Gist，其他设备填同一个 ID</small></div><span class="go">设置 ›</span></div>'+
      '<div class="setting-row" data-act="cloud-toggle-auto"><div>自动同步<small>改动后自动上传，打开时自动取最新</small></div><span class="go">'+(cloud.auto?'已开启 ›':'已关闭 ›')+'</span></div>'+
      '<div class="setting-row" data-act="cloud-share"><div>生成只读分享链接<small>发给朋友看，对方可一键存成自己的副本</small></div><span class="go">分享 ›</span></div>'+
      '<div class="hint cloud-hint">数据放在你自己 GitHub 账号的 Secret Gist 里。Token 只存这台设备，不写进导出备份，也不出现在分享链接里。</div>'+
    '</div>'+
    '<div class="section-title">数据备份</div>'+
    '<div class="panel">'+
      '<div class="setting-row" data-act="export"><div>导出为文件<small>下载 JSON 备份，换手机也能带走</small></div><span class="go">导出 ›</span></div>'+
      '<div class="setting-row" data-act="import"><div>从文件恢复<small>导入之前导出的备份，会覆盖现有数据</small></div><span class="go">导入 ›</span></div>'+
      '<div class="setting-row" data-act="restore"><div>补回示例食谱<small>补进新增的示例菜，不改动你自己的菜</small></div><span class="go">恢复 ›</span></div>'+
    '</div>'+
    '<div class="section-title">分类管理</div>'+
    '<div class="panel"><div class="setting-row" data-act="cat-manage"><div>编辑食材分类与制作方式<small>大类、细分、做法都能自己增减和改名</small></div><span class="go">管理 ›</span></div></div>'+
    '<div class="section-title">分类说明</div>'+
    '<div class="note">每道菜可以同时挂多个食材分类（大类 / 细分，如「猪肉 / 五花肉」）和多个制作方式（如「电饭锅」「煎炸」）。两个维度可叠加筛选。</div>'+
    '<div class="section-title">关于数据</div>'+
    '<div class="note">默认只保存在当前设备的浏览器里。开启上面的 GitHub 云同步后，数据会存进你自己的私有 Gist，所有设备读写同一份；分享链接是只读的，拿到的人改不了你的数据。清理浏览器数据会清掉本机记录和 Token，建议偶尔导出一份备份。</div>'+
    '<div class="section-title">危险操作</div>'+
    '<div class="panel"><div class="setting-row" data-act="wipe"><div style="color:var(--danger)">清空全部数据<small>食谱、清单和记录都会被删除</small></div><span class="go">清空 ›</span></div></div>';
}

function render(){
  var tb = document.getElementById('tabbar'), fb = document.getElementById('fab');
  if(ui.share){
    document.getElementById('topbar').innerHTML = '<h1>朋友分享的食谱盒子</h1><div class="sub">只读浏览 · 不会改动对方的任何数据</div>';
    document.getElementById('view').innerHTML = shareHTML();
    if(tb) tb.classList.add('hide');
    if(fb) fb.classList.add('hide');
    return;
  }
  if(tb) tb.classList.remove('hide');
  document.getElementById('topbar').innerHTML = topbarHTML();
  var v = document.getElementById('view');
  v.innerHTML = ui.tab==='recipes' ? recipesHTML() :
                ui.tab==='list' ? listHTML() :
                ui.tab==='record' ? recordHTML() :
                ui.tab==='knowledge' ? knowledgeHTML() : meHTML();
  if(ui.tab==='recipes') updateRecipeList();
  var tbs = document.querySelectorAll('.tabbar button');
  for(var i=0;i<tbs.length;i++) tbs[i].classList.toggle('on', tbs[i].getAttribute('data-tab')===ui.tab);
  document.getElementById('fab').classList.toggle('hide', ui.tab!=='recipes');
}

function openSheet(html){
  var s = document.getElementById('sheet');
  s.innerHTML = html;
  s.classList.add('open');
  s.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  var b = s.querySelector('.sheet-body'); if(b) b.scrollTop = 0;
}
function closeSheet(){
  var s = document.getElementById('sheet');
  s.classList.remove('open');
  s.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  ui.detail = null;
  setTimeout(function(){ if(!s.classList.contains('open')) s.innerHTML=''; }, 260);
}

function detailBodyHTML(){
  var r = recipeById(ui.detail.id);
  if(!r) return '';
  var c = iconFor(r);
  var ratio = ui.detail.servings / (r.baseServings||2);
  var f = profileFactor();
  var tags = tagLabels(r).map(function(t){return '<span class="tag">'+esc(t)+'</span>';}).join('');
  var groups = splitIngs(r);
  var cc = cookEntries(r).length;
  var cookBox = '<div class="cook-box">'+
    '<div class="cook-num"><b>'+cc+'</b> 次'+
      '<span>'+(r.lastCooked ? '上次 '+fmtDay(r.lastCooked) : '还没记录过')+'</span></div>'+
    '<div class="cook-btns">'+
      '<button type="button" class="btn primary" data-act="cook-plus">✓ 又做了一次</button>'+
      '<button type="button" class="btn" data-act="cook-today">记到今天</button>'+
    '</div></div>'+
    '<div class="cook-tools">'+
      '<button type="button" data-act="cook-hist">'+(ui.cookHist?'收起明细 ↑':'记录明细 ›')+'</button>'+
    '</div>'+
    cookHistoryHTML(r);
  var srcBlock = '';
  if(r.sourceUrl || (r.images||[]).length || r.sourceText){
    var srcImgs = (r.images||[]).map(function(im,i){
      return '<button type="button" class="src-img" data-act="img-open" data-id="'+esc(r.id)+'" data-i="'+i+'"><img src="'+esc(im.data)+'" alt="图片 '+(i+1)+'"></button>';
    }).join('');
    srcBlock = '<div class="section-title">来源与图片</div><div class="panel src-panel">'+
      (r.sourceUrl ? '<a class="src-link" href="'+esc(r.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+esc(r.sourcePlatform||'网页')+' · 打开原帖 ↗</a>' : '')+
      (srcImgs ? '<div class="img-grid">'+srcImgs+'</div>' : '')+
      (r.sourceText ? '<details class="raw-details"><summary>查看导入原文</summary><pre>'+esc(r.sourceText)+'</pre></details>' : '')+
      '</div>';
  }
  var ingRows = function(list){
    return list.map(function(o){
      var x = o.x, i = o.i, done = ui.detail.ingDone[i];
      return '<div class="check-row '+(done?'done':'')+'" data-act="ing-toggle" data-i="'+i+'">'+
        '<span class="check-box">✓</span><span class="check-main">'+esc(x.n)+'</span>'+
        '<span class="check-side">'+esc(qtyText(x,ratio,f))+'</span></div>';
    }).join('');
  };
  var steps = (r.steps||[]).map(function(s,i){
    return '<li class="'+(ui.detail.stepDone[i]?'done':'')+'" data-act="step-toggle" data-i="'+i+'">'+
      '<span class="step-no">'+(i+1)+'</span><span class="step-txt">'+esc(s)+'</span></li>';
  }).join('');
  var cats = '<div class="section-title">分类</div><div class="cat-panel">'+
    '<div class="cat-line"><span>食材</span><div>'+((r.foods||[]).length ? r.foods.map(function(fp){ return '<span class="cat-pill">'+esc(fp.replace('/',' › '))+'</span>'; }).join('') : '<span class="hint tight">未标注</span>')+'</div></div>'+
    '<div class="cat-line"><span>做法</span><div>'+((r.methods||[]).length ? r.methods.map(function(m){ return '<span class="cat-pill alt">'+esc(m)+'</span>'; }).join('') : '<span class="hint tight">未标注</span>')+'</div></div></div>';
  var ntags = recipeNutritionTags(r);
  var nutriBlock = '<div class="section-title">营养亮点 <span class="note-count">按食材定性判断</span></div>'+
    (ntags.length
      ? '<div class="nutri-panel">'+ntags.map(function(t){
          return '<div class="nutri-chip n-'+t.key+'"><span class="nutri-ico">'+t.emoji+'</span>'+
            '<span class="nutri-name">'+esc(t.label)+'</span>'+
            '<span class="nutri-src">'+esc(t.foods.slice(0,3).join('、'))+'</span></div>';
        }).join('')+'</div>'
      : '<div class="hint tight" style="margin:-2px 0 6px">这道菜的主料暂未匹配到营养标签——不是所有食材都有对应条目，属正常情况。</div>');
  return '<div class="hero"><div class="emoji" style="background:'+c.bg+'">'+c.emoji+'</div>'+
      '<h2>'+esc(r.title)+'</h2><div class="meta">'+esc(r.minutes||'—')+' 分钟 · '+esc(methodText(r))+' · '+groups.main.length+' 种食材 / '+groups.se.length+' 种调味料</div>'+
      '<div class="tags">'+tags+'</div></div>'+
    '<div class="serv"><div class="lab">做几人份<small>食材用量会跟着变</small></div>'+
      '<div class="stepper"><button type="button" data-act="serv-minus">−</button>'+
      '<span class="n">'+ui.detail.servings+' 人份</span>'+
      '<button type="button" data-act="serv-plus">+</button></div></div>'+
    '<div class="portion-note"><span>1 人份 = 你的份量标准（'+esc(state.profile.height)+'cm / '+esc(state.profile.weight)+'kg · 系数 '+esc(fmt(f))+'）</span><button type="button" data-act="go-profile">调整 ›</button></div>'+
    cats+
    nutriBlock+
    cookBox+
    '<div class="section-title">食材 · '+groups.main.length+' 样 <button type="button" class="link" data-act="add-all">全部加入清单 ›</button></div>'+
    '<div class="panel">'+(groups.main.length ? ingRows(groups.main) : '<div class="check-row"><span class="check-main" style="color:var(--muted)">还没有标注食材</span></div>')+'</div>'+
    (groups.se.length ? '<div class="section-title sub">调味料 · '+groups.se.length+' 样 <span class="note-count">家里常备的可以跳过</span></div>'+
      '<div class="panel">'+ingRows(groups.se)+'</div>' : '')+
    '<div class="section-title">做法</div><div class="panel"><ol class="step-list">'+steps+'</ol></div>'+
    (r.note ? '<div class="section-title">小贴士</div><div class="note">'+esc(r.note)+'</div>' : '')+
    srcBlock+
    '<button type="button" class="btn ghost-danger" style="width:100%;margin-top:24px" data-act="del-recipe" data-id="'+esc(r.id)+'">删除这道食谱</button>';
}
function detailHTML(){
  var r = recipeById(ui.detail.id);
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">食谱详情</span>'+
      '<button type="button" data-act="fav" data-id="'+esc(r?r.id:'')+'">'+(r&&r.favorite?'♥':'♡')+'</button>'+
      '<button type="button" data-act="edit" data-id="'+esc(r?r.id:'')+'">编辑</button>'+
    '</div><div class="sheet-body">'+detailBodyHTML()+'</div>';
}
function rerenderDetail(){
  var b = document.querySelector('#sheet .sheet-body');
  if(!b) return;
  var top = b.scrollTop;
  b.innerHTML = detailBodyHTML();
  b.scrollTop = top;
  var f = document.querySelector('#sheet .sheet-top [data-act="fav"]');
  var r = recipeById(ui.detail.id);
  if(f && r) f.textContent = r.favorite?'♥':'♡';
}
function openDetail(id){
  var r = recipeById(id); if(!r) return;
  ui.cookHist = false;
  ui.detail = { id:id, servings:1, ingDone:{}, stepDone:{} };
  openSheet(detailHTML());
}

function ingRowHTML(x){
  x = x || {n:'',q:'',u:''};
  var t = ingType(x);
  return '<div class="ing-row" data-t="'+t+'" data-auto="'+(x.n?'0':'1')+'">'+
    '<input class="field n" placeholder="名称" value="'+esc(x.n)+'">'+
    '<input class="field q" placeholder="数量" inputmode="decimal" value="'+esc(x.q===null?'':x.q)+'">'+
    '<input class="field u" placeholder="单位" value="'+esc(x.u||'')+'">'+
    '<button type="button" class="ing-kind '+(t==='se'?'se':'')+'" data-act="form-ing-kind">'+(t==='se'?'调味':'食材')+'</button>'+
    '<button type="button" class="icon-del" data-act="form-ing-del" aria-label="删除">×</button></div>';
}
function setRowKind(row, t){
  row.setAttribute('data-t', t);
  var b = row.querySelector('.ing-kind');
  if(b){ b.textContent = t==='se'?'调味':'食材'; b.className = 'ing-kind '+(t==='se'?'se':''); }
}
function stepRowHTML(s){
  return '<div class="step-row"><textarea class="field" placeholder="这一步怎么做" rows="2">'+esc(s||'')+'</textarea>'+
    '<button type="button" class="icon-del" data-act="form-step-del" aria-label="删除">×</button></div>';
}
function hiddenArr(id){ return (document.getElementById(id).value||'').split(',').filter(Boolean); }
function setHidden(id, arr){ document.getElementById(id).value = arr.join(','); }
function drawFoodChips(){
  var arr = hiddenArr('f-foods');
  var box = document.getElementById('foodChips');
  if(!box) return;
  box.innerHTML = arr.length ? arr.map(function(v){
    return '<button type="button" class="pick-chip" data-act="form-food-del" data-v="'+esc(v)+'">'+esc(v.replace('/',' › '))+' ×</button>';
  }).join('') : '<span class="hint tight">还没选，在下面挑好点「添加」</span>';
}
function drawMethodChips(){
  var sel = hiddenArr('f-methods');
  var box = document.getElementById('methodChips');
  if(!box) return;
  box.innerHTML = methods().map(function(m){
    return '<button type="button" class="pick-chip '+(sel.indexOf(m)>-1?'on':'')+'" data-act="form-method-toggle" data-v="'+esc(m)+'">'+esc(m)+'</button>';
  }).join('');
}
function fillFood2(){
  var big = document.getElementById('f-food1').value;
  var g = foodGroup(big);
  document.getElementById('f-food2').innerHTML = '<option value="">不细分</option>' + g.items.map(function(it){
    return '<option value="'+esc(it)+'">'+esc(it)+'</option>';
  }).join('');
}
function formHTML(r){
  var isEdit = !!r;
  r = r || {title:'',minutes:'',baseServings:2,tags:[],note:'',foods:[],methods:[],ingredients:[{n:'',q:'',u:''}],steps:['']};
  var opts1 = foodTree().map(function(g){ return '<option value="'+esc(g.name)+'">'+esc(g.name)+'</option>'; }).join('');
  var opts2 = (foodTree()[0] ? foodTree()[0].items : []).map(function(it){ return '<option value="'+esc(it)+'">'+esc(it)+'</option>'; }).join('');
  var ings = (r.ingredients||[]).map(ingRowHTML).join('');
  var steps = (r.steps||[]).map(stepRowHTML).join('');
  var foodChips = (r.foods||[]).map(function(v){
    return '<button type="button" class="pick-chip" data-act="form-food-del" data-v="'+esc(v)+'">'+esc(v.replace('/',' › '))+' ×</button>';
  }).join('') || '<span class="hint tight">还没选，在下面挑好点「添加」</span>';
  var methodChips = methods().map(function(m){
    return '<button type="button" class="pick-chip '+((r.methods||[]).indexOf(m)>-1?'on':'')+'" data-act="form-method-toggle" data-v="'+esc(m)+'">'+esc(m)+'</button>';
  }).join('');
  return '<div class="sheet-top">'+
      '<button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
      '<span class="t">'+(isEdit?'编辑食谱':'新增食谱')+'</span>'+
      '<button type="button" data-act="form-save" data-id="'+esc(isEdit?r.id:'')+'">保存</button>'+
    '</div><div class="sheet-body">'+
      '<div class="form-group"><label>菜名</label><input class="field" id="f-title" placeholder="比如：番茄炒蛋" value="'+esc(r.title)+'"></div>'+
      '<div class="form-group field-row"><div><label>耗时（分钟）</label><input class="field" id="f-min" type="number" inputmode="numeric" min="0" value="'+esc(r.minutes)+'"></div>'+
        '<div><label>基准份数（标准成人）</label><input class="field" id="f-serv" type="number" inputmode="numeric" min="1" value="'+esc(r.baseServings||2)+'"></div></div>'+
      '<div class="form-group"><label>食材分类（可多选，选到细分）</label>'+
        '<div class="pick-chips" id="foodChips">'+foodChips+'</div>'+
        '<div class="field-row" style="margin-bottom:6px"><select class="field" id="f-food1">'+opts1+'</select>'+
        '<select class="field" id="f-food2"><option value="">不细分</option>'+opts2+'</select></div>'+
        '<button type="button" class="mini-add" data-act="form-food-add">+ 添加这个分类</button>'+
        '<input type="hidden" id="f-foods" value="'+esc((r.foods||[]).join(','))+'"></div>'+
      '<div class="form-group"><label>制作方式（可多选）</label>'+
        '<div class="pick-chips" id="methodChips">'+methodChips+'</div>'+
        '<input type="hidden" id="f-methods" value="'+esc((r.methods||[]).join(','))+'"></div>'+
      '<div class="form-group"><label>自由标签（用逗号分开，选填）</label><input class="field" id="f-tags" placeholder="快手, 下饭" value="'+esc((r.tags||[]).join(', '))+'"></div>'+
      '<div class="form-group"><label>食材与调味料 <span style="font-weight:400">· 数量留空表示「适量」</span></label><div id="ingRows">'+ings+'</div>'+
        '<button type="button" class="mini-add" data-act="form-ing-add">+ 添加一行</button>'+
        '<div class="hint tight">右侧按钮切换「食材 / 调味」；葱姜蒜、油盐酱醋会自动归到调味料。</div></div>'+
      '<div class="form-group"><label>做法步骤</label><div id="stepRows">'+steps+'</div>'+
        '<button type="button" class="mini-add" data-act="form-step-add">+ 添加一步</button></div>'+
      '<div class="form-group"><label>小贴士（选填）</label><textarea class="field" id="f-note" placeholder="火候、替换食材、保存方法…">'+esc(r.note||'')+'</textarea></div>'+
      '<button type="button" class="btn-block" data-act="form-save" data-id="'+esc(isEdit?r.id:'')+'">保存食谱</button>'+
      '<div class="hint">填写的是标准成人份用量，实际做几人份时会在详情里按你的份量标准换算。</div>'+
    '</div>';
}
function openForm(id){ openSheet(formHTML(id?recipeById(id):null)); }
function collectForm(id){
  var title = (document.getElementById('f-title').value||'').trim();
  if(!title){ toast('先给这道菜起个名字'); document.getElementById('f-title').focus(); return; }
  var ingredients = [];
  var rows = document.querySelectorAll('#ingRows .ing-row');
  for(var i=0;i<rows.length;i++){
    var n = rows[i].querySelector('.n').value.trim();
    var q = rows[i].querySelector('.q').value.trim();
    var u = rows[i].querySelector('.u').value.trim();
    if(n) ingredients.push({ n:n, q:q===''?null:Number(q), u:u, t:rows[i].getAttribute('data-t')==='se'?'se':'main' });
  }
  var steps = [];
  var srows = document.querySelectorAll('#stepRows .step-row textarea');
  for(var j=0;j<srows.length;j++){ var s = srows[j].value.trim(); if(s) steps.push(s); }
  if(!ingredients.length && !steps.length){ toast('至少填一样食材或一步做法'); return; }
  var tags = (document.getElementById('f-tags').value||'').split(/[,，]/).map(function(t){return t.trim();}).filter(Boolean);
  var data = {
    title:title,
    minutes:Number(document.getElementById('f-min').value)||0,
    baseServings:Math.max(1, Number(document.getElementById('f-serv').value)||2),
    foods:hiddenArr('f-foods'),
    methods:hiddenArr('f-methods'),
    tags:tags,
    note:(document.getElementById('f-note').value||'').trim(),
    ingredients:ingredients,
    steps:steps
  };
  if(id){
    var r = recipeById(id);
    if(r){ for(var k in data) r[k]=data[k]; }
    rebuildAllLogs();
    toast('已更新「'+title+'」');
  }else{
    data.id = uid(); data.favorite = false; data.createdAt = Date.now();
    state.recipes.unshift(data);
    toast('已收好「'+title+'」');
  }
  save(); closeSheet(); render();
}
function rebuildAllLogs(){ Object.keys(state.log).forEach(rebuildLogItems); }

function addToList(r, servings){
  var ratio = servings / (r.baseServings||2);
  var f = profileFactor();
  (r.ingredients||[]).forEach(function(ing){
    var q = scaleForIng(ing, ratio, f);
    var found = null;
    for(var i=0;i<state.checklist.length;i++){
      var x = state.checklist[i];
      if(!x.done && !x.logKey && x.recipeId===r.id && x.name===ing.n && x.u===(ing.u||'')){ found=x; break; }
    }
    if(found){
      if(found.q!==null && q!==null) found.q = friendlySum(found.q, q);
    }else{
      state.checklist.push({ id:uid(), name:ing.n, q:q, u:ing.u||'', t:ingType(ing), recipeId:r.id, recipeTitle:r.title, done:false });
    }
  });
  save();
  toast('已按 '+servings+' 人份加入清单');
}
/* ================= v14 GitHub 云同步 =================
   业务数据 state -> localStorage(recipe-box-v1)
   云配置 cloud   -> localStorage(recipe-box-cloud-v1)  独立存放
   Token 绝不进入 state / 导出备份 / 云端 envelope / 分享链接
   云端 envelope: {app,version,updatedAt,device,data:snapshot()}
   只读分享: 当前页面 URL + #view=<secret gist 的 raw 地址>
======================================================== */
function defaultCloud(){
  return { token:'', gistId:'', owner:'', auto:false, lastSyncAt:'', lastRev:'', dirty:false, device:'' };
}
function loadCloud(){
  try{
    var raw = localStorage.getItem(CKEY);
    if(raw){
      var c = JSON.parse(raw), d = defaultCloud();
      if(c && typeof c==='object') Object.keys(d).forEach(function(k){ if(c[k]!==undefined) d[k]=c[k]; });
      return d;
    }
  }catch(e){}
  return defaultCloud();
}
function saveCloud(){ try{ localStorage.setItem(CKEY, JSON.stringify(cloud)); }catch(e){} }
function cloudReady(){ return !!(cloud && cloud.token && cloud.gistId); }
function cloudDevice(){
  if(cloud.device) return cloud.device;
  var ua = navigator.userAgent || '';
  cloud.device = /iPhone|iPad/.test(ua) ? 'iPhone / iPad' :
                 /Android/.test(ua) ? 'Android 手机' :
                 /Mac/.test(ua) ? 'Mac 电脑' :
                 /Windows/.test(ua) ? 'Windows 电脑' : '一台设备';
  saveCloud(); return cloud.device;
}
function markDirty(){
  if(!booted || !cloudReady()) return;
  cloud.dirty = true; saveCloud();
  if(cloud.auto){ clearTimeout(cloudTimer); cloudTimer = setTimeout(function(){ cloudSync('auto', true); }, 2500); }
}
function snapshot(){
  return { recipes:state.recipes, checklist:state.checklist, log:state.log, profile:state.profile,
           categories:state.categories, places:state.places, placeConfig:state.placeConfig };
}
function envelope(){
  return { app:'食谱盒子', version:9, updatedAt:new Date().toISOString(), device:cloudDevice(), data:snapshot() };
}
function applySnapshot(d){
  if(!d || !Array.isArray(d.recipes)) throw new Error('bad snapshot');
  state.recipes = d.recipes.map(function(r){ if(!r.id) r.id=uid(); if(!r.createdAt) r.createdAt=Date.now(); return r; });
  state.checklist = Array.isArray(d.checklist) ? d.checklist : [];
  state.log = (d.log && typeof d.log==='object') ? d.log : {};
  state.profile = (d.profile && typeof d.profile==='object') ? d.profile : {height:163,weight:45,factor:calcFactor(163,45,30)};
  state.categories = (d.categories && typeof d.categories==='object') ? d.categories : null;
  state.places = Array.isArray(d.places) ? d.places : [];
  state.placeConfig = (d.placeConfig && typeof d.placeConfig==='object') ? d.placeConfig : null;
  var was = booted; booted = false;
  migrate(); catState(); save();
  booted = was;
}
function ghHeaders(){
  return { 'Accept':'application/vnd.github+json', 'Authorization':'Bearer '+cloud.token,
           'Content-Type':'application/json', 'X-GitHub-Api-Version':'2022-11-28' };
}
function ghFetch(url, opt){
  return fetch(url, opt).then(function(res){
    if(!res.ok){ var e = new Error('HTTP '+res.status); e.status = res.status; throw e; }
    return res.json();
  });
}
function ghErr(e){
  if(e && e.message==='nofile') return '云端 Gist 里还没有数据文件，先点「↑ 上传」';
  if(e && (e.status===401 || e.status===403)) return 'GitHub 拒绝访问：Token 无效、过期，或没勾 Gist 权限';
  if(e && e.status===404) return '找不到这个 Gist，检查 Gist ID 或重新建一个';
  if(e && e.status===422) return 'GitHub 存不下（图片太多导致数据过大）';
  return '连不上 GitHub，检查网络后重试';
}
function cloudGetRemote(){
  return ghFetch(GH_API+'/gists/'+encodeURIComponent(cloud.gistId), { headers:ghHeaders() }).then(function(g){
    var f = g && g.files && g.files[CFN];
    if(!f){ var nf = new Error('nofile'); throw nf; }
    var owner = (g.owner && g.owner.login) || cloud.owner || '';
    if(owner && owner!==cloud.owner){ cloud.owner = owner; saveCloud(); }
    var raw = f.raw_url || cloudRawUrl();
    return fetch(raw).then(function(r){
      if(!r.ok){ var e = new Error('HTTP '+r.status); e.status=r.status; throw e; }
      return r.json();
    }).catch(function(e){
      if(typeof f.content==='string' && f.content.length) return JSON.parse(f.content);
      throw e;
    });
  });
}
function cloudPut(env){
  var body = { description:'食谱盒子 · 个人数据（自动生成，请勿手动编辑）', files:{} };
  body.files[CFN] = { content: JSON.stringify(env, null, 2) };
  return ghFetch(GH_API+'/gists/'+encodeURIComponent(cloud.gistId), {
    method:'PATCH', headers:ghHeaders(), body:JSON.stringify(body)
  }).then(function(){
    cloud.lastSyncAt = new Date().toISOString();
    cloud.lastRev = env.updatedAt;
    cloud.dirty = false;
    saveCloud();
    return env;
  });
}
function cloudCreate(){
  var env = envelope(), body = { description:'食谱盒子 · 个人数据（Secret Gist）', public:false, files:{} };
  body.files[CFN] = { content: JSON.stringify(env, null, 2) };
  return ghFetch(GH_API+'/gists', { method:'POST', headers:ghHeaders(), body:JSON.stringify(body) }).then(function(g){
    if(!g || !g.id) throw new Error('no id');
    cloud.gistId = g.id;
    cloud.owner = (g.owner && g.owner.login) || '';
    cloud.lastSyncAt = new Date().toISOString();
    cloud.lastRev = env.updatedAt;
    cloud.dirty = false;
    saveCloud();
    return g;
  });
}
function cloudConnect(){
  var tEl = document.getElementById('cf-token'), gEl = document.getElementById('cf-gist');
  var t = ((tEl && tEl.value) || '').trim(), g = ((gEl && gEl.value) || '').trim();
  if(!t){ toast('先粘贴 GitHub Token'); return; }
  if(cloudBusy) return;
  cloud.token = t; cloud.owner = '';
  cloud.gistId = g ? g.replace(/^https?:\/\/gist\.github\.com\/[^/]+\//,'').replace(/\/.*$/,'').trim() : '';
  saveCloud();
  cloudBusy = true; toast('正在连接 GitHub…');
  var p = cloud.gistId
    ? ghFetch(GH_API+'/gists/'+encodeURIComponent(cloud.gistId), { headers:ghHeaders() }).then(function(gh){
        cloud.owner = (gh.owner && gh.owner.login) || ''; saveCloud(); return null;
      })
    : cloudCreate();
  p.then(function(){
    cloudBusy = false;
    closeSheet(); render();
    toast(cloud.auto ? '已连接，自动同步已开启' : '已连接 GitHub');
    if(!cloud.lastRev && confirm('连接成功。要用云端数据覆盖这台设备现有的 '+state.recipes.length+' 道菜吗？\n\n第一次在新手机 / 电脑上配置选「确定」；这台设备已有不想丢的数据就选「取消」，再点「↑ 上传」。')){
      cloudSync('down', true);
    }
  }).catch(function(e){ cloudBusy = false; toast(ghErr(e)); });
}
function cloudDisconnect(){
  if(!confirm('解除连接？本机保存的 Token 和 Gist ID 会清掉，食谱和餐厅数据保留；GitHub 上的 Gist 不会被删除。')) return;
  cloud = defaultCloud(); saveCloud(); closeSheet(); render(); toast('已解除连接');
}
function cloudSync(mode, silent){
  if(!cloudReady()){ toast('先在「云同步」里填 Token 并连接'); return; }
  if(cloudBusy) return;
  cloudBusy = true;
  if(!silent) toast('正在同步…');
  var fail = function(e){ cloudBusy = false; toast(ghErr(e)); };
  if(mode==='force'){
    return cloudPut(envelope()).then(function(){
      cloudBusy = false; render(); toast('已用这台设备覆盖云端'); return true;
    }).catch(fail);
  }
  return cloudGetRemote().then(function(remote){
    var rev = (remote && remote.updatedAt) ? String(remote.updatedAt) : '';
    var d = (remote && remote.data && Array.isArray(remote.data.recipes)) ? remote.data :
            (remote && Array.isArray(remote.recipes) ? remote : null);
    var remoteChanged = !!rev && rev !== cloud.lastRev;
    var localChanged = !!cloud.dirty;

    if(mode==='down'){
      if(!d) throw new Error('nofile');
      if(localChanged && !silent && !confirm('本地还有未上传的改动，下载会覆盖它们。确定继续吗？')){ cloudBusy = false; return false; }
      applySnapshot(d);
      cloud.lastSyncAt = new Date().toISOString(); cloud.lastRev = rev || cloud.lastRev;
      cloud.dirty = false; saveCloud();
      render(); toast('已下载：'+state.recipes.length+' 道菜 / '+state.places.length+' 家餐厅');
      cloudBusy = false; return true;
    }
    if(remoteChanged && localChanged){
      if(silent){ cloudBusy = false; toast('两端都改过，去「云同步」点智能同步选一下'); return false; }
      cloudPending = { remote:d, rev:rev };
      cloudBusy = false; openSheet(cloudConflictHTML(remote, rev)); return false;
    }
    if(remoteChanged && !localChanged && d){
      applySnapshot(d); cloud.lastRev = rev; cloud.dirty = false; saveCloud(); render();
      cloudBusy = false; toast(mode==='up' ? '云端有更新，已先取回最新数据' : '已同步云端最新数据'); return true;
    }
    if(mode==='auto' && !remoteChanged && !localChanged){
      cloudBusy = false; if(!silent) toast('已经是最新的了'); return true;
    }
    return cloudPut(envelope()).then(function(){
      cloudBusy = false; render(); if(!silent) toast('已上传到 GitHub'); return true;
    });
  }).catch(fail);
}
function cloudConflictHTML(remote, rev){
  var rd = (remote && remote.data) || {}, n = (rd.recipes||[]).length, np = (rd.places||[]).length;
  var when = fmtStamp(rev) || '未知时间';
  var last = fmtStamp(cloud.lastSyncAt) || '从未同步';
  var top = '<div class="sheet-top"><button type="button" class="back" data-act="cloud-conflict-cancel" aria-label="返回">‹</button>'+
            '<span class="t">两边都改过了</span><span style="min-width:44px"></span></div>';
  return top + '<div class="sheet-body">'+
    '<div class="note">上次同步之后，云端和这台设备都改过。先选一个方向，避免把记录覆盖掉。</div>'+
    '<div class="cloud-compare">'+
      '<div class="cloud-cmp"><b>☁ 云端</b><span>'+n+' 道菜 / '+np+' 家餐厅</span><small>更新于 '+esc(when)+'<br>'+esc((remote && remote.device) || '另一台设备')+'</small></div>'+
      '<div class="cloud-cmp"><b>📱 这台设备</b><span>'+state.recipes.length+' 道菜 / '+state.places.length+' 家餐厅</span><small>上次同步 '+esc(last)+'<br>'+esc(cloudDevice())+'</small></div>'+
    '</div>'+
    '<button type="button" class="btn-block" data-act="cloud-resolve" data-v="remote">用云端覆盖这台设备</button>'+
    '<button type="button" class="btn" style="width:100%;margin-top:10px" data-act="cloud-resolve" data-v="local">用这台设备覆盖云端</button>'+
    '<div class="hint">拿不准就先两边各导出一份 JSON 备份再选。选错了可以再用备份导入找回。</div>'+
  '</div>';
}
function cloudResolve(v){
  var p = cloudPending; cloudPending = null;
  if(v==='cancel'){ closeSheet(); toast('已取消，数据没有改动'); return; }
  if(!p){ closeSheet(); return; }
  if(v==='remote'){
    try{ applySnapshot(p.remote); }catch(e){ toast('云端数据读不出来'); return; }
    cloud.lastRev = p.rev || cloud.lastRev; cloud.dirty = false; saveCloud();
    closeSheet(); render(); toast('已用云端数据覆盖本地'); return;
  }
  closeSheet(); cloudSync('force', true);
}
function cloudRawUrl(){
  return 'https://gist.githubusercontent.com/'+(cloud.owner || 'raw')+'/'+encodeURIComponent(cloud.gistId)+'/raw/'+CFN;
}
function cloudShareLink(){
  return location.href.split('#')[0] + '#view=' + encodeURIComponent(cloudRawUrl());
}
function cloudSetupHTML(){
  var top = '<div class="sheet-top"><button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
            '<span class="t">GitHub 云同步设置</span><span style="min-width:44px"></span></div>';
  return top + '<div class="sheet-body">'+
    '<div class="note">把食谱、清单、饮食记录、餐厅都存在你自己 GitHub 账号的 <b>Secret Gist</b> 里。电脑、手机、在线版、离线版填同一份配置，就能读写同一份数据。</div>'+
    '<div class="section-title">① GitHub Token</div>'+
    '<input class="field mono" id="cf-token" type="password" autocomplete="off" spellcheck="false" placeholder="ghp_… 或 github_pat_…" value="'+esc(cloud.token)+'">'+
    '<label class="cloud-check"><input type="checkbox" id="cf-show"> 显示 Token</label>'+
    '<div class="hint">GitHub → Settings → Developer settings → Personal access tokens → <b>Tokens (classic)</b> → Generate new token，只勾 <b>gist</b> 一项即可。Token 只保存在这台设备的浏览器里，不会写进导出文件，也不会出现在分享链接里。</div>'+
    '<div class="section-title">② Gist ID（换设备时填）</div>'+
    '<input class="field mono" id="cf-gist" autocomplete="off" spellcheck="false" placeholder="留空 = 用这台设备的数据新建私有 Gist" value="'+esc(cloud.gistId)+'">'+
    (cloud.gistId ? '<div class="cloud-id">当前 Gist ID：<b>'+esc(cloud.gistId)+'</b><button type="button" data-act="cloud-copy-id">复制</button></div>' : '')+
    '<button type="button" class="btn-block" data-act="cloud-connect">'+(cloud.gistId ? '保存并连接' : '创建私有 Gist 并连接')+'</button>'+
    (cloudReady() ? '<button type="button" class="btn ghost-danger" style="width:100%;margin-top:10px" data-act="cloud-disconnect">解除连接（只清本机配置，不删云端）</button>' : '')+
    '<div class="section-title">其他设备怎么接</div>'+
    '<div class="note">1. 手机打开同一个在线链接 →「我的 → 云同步」<br>2. 粘贴同一个 Token 和上面的 Gist ID →「保存并连接」<br>3. 连接时选「用云端覆盖这台设备」，或点「↓ 下载」<br>4. 两端都打开「自动同步」，之后改动就会互相追上</div>'+
    '<div class="hint">离线单文件版也能云同步（联网时可用），但要先从在线版拿到完整链接；单文件版生成的分享链接别人打不开。</div>'+
  '</div>';
}
function cloudShareHTML(){
  var link = cloudShareLink();
  var warn = location.protocol==='file:'
    ? '<div class="note" style="margin-top:12px;color:var(--danger)">你现在打开的是离线单文件版，这个链接别人打不开。请从在线版里进入本页面再复制。</div>' : '';
  var top = '<div class="sheet-top"><button type="button" class="back" data-act="back" aria-label="返回">‹</button>'+
            '<span class="t">只读分享给朋友</span><span style="min-width:44px"></span></div>';
  return top + '<div class="sheet-body">'+
    '<div class="note">这个链接是<b>只读</b>的：朋友打开能看到你的食谱和餐厅，但改不了你的数据，也不需要你的 GitHub Token。页面底部有「存成我的副本」，朋友可以一键复制一份到自己设备里，之后各存各的。</div>'+
    warn+
    '<div class="section-title">分享链接</div>'+
    '<textarea class="field mono" id="shareLink" rows="4" readonly>'+esc(link)+'</textarea>'+
    '<button type="button" class="btn-block" data-act="cloud-copy-link">复制分享链接</button>'+
    '<div class="hint">链接里带的是 Secret Gist 的只读地址：拿到链接的人都能看到内容，别发到公开的地方。你之后上传新内容，朋友刷新页面就能看到最新的。想停止分享，去 GitHub 删除这个 Gist，或在设置里新建一个。</div>'+
    '<div class="hint">朋友打开时如果链接打不开，让他先能正常打开这个在线应用，再把链接完整发给他（不要漏掉 <b>#view=</b> 后面那一串）。</div>'+
  '</div>';
}
function copyText(t){
  var ok = function(){ toast('已复制'); };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(ok, function(){ legacyCopyText(t, ok); });
  }else legacyCopyText(t, ok);
}
function legacyCopyText(t, ok){
  var ta = document.createElement('textarea');
  ta.value = t; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  var done = false; try{ done = document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
  if(done) ok(); else toast('复制失败，请长按上面的内容手动复制');
}

/* ---------- 只读分享浏览页 ---------- */
function boot(){
  booted = true;
  var m = /(?:^#|&)view=([^&]+)/.exec(location.hash || '');
  if(m){
    var raw; try{ raw = decodeURIComponent(m[1]); }catch(e){ raw = m[1]; }
    enterShare(raw);
  }else{
    render();
    if(cloudReady() && cloud.auto) cloudSync('auto', true);
  }
}
function enterShare(raw){
  ui.share = { loading:true, raw:raw, data:null, error:'', device:'', updatedAt:'' };
  render();
  fetch(raw).then(function(r){
    if(!r.ok){ var e = new Error('HTTP '+r.status); e.status=r.status; throw e; }
    return r.json();
  }).then(function(j){
    var d = (j && j.data && Array.isArray(j.data.recipes)) ? j.data : (j && Array.isArray(j.recipes) ? j : null);
    if(!d) throw new Error('bad');
    ui.share = { loading:false, raw:raw, data:d, error:'', device:j.device||'', updatedAt:j.updatedAt||'' };
    render();
  }).catch(function(){
    ui.share = { loading:false, raw:raw, data:null,
      error:'链接里的内容暂时读不出来。可能是网络问题，或对方已经删除 / 重建了这份分享。', device:'', updatedAt:'' };
    render();
  });
}
function shareIngLine(list){
  return (list||[]).map(function(x){
    return esc(x.n || x.name) + (x.q!==null && x.q!==undefined && x.q!=='' ? ' '+esc(fmt(x.q))+esc(x.u||'') : ' 适量');
  }).join('、') || '—';
}
function shareHTML(){
  var s = ui.share;
  if(s.loading) return '<div class="share-empty"><div class="emoji">⏳</div><p>正在读取分享内容…</p></div>';
  if(s.error) return '<div class="share-empty"><div class="emoji">🔗</div><p>'+esc(s.error)+'</p>'+
    '<button type="button" class="btn" style="max-width:220px;margin:18px auto 0" data-act="share-back">返回我的食谱盒子</button></div>';
  var d = s.data, rs = d.recipes||[], ps = d.places||[];
  var when = fmtStamp(s.updatedAt);
  var hero = '<div class="share-hero"><div class="emoji">🎁</div><h2>食谱盒子</h2>'+
    '<div class="sub">来自 '+esc(s.device||'朋友')+' 的分享'+(when?' · 更新于 '+esc(when):'')+'</div>'+
    '<div class="sub">'+rs.length+' 道菜 · '+ps.length+' 家餐厅</div>'+
    '<span class="share-badge">只读浏览</span></div>';
  var rhtml = rs.map(function(r){
    var g = splitIngs(r);
    var body = '<div class="share-line"><b>食材</b><span>'+shareIngLine(g.main.map(function(o){return o.x;}))+'</span></div>'+
      '<div class="share-line"><b>调味料</b><span>'+shareIngLine(g.se.map(function(o){return o.x;}))+'</span></div>'+
      '<div class="share-line"><b>做法</b><span>'+esc(methodText(r))+' · '+esc(r.minutes||'—')+' 分钟</span></div>'+
      ((r.steps||[]).length ? '<ol class="share-steps">'+r.steps.map(function(st){ return '<li>'+esc(st)+'</li>'; }).join('')+'</ol>' : '')+
      (r.note ? '<div class="hint">小记：'+esc(r.note)+'</div>' : '')+
      ((r.foods||[]).length ? '<div class="hint">分类：'+esc(r.foods.join(' / ').replace(/\//g,' › '))+'</div>' : '');
    return '<details class="share-item"><summary><span>'+esc(iconFor(r).emoji)+'</span>'+esc(r.title)+'</summary>'+
      '<div class="share-body">'+body+'</div></details>';
  }).join('') || '<div class="hint">这份分享里还没有菜谱。</div>';
  var phtml = ps.map(function(p){
    var sc = Object.keys(p.scores||{}).filter(function(k){ return Number(p.scores[k])>0; })
      .map(function(k){ return esc(k)+' '+esc(p.scores[k])+'★'; }).join(' · ');
    var imgs = p.images||[];
    return '<details class="share-item"><summary><span>'+esc(p.ph||'🍽️')+'</span>'+esc(p.name)+
      '<span class="share-badge">'+(p.status==='want'?'想去':'吃过')+'</span></summary>'+
      '<div class="share-body">'+
        (p.area||p.price ? '<div class="share-line"><b>位置</b><span>'+esc(p.area||'')+(p.price?' · 人均 '+esc(p.price):'')+'</span></div>' : '')+
        (sc ? '<div class="share-line"><b>评分</b><span>'+sc+'</span></div>' : '')+
        ((p.tags||[]).length ? '<div class="share-line"><b>标签</b><span>'+esc(p.tags.join('、'))+'</span></div>' : '')+
        (p.review ? '<div class="share-line"><b>评语</b><span>'+esc(p.review)+'</span></div>' : '')+
        (p.link ? '<div class="share-line"><b>链接</b><span>'+esc(p.link)+'</span></div>' : '')+
        (imgs[0] ? '<img class="share-photo" src="'+esc(imgs[0].data)+'" alt="'+esc(p.name)+'">' : '')+
      '</div></details>';
  }).join('') || '<div class="hint">这份分享里还没有餐厅。</div>';
  return hero+
    '<div class="section-title">食谱 <span class="share-count">'+rs.length+'</span></div>'+rhtml+
    '<div class="section-title">好吃餐厅 <span class="share-count">'+ps.length+'</span></div>'+phtml+
    '<div class="share-actions">'+
      '<button type="button" class="btn-block" data-act="share-copy">＋ 存成我的副本</button>'+
      '<button type="button" class="btn" data-act="share-back">返回我的食谱盒子</button>'+
      '<div class="hint">存副本会覆盖这台设备现有的食谱和餐厅，之后就是你自己独立的一份，不会连接到对方的云，也改不了对方的数据。</div>'+
    '</div>';
}
function shareLeave(){
  ui.share = null;
  try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){ location.hash = ''; }
  render();
  if(cloudReady() && cloud.auto) cloudSync('auto', true);
}

function exportData(){
  var blob = new Blob([JSON.stringify({app:'食谱盒子',version:9,exportedAt:new Date().toISOString(),data:snapshot()},null,2)],{type:'application/json'});  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = '食谱盒子-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  toast('备份已下载');
}
function importData(file){
  var reader = new FileReader();
  reader.onload = function(){
    try{
      var j = JSON.parse(reader.result);
      var d = (j && j.data && Array.isArray(j.data.recipes)) ? j.data : j;
      if(!d || !Array.isArray(d.recipes)) throw new Error('bad');
      if(!confirm('导入会覆盖当前的 '+state.recipes.length+' 道食谱、清单和记录，确定继续吗？')) return;
      applySnapshot(d); markDirty(); render();
      toast('已导入 '+state.recipes.length+' 道食谱、'+state.places.length+' 家餐厅');
    }catch(e){ toast('文件读不出来，请选之前导出的 JSON'); }
  };
  reader.readAsText(file);
}

document.addEventListener('click', function(e){
  var el = e.target.closest('[data-act]');
  if(!el) return;
  var act = el.getAttribute('data-act');
  var id = el.getAttribute('data-id');
  var idx = el.getAttribute('data-i');
  var v = el.getAttribute('data-v');

  if(act==='tab'){ ui.tab = el.getAttribute('data-tab'); window.scrollTo(0,0); render(); return; }
  /* ---- v12 好吃餐厅 ---- */
  if(act==='rec-sub'){ ui.recSub = v; if(v==='places') ui.placeRandom={}; window.scrollTo(0,0); render(); return; }
  if(act==='nutri-week'){ var nw=Number(v); ui.nutriWeek = nw===0 ? todayKey() : shiftWeek(ui.nutriWeek||todayKey(), nw); render(); return; }
  if(act==='kb-tab'){ ui.kbKey=v; render(); window.scrollTo(0,0); return; }
  if(act==='place-open'){ openPlaceDetail(id); return; }
  if(act==='place-add'){ openPlaceForm(null); return; }
  if(act==='place-edit'){ openPlaceForm(id); return; }
  if(act==='place-save'){ savePlace(id); return; }
  if(act==='place-del'){ deletePlace(id); return; }
  if(act==='place-status-f'){ ui.placeStatus=v; render(); return; }
  if(act==='place-tag-f'){ ui.placeTag=v; render(); return; }
  if(act==='place-form-status'){ syncPlaceForm(); if(ui.placeForm){ ui.placeForm.status=v; openSheet(placeFormHTML()); } return; }
  if(act==='place-star'){ placeSetScore(el.getAttribute('data-dim'), Number(v)); return; }
  if(act==='place-tag-toggle'){ placeToggleTag(v); return; }
  if(act==='place-tag-new'){ placeAddTag(); return; }
  if(act==='place-img-pick'){ pickPlaceImages(); return; }
  if(act==='place-img-del'){
    syncPlaceForm();
    if(ui.placeForm && Array.isArray(ui.placeForm.images)){
      var gone = ui.placeForm.images.splice(Number(idx),1)[0];
      if(gone && gone.id===ui.placeForm.coverId){ ui.placeForm.coverId=''; ui.placeForm.coverMode='first'; }
    }
    openSheet(placeFormHTML()); return;
  }
  if(act==='place-cover-mode'){ syncPlaceForm(); if(ui.placeForm){ ui.placeForm.coverMode=v; openSheet(placeFormHTML()); } return; }
  if(act==='place-cover-pick'){
    syncPlaceForm();
    if(ui.placeForm){
      var cim=(ui.placeForm.images||[])[Number(idx)];
      if(cim){ ui.placeForm.coverMode='pick'; ui.placeForm.coverId=cim.id; }
      openSheet(placeFormHTML());
    }
    return;
  }
  if(act==='place-ph'){ syncPlaceForm(); if(ui.placeForm){ ui.placeForm.ph=v; openSheet(placeFormHTML()); } return; }
  if(act==='place-reroll'){
    if(!ui.placeRandom) ui.placeRandom={};
    var rp=placeById(id), n=rp?(rp.images||[]).length:0;
    if(n>1){
      var old=ui.placeRandom[id], k=Math.floor(Math.random()*(n-1));
      if(typeof old==='number' && k>=old) k++;
      ui.placeRandom[id]=k;
      updatePlaceList();
    }
    return;
  }
  if(act==='place-img-open'){ var pp=placeById(id); if(pp && (pp.images||[])[Number(idx)]) openLightbox(pp.images, Number(idx)); return; }
  if(act==='place-config'){ if(document.getElementById('pf-name')) syncPlaceForm(); else ui.placeForm=null; ui.pcfgTab='tag'; openSheet(placeConfigSheetHTML()); return; }
  if(act==='pcfg-tab'){ ui.pcfgTab=v; openSheet(placeConfigSheetHTML()); return; }
  if(act==='pcfg-add'){ pcfgAdd(); return; }
  if(act==='pcfg-del'){ pcfgDel(Number(idx)); return; }

  if(act==='add'){ openForm(null); return; }
  if(act==='import-open'){ ui.imp={raw:'',url:'',platform:'',title:'',ings:'',steps:'',note:'',ai:'',images:[],parseInfo:null,batch:null,batchOnly:false}; openSheet(impSheetHTML()); return; }
  if(act==='batch-open'){ ui.imp={raw:'',url:'',platform:'',title:'',ings:'',steps:'',note:'',ai:'',images:[],parseInfo:null,batch:null,batchOnly:true}; openSheet(batchSheetHTML()); return; }
  if(act==='batch-file'){
    syncImp();
    var bf=document.createElement('input');
    bf.type='file'; bf.accept='application/json,.json,.txt,text/plain';
    bf.onchange=function(){
      var f=bf.files && bf.files[0]; if(!f || !ui.imp || !ui.imp.batchOnly) return;
      var br=new FileReader();
      br.onload=function(){
        if(!ui.imp || !ui.imp.batchOnly) return;
        var t=String(br.result||''), ta=document.getElementById('impAI');
        if(ta) ta.value=t;
        ui.imp.ai=t;
        impApplyAI();
      };
      br.readAsText(f);
    };
    bf.click(); return;
  }
  if(act==='imp-parse'){
    syncImp();
    var pd = parseImport(ui.imp.raw, ui.imp.url);
    ui.imp.title=pd.title; ui.imp.ings=pd.ings; ui.imp.steps=pd.steps; ui.imp.note=pd.note;
    ui.imp.url=pd.url; ui.imp.platform=pd.platform;
    ui.imp.parseInfo = {
      nIng:pd.nIng, nStep:pd.nStep, onlyLink:pd.onlyLink,
      text: pd.warn || ('已整理出 '+pd.nIng+' 样食材、'+pd.nStep+' 个步骤，下面可以直接改')
    };
    openSheet(impSheetHTML());
    toast(pd.found ? '整理好了，检查一下再保存' : '没读到正文，看上方提示');
    return;
  }
  if(act==='imp-pick-img'){ syncImp(); document.getElementById('imageFile').click(); return; }
  if(act==='imp-img-del'){ syncImp(); ui.imp.images.splice(Number(idx),1); openSheet(impSheetHTML()); return; }
  if(act==='imp-copy-prompt'){ impCopyPrompt(); return; }
  if(act==='imp-apply-ai'){ impApplyAI(); return; }
  if(act==='imp-save'){ saveImport(); return; }
  if(act==='batch-save'){ batchSave(); return; }
  if(act==='batch-clear'){ syncImp(); ui.imp.batch=null; ui.imp.parseInfo=null; openSheet(ui.imp.batchOnly?batchSheetHTML():impSheetHTML()); return; }
  if(act==='img-open'){
    var ir = recipeById(id);
    if(ir && (ir.images||[])[Number(idx)]) openLightbox(ir.images, Number(idx));
    return;
  }
  if(act==='lb-close'){ closeLightbox(); return; }
  if(act==='lb-nav'){ lbNav(Number(v)); return; }
  if(act==='cook-plus'){ cookOnce(); return; }
  if(act==='cook-today'){ cookToday(); return; }
  if(act==='cook-undo'){ cookUndo(id || (ui.detail && ui.detail.id)); return; }
  if(act==='cook-del'){ cookUndo(id || (ui.detail && ui.detail.id), Number(idx)); return; }
  if(act==='cook-hist'){ ui.cookHist=!ui.cookHist; rerenderDetail(); return; }
  if(act==='cat-manage'){ ui.catTab='food'; openSheet(catSheetHTML()); return; }
  if(act==='cat-tab'){ ui.catTab=v; openSheet(catSheetHTML()); return; }
  if(act==='cat-add'){ catAdd(v); return; }
  if(act==='cat-del'){ catDelete(v); return; }
  if(act==='cat-reset'){ catReset(); return; }
  if(act==='back'){ closeSheet(); return; }
  if(act==='open'){ openDetail(id); return; }
  if(act==='edit'){ openForm(id); return; }
  if(act==='go-profile'){ closeSheet(); ui.tab='me'; window.scrollTo(0,0); render(); return; }
  if(act==='fav'){
    var r = recipeById(id); if(!r) return;
    r.favorite = !r.favorite; save(); render();
    if(ui.detail && ui.detail.id===id){ var fv=document.querySelector('#sheet .sheet-top [data-act="fav"]'); if(fv) fv.textContent=r.favorite?'♥':'♡'; }
    toast(r.favorite?'已收藏':'已取消收藏'); return;
  }
  if(act==='food1'){ ui.food = v; ui.sub = '全部'; render(); return; }
  if(act==='food2'){ ui.sub = (v==='全部细分' ? '全部' : v); render(); return; }
  if(act==='method'){ ui.method = v; render(); return; }
  if(act==='favchip'){ ui.onlyFav = !ui.onlyFav; render(); return; }
  if(act==='serv-minus'){ if(ui.detail){ ui.detail.servings = Math.max(1, ui.detail.servings-1); rerenderDetail(); } return; }
  if(act==='serv-plus'){ if(ui.detail){ ui.detail.servings = Math.min(20, ui.detail.servings+1); rerenderDetail(); } return; }
  if(act==='ing-toggle'){ if(ui.detail){ ui.detail.ingDone[idx] = !ui.detail.ingDone[idx]; rerenderDetail(); } return; }
  if(act==='step-toggle'){ if(ui.detail){ ui.detail.stepDone[idx] = !ui.detail.stepDone[idx]; rerenderDetail(); } return; }
  if(act==='add-all'){ var rd=recipeById(ui.detail.id); if(rd) addToList(rd, ui.detail.servings); return; }
  if(act==='del-recipe'){
    var rdel = recipeById(id); if(!rdel) return;
    if(confirm('删除「'+rdel.title+'」？这一步不能撤销。')){
      state.recipes = state.recipes.filter(function(x){return x.id!==id;});
      save(); closeSheet(); render(); toast('已删除');
    }
    return;
  }
  if(act==='form-ing-add'){ document.getElementById('ingRows').insertAdjacentHTML('beforeend', ingRowHTML()); return; }
  if(act==='form-ing-kind'){
    var krow = el.closest('.ing-row');
    if(krow){ krow.setAttribute('data-auto','0'); setRowKind(krow, krow.getAttribute('data-t')==='se'?'main':'se'); }
    return;
  }
  if(act==='form-step-add'){ document.getElementById('stepRows').insertAdjacentHTML('beforeend', stepRowHTML('')); return; }
  if(act==='form-ing-del'){ el.closest('.ing-row').remove(); return; }
  if(act==='form-step-del'){ el.closest('.step-row').remove(); return; }
  if(act==='form-food-add'){
    var big = document.getElementById('f-food1').value;
    var sub = document.getElementById('f-food2').value;
    var val = sub ? big+'/'+sub : big;
    var arr = hiddenArr('f-foods');
    if(arr.indexOf(val)<0){ arr.push(val); setHidden('f-foods', arr); drawFoodChips(); }
    else toast('这个分类已经加过了');
    return;
  }
  if(act==='form-food-del'){
    setHidden('f-foods', hiddenArr('f-foods').filter(function(x){ return x!==v; })); drawFoodChips(); return;
  }
  if(act==='form-method-toggle'){
    var ms = hiddenArr('f-methods');
    var at = ms.indexOf(v);
    if(at>-1) ms.splice(at,1); else ms.push(v);
    setHidden('f-methods', ms); drawMethodChips(); return;
  }
  if(act==='form-save'){ collectForm(id||null); return; }

  if(act==='cal-prev' || act==='cal-next'){
    ui.calMonth = shiftMonth(ui.calMonth, act==='cal-prev'?-1:1);
    ui.calDay = ui.calMonth+'-01'; render(); return;
  }
  if(act==='cal-today'){ ui.calDay = todayKey(); ui.calMonth = ui.calDay.slice(0,7); render(); return; }
  if(act==='cal-day'){ ui.calDay = v; render(); return; }
  if(act==='cal-add-recipe'){ openSheet(pickerHTML()); return; }
  if(act==='picker-pick'){
    var added = addLogRecipe(ui.calDay, id);
    closeSheet(); render();
    toast(added ? '已记下，食材同步进清单' : '这天已经记过这道菜了');
    return;
  }
  if(act==='log-serv-minus'){ changeLogServings(ui.calDay, v, -1); render(); return; }
  if(act==='log-serv-plus'){ changeLogServings(ui.calDay, v, 1); render(); return; }
  if(act==='log-recipe-del'){ removeLogRecipe(ui.calDay, v); render(); toast('已移除，清单同步更新'); return; }
  if(act==='log-note-add'){
    var ni = document.getElementById('logNote');
    var nt = (ni && ni.value || '').trim();
    if(!nt){ toast('先写点什么'); return; }
    addLogNote(ui.calDay, nt); render(); toast('记下了'); return;
  }
  if(act==='log-note-del'){ removeLogNote(ui.calDay, v); render(); return; }
  if(act==='factor-reset'){
    state.profile.factor = suggestFactor();
    var sl = document.getElementById('f-factor'); if(sl) sl.value = state.profile.factor;
    var fv2 = document.getElementById('factorVal'); if(fv2) fv2.textContent = fmt(state.profile.factor);
    save(); toast('已按体型重算为 '+fmt(state.profile.factor)); return;
  }

  if(act==='list-mode'){ ui.listMode = v; render(); return; }
  if(act==='list-toggle-group'){
    var hit = state.checklist.filter(function(x){ return itemKey(x)===v; });
    var allDone = hit.length>0 && hit.every(function(x){ return x.done; });
    hit.forEach(function(x){ x.done = !allDone; });
    save(); render(); return;
  }
  if(act==='list-del-group'){
    state.checklist = state.checklist.filter(function(x){ return itemKey(x)!==v; });
    save(); render(); toast('已移除这一样'); return;
  }
  if(act==='list-add'){
    var inp = document.getElementById('newItem');
    var nv = (inp&&inp.value||'').trim();
    if(!nv){ toast('先写点什么'); return; }
    state.checklist.push({id:uid(),name:nv,q:null,u:'',t:guessSeasoning(nv)?'se':'main',recipeId:'manual',recipeTitle:'手动添加',done:false});
    save(); render(); toast('已加进清单'); return;
  }
  if(act==='list-toggle'){
    for(var a=0;a<state.checklist.length;a++) if(state.checklist[a].id===id){ state.checklist[a].done=!state.checklist[a].done; break; }
    save(); render(); return;
  }
  if(act==='list-del'){
    state.checklist = state.checklist.filter(function(x){return x.id!==id;});
    save(); render(); return;
  }
  if(act==='clear-done'){
    state.checklist = state.checklist.filter(function(x){return !x.done;});
    save(); render(); toast('已清掉买好的'); return;
  }
  if(act==='clear-all'){
    if(confirm('清空整个购物清单？')){ state.checklist=[]; save(); render(); toast('清单已清空'); }
    return;
  }
  /* ---- v14 云同步 / 只读分享 ---- */
  if(act==='cloud-setup'){ openSheet(cloudSetupHTML()); return; }
  if(act==='cloud-connect'){ cloudConnect(); return; }
  if(act==='cloud-disconnect'){ cloudDisconnect(); return; }
  if(act==='cloud-copy-id'){ copyText(cloud.gistId); return; }
  if(act==='cloud-copy-link'){
    var sl = document.getElementById('shareLink');
    if(sl) copyText(sl.value);
    return;
  }
  if(act==='cloud-toggle-auto'){
    if(!cloudReady()){ toast('先连接 GitHub 云同步'); return; }
    cloud.auto = !cloud.auto; saveCloud(); render();
    toast(cloud.auto ? '自动同步已开启' : '自动同步已关闭');
    if(cloud.auto) cloudSync('auto', true);
    return;
  }
  if(act==='cloud-up'){ cloudSync('up'); return; }
  if(act==='cloud-down'){ cloudSync('down'); return; }
  if(act==='cloud-sync'){ cloudSync('auto'); return; }
  if(act==='cloud-conflict-cancel'){ cloudResolve('cancel'); return; }
  if(act==='cloud-resolve'){ cloudResolve(v); return; }
  if(act==='cloud-share'){
    if(!cloudReady()){ toast('先连接 GitHub 云同步'); return; }
    openSheet(cloudShareHTML()); return;
  }
  if(act==='share-back'){ shareLeave(); return; }
  if(act==='share-copy'){
    if(!ui.share || !ui.share.data) return;
    if(!confirm('把这份内容存成你自己的副本？\n\n会覆盖这台设备现有的食谱和餐厅，之后就是你自己的独立数据，不会连到对方的云。')) return;
    applySnapshot(ui.share.data); markDirty(); shareLeave();
    toast('已存成你的副本，之后各存各的');
    return;
  }
  if(act==='export'){ exportData(); return; }
  if(act==='import'){ document.getElementById('importFile').click(); return; }
  if(act==='restore'){
    var have = {}; state.recipes.forEach(function(r2){ have[r2.title]=1; });
    var n=0;
    SAMPLES.forEach(function(s,i){ if(!have[s.title]){ var c=clone(s); c.id='sample-'+i+'-'+uid(); c.createdAt=Date.now(); state.recipes.push(c); n++; } });
    save(); render(); toast(n?('补回了 '+n+' 道示例食谱'):'示例食谱都在'); return;
  }
  if(act==='wipe'){
    if(confirm('会删除全部食谱、清单和饮食记录，且无法恢复。建议先导出备份。确定清空吗？')){
      state = {recipes:[],checklist:[],log:{},profile:state.profile}; save(); render(); toast('已清空');
    }
    return;
  }
});

document.addEventListener('input', function(e){
  if(!e.target) return;
  if(e.target.id==='search'){ ui.q = e.target.value; updateRecipeList(); }
  else if(e.target.id==='placeSearch'){ ui.placeQ = e.target.value; updatePlaceList(); }
  else if(e.target.id==='pickerSearch'){
    var box = document.getElementById('pickerList');
    if(box) box.innerHTML = pickerListHTML(e.target.value);
  }
  else if(e.target.id==='f-factor'){
    state.profile.factor = Number(e.target.value);
    var lab = document.getElementById('factorVal');
    if(lab) lab.textContent = fmt(state.profile.factor);
    save();
  }
  else if(e.target.classList && e.target.classList.contains('n')){
    var arow = e.target.closest('.ing-row');
    if(arow && arow.getAttribute('data-auto')==='1'){
      setRowKind(arow, guessSeasoning(e.target.value) ? 'se' : 'main');
    }
  }
});
document.addEventListener('change', function(e){
  if(!e.target) return;
  if(e.target.hasAttribute && e.target.hasAttribute('data-bact')){
    var bk=e.target.getAttribute('data-bact');
    if(bk==='all') batchAll(e.target.checked);
    else { batchSetPicked(); batchUpdateCount(); }
  }
  else if(e.target.id==='f-food1') fillFood2();
  else if(e.target.hasAttribute && e.target.hasAttribute('data-cact')){ catRename(e.target); }
  else if(e.target.hasAttribute && e.target.hasAttribute('data-pcfg-i')){ pcfgRename(e.target); }
  else if(e.target.id==='placeSortSel'){ ui.placeSort = e.target.value || 'score'; render(); }
  else if(e.target.id==='cf-show'){
    var ct = document.getElementById('cf-token');
    if(ct) ct.type = e.target.checked ? 'text' : 'password';
  }
  else if(e.target.id==='p-height' || e.target.id==='p-weight'){
    state.profile[e.target.id==='p-height'?'height':'weight'] = Number(e.target.value)|| (e.target.id==='p-height'?163:45);
    save(); toast('体型数据已保存，可点「按体型重算」');
  }
});
document.addEventListener('keydown', function(e){
  if(e.key==='Enter' && e.target && (e.target.id==='newItem' || e.target.id==='logNote')){
    e.preventDefault();
    var act = e.target.id==='newItem' ? 'list-add' : 'log-note-add';
    var btn = document.querySelector('[data-act="'+act+'"]');
    if(btn) btn.click();
  }
});
document.getElementById('importFile').addEventListener('change', function(e){
  var f = e.target.files && e.target.files[0];
  if(f) importData(f);
  e.target.value = '';
});
document.getElementById('imageFile').addEventListener('change', function(e){
  var files = Array.prototype.slice.call(e.target.files||[]);
  e.target.value = '';
  if(!files.length || !ui.imp) return;
  syncImp();
  var left = 6 - ui.imp.images.length;
  if(left<=0){ toast('每道菜最多 6 张图'); return; }
  var pending = files.slice(0,left), n = 0;
  pending.forEach(function(f){
    compressImage(f, function(data){
      if(data && ui.imp) ui.imp.images.push({id:uid(), data:data});
      n++;
      if(n===pending.length){ openSheet(impSheetHTML()); toast('图片已加入'); }
    });
  });
});

boot();
})();
