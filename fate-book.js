/* ===========================================================================
 * 《克蕾雅的挣扎》· 命运之书 · Shadow DOM 原生翻页开局设定 v5.0
 * 修改：修正总页数为7页，第二页重构为「联动角色页」，增加启用按钮与预览逻辑
 * ========================================================================== */
 (function () {
  'use strict';

  const MARKER = '[[KRS_OPENING]]';
  const SLOT = '__KRS_FATE_BOOK__';

  /* ── 核心全屏背景图 ── */
  const DEFAULT_BG = 'https://origin.picgo.net/2026/09/16/SCG1101ffb6de303f5be17a.png';
  const FREE_IMAGE = 'https://origin.picgo.net/2026/09/16/6daa8638-6d52-43c0-ac2d-33a3a2ed73f971da53c71fc72f8b.png';
  const END_IMAGE = 'https://origin.picgo.net/2026/09/16/43e8bdde9838f8a89c5abecdd14d59a0bbb9706d38459626.png';
  const CLAIRE_SPRITE = 'https://origin.picgo.net/2026/09/16/ddab7a63-dee3-4899-aba9-e379a0d47babce9505ef2723001f.png';
  /* ── [KingExit / 王逝] 南境篇 ── */
  const KE_SPRITE = 'https://origin.picgo.net/2026/09/29/imageb0d7fe894af3e2ff.png';
  const KE_FACE = {
    georgia: 'https://origin.picgo.net/2026/09/28/80f2841ea5530359f4a924b182e2963f11d676a4db76088d.png',
    stiara: 'https://origin.picgo.net/2026/09/28/b3b47ee8648ac6c5930081c384263903867ff6907683f228.png',
    guine: 'https://origin.picgo.net/2026/09/28/b6bfaa8e95ac22b482fef2f25949aa7e32c4ce6dbc25df7a.png'
  };

  const IRIS_SPRITE = 'https://origin.picgo.net/2026/09/19/d47108f4-b5ba-4f4b-b4ab-7adb0894be09ba85294f3aa3f3b9.png';

  /* ── [医术师 / 温伯格帝国] 北方篇 ── */
  const IJ_SPRITE = 'https://origin.picgo.net/2026/09/29/a120f9e4f3f70a376a3ea9c793fd21e48eea71d04da8e5ef9d583f90.jpg';
  const IJ_FACE = {
    rexis: 'https://origin.picgo.net/2026/09/28/80e258a6d9acd96271df8fe07bb10f678e01d1827dada321.png',
    patricia: 'https://origin.picgo.net/2026/09/28/fbe5e0bbc4983a9368ddb8721d7589280f23e9bc35f9a04d.png',
    chinomi: 'https://origin.picgo.net/2026/09/28/0c120bef0861efca8485e86c94aea4917f2ecc31a8c236b7.png',
    tisha: 'https://origin.picgo.net/2026/09/28/dddf9f7b026a25a6fe59bfc6e7d6bdfcd3801f07834c4e22.png',
    galatea: 'https://origin.picgo.net/2026/09/28/afbef5e55f6f940364db2f4b914370184230cc8e002f37af.png'
  };

  /* ── [祈愿诗篇 / 安纳托尔岛] ── */
  const PG_SPRITE = 'https://origin.picgo.net/2026/09/29/CG_endA_gooda767331b37aa4a31.png';
  const PG_FACE = {
    elsie: 'https://origin.picgo.net/2026/09/29/37b20dcdd51edc1af6a386bbab63d98760b6124e5ca6c745.png',
    dina: 'https://origin.picgo.net/2026/09/29/1dadf45d3588c9cfec1d46185611170cc753da727fa980a1.png',
    karen: 'https://origin.picgo.net/2026/09/29/f42a78c5c131cbc403c3be55402bb41d33586ace93d01d27.png',
    korotte: 'https://origin.picgo.net/2026/09/29/48f0e97d0043fe4bb899f512a032bb302b834aeb8c44d345.png'
  };

  /* ── 重点支线专属高画质背景图 ── */
  const ROUTE_BGS = {
    '三千金的矫正': 'https://origin.picgo.net/2026/09/17/TRIO05_02982db6c118dba6d6.png',
    '哥布林巢穴': 'https://origin.picgo.net/2026/09/17/Gob01_0184e5d67c92b84535.png',
    '圣女的反转诅咒': 'https://origin.picgo.net/2026/09/17/SNT06_11311a41d5c0e9d183.png',
    '波奇与解咒仪式': 'https://origin.picgo.net/2026/09/17/DOG01_004fbb4cbc04a7d31b.png',
  };

  /* ── [学院模式] 潘多拉学院篇 ── */
  const ACADEMY_IMAGE = 'https://origin.picgo.net/2026/09/17/TRIO05_02982db6c118dba6d6.png';
  const ACADEMY_SCENE = {
    noble: DEFAULT_BG,
    knight: FREE_IMAGE,
    curse: 'https://origin.picgo.net/2026/09/17/TRIO05_02982db6c118dba6d6.png',
    chapel: END_IMAGE,
    staff: 'https://origin.picgo.net/2026/09/29/a120f9e4f3f70a376a3ea9c793fd21e48eea71d04da8e5ef9d583f90.jpg',
    council: END_IMAGE
  };

  /* ── futa 页五大核心角色 ── */
  const FUTA_CHARACTERS = [
    { key: '克蕾雅', avatar: 'https://origin.picgo.net/2026/09/16/baa11b8602a9f6449cf68eed348d25580c136419c3adba4f.png' },
    { key: '莉莉娅', avatar: 'https://origin.picgo.net/2026/09/16/edd003d06bb444976ece5673b7eb43ba1fec1ac47034c75f.png' },
    { key: '梅拉妮', avatar: 'https://origin.picgo.net/2026/09/16/7fcd9a29eb0fecba48facf9bc470b986175712e05ffcce10.png' },
    { key: '拉姆内', avatar: 'https://origin.picgo.net/2026/09/16/742102bff8b8c2fea5ca5fd1359fd4ada5752cbbd406f95c.png' },
    { key: '艾拉',   avatar: 'https://origin.picgo.net/2026/09/16/44367a10dcb2e244c721a29ee9e70b1dfc2e657a5206619c.png' },
  ];

  /* ── 各大扩展篇章旗下有立绘的角色群 ── */
  const EXPANSION_SUB_CHARS = {
    '王逝-南境篇': [
      { name: '盖欧露易丝', title: '原人类军总司令', avatar: KE_FACE.georgia, bigImg: 'https://origin.picgo.net/2026/09/28/60a7b3c7528787365a0b9641693355be4d6a8795fc0d4d41.png', desc: '原拉修赫特王国第18代龙骑士团团长、人类解放军总司令，如今已卸任救世主' },
      { name: '斯提亚拉', title: '盲眼圣女', avatar: KE_FACE.stiara, bigImg: 'https://origin.picgo.net/2026/09/28/9d22eb544a59537f2b86e4fa07c4aa1bd16ed95d73ebe063.png', desc: '地下监狱最下层的盲眼少女，温柔坚韧，善于折纸，一心协助露易丝。' },
      { name: '古伊奈', title: '魂式天才', avatar: KE_FACE.guine, bigImg: 'https://origin.picgo.net/2026/09/28/b91c910c9dae7659cce6f8d53fabc402a93a48de03844a13.png', desc: '伯赫洛斯领主之女，曾被魔族钉于十字架七年，在继承王之徽章恢复身体后，决定好好游历这片大陆' }
    ],
    '医术师-温伯格篇': [
      { name: '雷克西斯', title: '最后的医者', avatar: IJ_FACE.rexis, bigImg: 'https://origin.picgo.net/2026/09/28/94b515d79b47bbd27a34a4b7182512d13936a17a75a1011d.png', desc: '医学圣地阿尔米奥锡安唯一的幸存者，受司法院永续监视南下救治病患。' },
      { name: '帕特里琪娅', title: '监视官', avatar: IJ_FACE.patricia, bigImg: 'https://origin.picgo.net/2026/09/28/25a75db1a013fb416d6ab770e08b6c724ea8266c5e5912d4.png', desc: '帝国司法院佩剑监视官，恪尽职守，言谈如公文，是套在医者脖上的锁链。' },
      { name: '奇诺米', title: '治愈师少女', avatar: IJ_FACE.chinomi, bigImg: 'https://origin.picgo.net/2026/09/28/26681cd9be7ff8260.png', desc: '圣灵教区直爽热忱的茨塔尔正教治愈师，尚未见识医术与异端的真相。' },
      { name: '蒂莎', title: '领主病弱幼女', avatar: IJ_FACE.tisha, bigImg: 'https://origin.picgo.net/2026/09/28/2c6c6c7cf27c5d81571225e875c16eaf61571150c7084731.png', desc: '奥威尔堡长年卧床的幼女，先天性无痛症，早慧通透，正等候着不会劝她认命等死的医者。' },
      { name: '加莉泰娅', title: '无色之道造物', avatar: IJ_FACE.galatea, bigImg: 'https://origin.picgo.net/2026/09/28/43cdc177a9387cfbf1cac5bea0aa794ac066ff817585f1e8.png', desc: '驻留于白之花田的黑泥造物少女，在永恒正午中静候能温暖她双手的人。' }
    ],
    '祈愿诗篇-安纳托尔岛篇': [
      { name: '艾尔希', title: '亚克罗德最后的毕业生', avatar: PG_FACE.elsie, bigImg: 'https://origin.picgo.net/2026/09/29/da4a4c8d7ddc8a4e10.png', desc: '亚克罗德学园学生，元属性。魔核带催淫机能与多层保护，自己却一无所知。漂流至安纳托尔后为回家而收集素材，逐渐发现自己是第三世代『主人和奴隶』中的『奴隶』POWER[0]。最终觉醒POWER[Ⅳ]，封印泽恩与人魔根源，成为唯一记得他的人。' },
      { name: '狄娜', title: '背负罪孽的暗之王者', avatar: PG_FACE.dina, bigImg: 'https://origin.picgo.net/2026/09/29/f762e8ea187a59bd7ff44d653e0cbc73785e9571140b2d72.png', desc: '高帕尔学园最强，暗加暗双魔核，地下斗技场王者。为救患病的弟弟利奥而战，却亲手杀死了他。魔核半毁后成为艾尔希的老师，把最痛的过去交给她看。终局重新开始用自己的魔核，只说了一句「这次不是借来的」。' },
      { name: '卡莲', title: '道具店老板', avatar: PG_FACE.karen, bigImg: 'https://origin.picgo.net/2026/09/29/b9b78116e0bfe70bc46b0b4580dbbf038102a23c4e338cc4.png', desc: '洛博特道具店老板，瓦米特家女儿，土属性。第一个救艾尔希的人，也是第一个对她隐瞒的人。帮她收集素材、制作魔道具，处理三大家族争端，后与布雷德结合。全篇最像「可靠的成年人」的那一个。' },
      { name: '柯萝特', title: '风与光的双魔核魔法使', avatar: PG_FACE.korotte, bigImg: 'https://origin.picgo.net/2026/09/29/b23e3b7d67983d6f31df4d11182ac4a9005289b086f6817f.png', desc: '风和光双魔核，自称神童，在快递站打工。父亲是背信者的魔核研究员，留下最终试炼，必须与知心朋友共同挑战。活泼开朗，不把艾尔希当「特别的谁」，后继承父亲的魔核。' }
    ],
    'BS2-残片篇': [
      { name: '诺登', title: '图书室之梦的时计师', avatar: 'https://origin.picgo.net/2026/10/08/77f0ce219f648a571427e5714d58240e54bdb2d9dc32d2e5.png', bigImg: 'https://origin.picgo.net/2026/10/08/77f0ce219f648a571427e5714d58240e54bdb2d9dc32d2e5.png', desc: '图书室之梦的时计师，用魂为客人制作时计。崩坏时把图书室的一角带进了新世界，仍在寻找格林。' },
      { name: '小红帽', title: '带着轮回记忆的猎人', avatar: 'https://origin.picgo.net/2026/10/08/1c4eb4a13f11a987104f66f37bd94d8546f22fe9308e15e5.png', bigImg: 'https://origin.picgo.net/2026/10/08/1c4eb4a13f11a987104f66f37bd94d8546f22fe9308e15e5.png', desc: '不死者的同伴兼猎人，肩上能召唤魄罗。带着上一个轮回的记忆，正在追查这个世界的黑幕。' },
      { name: '普利凯特', title: '失去舞台的赤之女王', avatar: 'https://origin.picgo.net/2026/10/08/ca56c10823d6dfc4a27c94ba4ea9c4511cc8a6f6aee686b3.png', bigImg: 'https://origin.picgo.net/2026/10/08/ca56c10823d6dfc4a27c94ba4ea9c4511cc8a6f6aee686b3.png', desc: '第二代赤之女王，原赤之偶像。崩坏后不再当偶像，带着旧记忆寻找新的立足方式。' },
      { name: '梅贝尔', title: '虚无的旁观者', avatar: 'https://origin.picgo.net/2026/10/08/27f90d0f6f0497d00bb1ceaf8115284e1b66c644216537c3.png', bigImg: 'https://origin.picgo.net/2026/10/08/27f90d0f6f0497d00bb1ceaf8115284e1b66c644216537c3.png', desc: '混沌迷宫的引路人。以旁观者姿态降临，却对这个世界的一切都抱着旺盛的好奇。' },
      { name: '爱丽丝·利德尔', title: '被寻找的少女', avatar: 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png', bigImg: 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png', desc: '利德尔家次女，格林一路寻找的人。以本体、母亲／妹妹／女儿三种扮演、人偶与崩坏体等多种形态出现。' },
      { name: '玛丽·安', title: '自由妖精·莉耶芙', avatar: 'https://origin.picgo.net/2026/10/08/68208d56a291c30f7e89bc8a5fa6fd13e1aed1c696238752.png', bigImg: 'https://origin.picgo.net/2026/10/08/68208d56a291c30f7e89bc8a5fa6fd13e1aed1c696238752.png', desc: '妖精，自称「这个故事的女主角」。力量仍在，只是吃过大瘪，正要把地位与力量重新拿回来。' },
      { name: '帽子屋', title: '永不终焉的茶会主人', avatar: 'https://origin.picgo.net/2026/10/08/1ba5573147239aa7c55e7cbb16c7ca25e371d8726a04a2d4.png', bigImg: 'https://origin.picgo.net/2026/10/08/1ba5573147239aa7c55e7cbb16c7ca25e371d8726a04a2d4.png', desc: '第三人称自称的茶会主人，语无伦次却自成逻辑。' },
      { name: '三月兔', title: '茶会的兔子', avatar: 'https://origin.picgo.net/2026/10/08/791905c560e833185bf5c86d2893563cdf5f75d6f095945b.png', bigImg: 'https://origin.picgo.net/2026/10/08/791905c560e833185bf5c86d2893563cdf5f75d6f095945b.png', desc: '开口即谈交欢，把一切说成「一二♡ 一二♡」的节奏。' },
      { name: '柴郡猫', title: '哪里都在的旁观者', avatar: 'https://origin.picgo.net/2026/10/08/10b332bf0cf41232d9ede85ed4d0993927a335b40acf9b6b.png', bigImg: 'https://origin.picgo.net/2026/10/08/10b332bf0cf41232d9ede85ed4d0993927a335b40acf9b6b.png', desc: '句尾一律「喵」的情报源，看透人类与外来者。' },
      { name: '罗丽娜', title: '心脏女王', avatar: 'https://origin.picgo.net/2026/10/08/b997d7fef52e6eee76c4425bc3c78faf0a4b42391dc02b30.png', bigImg: 'https://origin.picgo.net/2026/10/08/b997d7fef52e6eee76c4425bc3c78faf0a4b42391dc02b30.png', desc: '口头禅是把人「刎下脑袋」，要人不断献上头颅与灵魂。' },
      { name: '比尔', title: '蛇神的巫女', avatar: 'https://origin.picgo.net/2026/10/08/0444efc5eee28f540afbf6192ae23264dbf5299a7b84d651.png', bigImg: 'https://origin.picgo.net/2026/10/08/0444efc5eee28f540afbf6192ae23264dbf5299a7b84d651.png', desc: '称格林「先生」，把「蛇神大人的教诲」挂在嘴边。' }
    ],
    '摇篮-格拉提亚篇': [
      { name: '诺艾儿·柯涅尔', title: '贝尔米特 Cadet 3', avatar: 'https://origin.picgo.net/2026/10/09/dbf1773e4b140fb5d2b9b87f563b578f0d2610f2c16fcd74.png', bigImg: 'https://origin.picgo.net/2026/10/09/2a22d924594f08f05215076841ae8b9f44eb2f199514ad4b.png', desc: '炼金术师见习的精灵少女。两星期前被魔族吞入体内、魔力被吸干，卧床整整两周；如今背着新的咏唱装置，重新走进纺线者之森。' },
      { name: '丽薇歌塔·柯涅尔', title: '魔女杂货店店主', avatar: 'https://origin.picgo.net/2026/10/09/c39089b1c7a9c730d052dd0a68a52cd493dcc42c301e733e.png', bigImg: 'https://origin.picgo.net/2026/10/09/a8d19917fdf30ec250e7e8a11a42a48da380fe3803d7e02d.png', desc: '诺艾儿的姐姐，也是事实上的监护人。把担心说成打趣，把妹妹使唤得团团转，却把门口那盏灯一直点着。' },
      { name: '伊夏·波利斯塔切尔', title: '自称的劲敌', avatar: 'https://origin.picgo.net/2026/10/09/8a92daf62cb0dbefd47c13369d2a3723f1fa038f9a0f6fe0.png', bigImg: 'https://origin.picgo.net/2026/10/09/10b2aca97763eb3a49f8128a9814beb2c5481bd280ca3c43.png', desc: '诺艾儿的同级生。先挑衅、再关心、最后否认——她替诺艾儿重建了那枚损坏的魔法，却坚持说是顺路。' },
      { name: '普莉姆拉', title: '医务担当 · 兽人治愈术士', avatar: 'https://origin.picgo.net/2026/10/09/f7f280b17e6d7805d7897ba696a1e20d3b8f10b29e9d8c94.png', bigImg: 'https://origin.picgo.net/2026/10/09/884cc922fd1904e67993d69e7d3445d5dffde6651ddc6375.png', desc: '把诺艾儿从边缘拉回来的人。检查身体时语气完全职业化，收尾永远是一句「乖，乖」。' },
      { name: '蒂格蕾娜·索菈', title: '机械工学科Ⅳ级生', avatar: 'https://origin.picgo.net/2026/10/09/2ec536e01e4a1d8fa5e03a3d0108a67f6fbb29064719cdbf.png', bigImg: 'https://origin.picgo.net/2026/10/09/2ec536e01e4a1d8fa5e03a3d0108a67f6fbb29064719cdbf.png', desc: '黑进医疗档案、记住了诺艾儿名字的技工。好奇心压倒一切礼节，关心人的方式是偷偷把你的装备修好。' },
      { name: '阿尔玛·奥普菲帕姆', title: '同班同学', avatar: 'https://origin.picgo.net/2026/10/09/c198a204eee2c132480f921abc2d8ef9a3e0f3b392fc4390.png', bigImg: 'https://origin.picgo.net/2026/10/09/228295f011fe1684404359630b437c4b25a11bf8ad3f0d13.png', desc: '袭击那天她在场，却什么都没能做。最想说话、也最不敢说话的那个人。' }
    ]
  };

  /* ── 命运主线原著角色的全景立绘与一句话简介 ── */
  const ORIGIN_PROFILES = {
    '凯拉涅斯': { bigImg: 'https://origin.picgo.net/2026/09/25/ed7b112820120595911db8cb66c0af147c44e36ab92dea68.png', desc: '被封印千年的至高恶神。玩味俯瞰异界因果，你将成为祂重临现世的唯一锚点。' },
    '艾拉': { bigImg: 'https://origin.picgo.net/2026/09/17/d499b077a20483ccec94a8f8767d7ed9fbcb078642081343.png', desc: '上位次元的支援精灵。巴掌大小却心机深沉，以戏谑的心灵通话向你提出诱人契约。' },
    '克蕾雅': { bigImg: 'https://origin.picgo.net/2026/09/17/ac92bf314de5fc2fb6488b395a70a66e25515781bb8ce916.png', desc: '瓦莱里安公爵千金。高傲折扇下藏着疯狂吐槽与蜕变的灵魂，命运在此重新起步。' },
    '伊莉丝': { bigImg: 'https://origin.picgo.net/2026/09/19/d1e3701a4b70c450df76c7be4db7a226dff0f9fc5cf83559.png', desc: '被夺去圣女之名的坚毅少女。背负吸血鬼化诅咒在迷宫与边境寻求归途与救赎。' },
    '莉莉娅': { bigImg: 'https://origin.picgo.net/2026/09/17/bd044dfa7368a3ba194fb70aba371bb3b6c8d9d8549fdba4.png', desc: '教会资助的平民当代圣女。因自卑而躲在天台吹风，渴望真正证明自身价值。' },
    '梅拉妮': { bigImg: 'https://origin.picgo.net/2026/09/17/e96503f65df8e12335d3feaea70d815cffe85f3f45f159d0.png', desc: '受诅咒一族的咒术千金。蜷缩在图书馆排架阴影处，渴望被接纳与温柔以待。' },
    '拉姆内': { bigImg: 'https://origin.picgo.net/2026/09/17/dc9fbb30e0fcad68889c2cfec6b44be64df519f948e21102.png', desc: '北方兽人王女。爽朗野性，翘着腿坐在橡树上啃苹果，邀你一同翘课痛饮北方果酿。' },
    '丽塔': { bigImg: 'https://origin.picgo.net/2026/09/19/925f8d71cb2fac2c2a8a3bb41ef16a20c88912bec412ddb7.png', desc: '故乡尽毁的狼耳猎手。满身血泥与你在荒野石窟立下猎刀复仇之誓，誓死相伴。' }
  };

  /* ── 联动角色配置中心（天音居首、夏洛特次之，配置附属随行角色） ── */
  const LINKED_CONFIG = {
    '响木天音': {
      tags: ['[苍穹法]', '响木天音', '天音'],
      avatar: 'https://origin.picgo.net/2026/09/25/37006260238a0b0548b3bfa0782220d3008ccef9e096d764.png',
      bigImg: 'https://origin.picgo.net/2026/09/25/1b0ff70cf6e19f8fa.png',
      bg: '普通女高中生，魔法少女，与魔导书《远古·溯流》的契约者。',
      now: '击败魔神暗黑凝视者后被穿越至潘多拉大陆，正在寻找回家的方法，同时继续以魔法少女身份战斗。',
      worldChange: '【恶神凯拉涅斯出现在深渊凝视者即将被少女击败的前一刻，带走了伤痕累累的魔神残躯；会用魔法变身的少女失去意识，等她再醒来时这里已不是记忆中的钢铁城市】',
      wbEntries: ['[苍穹法]🍑响木天音', '[苍穹法]🍑响木天音-小忆人设'],
      subChar: {
        name: '小忆',
        label: '同行角色',
        avatar: 'https://origin.picgo.net/2026/09/26/f16f5cf001d3d4768eeb47187c358cc39dccf9359928fbd3.png'
      }
    },
    '夏洛特': {
      tags: ['[驱魔少女]', '夏洛特', '瑞树'],
      avatar: 'https://origin.picgo.net/2026/09/25/cfd04c9114e4aa6437c8334891a48cc3fdc86ac377d63ceb.png',
      bigImg: 'https://origin.picgo.net/2026/09/25/afbc6af184ba84ce4ff48bf5ff959fd7613cfd269a0d8c57.png',
      bg: '驱魔人世家出身，双亲战死。从母亲继承圣剑‘天秤座’，从父亲继承圣枪‘天蝎座’。被上级恶魔赛蕾姆丝施加‘污秽的刻印’。',
      now: '为追击赛蕾姆丝穿越到潘多拉大陆，身负诅咒侵蚀，努力寻找解咒与归途的方法。',
      worldChange: '【恶神凯拉涅斯带来全新敌人，掌握催淫魔法的上级恶魔正在与驱魔少女进行角逐】',
      wbEntries: ['[驱魔少女]🪄夏洛特(adv)', '[驱魔少女]🪄夏洛特 - 融合世界观'],
      subChar: {
        name: '赛蕾姆丝',
        label: '宿敌角色',
        avatar: 'https://origin.picgo.net/2026/09/25/6d5ab923b636763c7398d33755ccaeb6b57a6fa8d0dd10c7.png'
      }
    },
    '芙洛蒂': {
      tags: ['[仙肴圣餐]', '芙洛蒂'],
      avatar: 'https://origin.picgo.net/2026/09/25/4dc6200820290c3f0850b1ef48e107eec138f9223373b60b.png',
      bigImg: 'https://origin.picgo.net/2026/09/25/285955c693bed23c1efd2029b2646423c85fde1138b1617c.png',
      bg: '善神埃特尔光耀支派修女，因拒绝旧贵族求婚被诬陷流放至凯尔维斯岛。',
      now: '在凯尔维斯岛传教，与魔物少女拉菲莉娅相遇，遭遇恶神实验与天神草的威胁，正努力保护岛屿。',
      worldChange: '【在帝国东侧外海一处孤岛上，得罪公爵被流放的少女正在尽心尽力维护小岛和平】',
      wbEntries: ['[仙肴圣餐]🥪芙洛蒂', '[仙肴圣餐]🥪芙洛蒂 - 融合世界观']
    },
    '艾妮希雅': {
      tags: ['[契约纹]', '艾妮希雅'],
      avatar: 'https://origin.picgo.net/2026/09/25/35c2aa1a16d684964cdc8c58bc8438ff4dc4733308eeb8a0.png',
      bigImg: 'https://origin.picgo.net/2026/09/25/835a9f2773f0b2b456c0619dbceb2973722d9027b959759a.png',
      bg: '圣露米尼亚小教堂代理祭司，孤儿院长大，为保护教堂与孤儿院签下契约纹。',
      now: '背负巨债，探索遗迹寻找还债与治疗纳西娅院长黑纹病的方法，与旧贵族势力对抗。',
      worldChange: '【戴尔王国地处潘多拉大陆西侧，帝国西陲。恶神凯拉涅斯将黑纹播撒于该处百姓，一位孤儿院诞生的修女正准备走上对抗邪恶与神灵的故事】',
      wbEntries: ['[契约纹]🎗️艾妮希雅', '[契约纹]🎗️艾妮希雅 - 融合世界观']
    },
    '托莉娜': {
      tags: ['[妹神官]', '托莉娜'],
      avatar: 'https://origin.picgo.net/2026/10/02/baf1073fccd03e0d73215a07dc7621448d075e160cd34497.png',
      bigImg: 'https://origin.picgo.net/2026/10/02/61144e7687c3e0fe0ba1946940e64c09032c738028a3f759.png',
      bg: '在阿斯林顿侍奉神明的见习神官少女，性格温柔纯真，对哥哥抱有深厚的依恋与信赖。',
      now: '身处教会与教区日常之中，在信仰、信徒的祈愿与潜藏的危机中坚定前行。',
      worldChange: '【阿斯林顿教区正式并入世界，见习妹神官托莉娜的纯白祈祷在大陆一隅悄然回响】',
      wbEntries: ['[妹神官]✨阿斯林顿 · 世界观合理化与角色索引'],
      subChar: {
        name: '魔化托莉娜',
        label: '魔化形态',
        avatar: 'https://origin.picgo.net/2026/10/02/96242e499f06db45ed4c32f2b282a0be664e6cca44cd8dca.png'
      }
    },
    '一之濑雫': {
      tags: ['[状态异常]', '一之濑雫', '雫'],
      avatar: 'https://origin.picgo.net/2026/10/02/13bcc39120a81f21da53e7602f9fb44be44c3589799d5a5c.png',
      bigImg: 'https://origin.picgo.net/2026/10/02/d87fc72aee3455f8114a1ce7ef099ed0df6e35429ab21f77.png',
      bg: '被卷入残酷异变与状态异常命运的少女，面对未知的侵蚀与异常状态苦苦挣扎抗争。',
      now: '初入潘多拉大陆，身体残留着状态异常的诡异烙印，正在寻找抑制与解脱的方法。',
      worldChange: '【状态异常的因果侵蚀撕裂裂隙，带着异常状态体质的少女一之濑雫流落于此】',
      wbEntries: ['[状态异常]🍟雫-命运主线与背景']
    },
    '王逝-南境篇': {
      tags: ['[KingExit]'],
      avatar: KE_SPRITE,
      bigImg: KE_SPRITE,
      bg: '【王逝】帝国南端「南境」：约十年前魔族在大陆南缘现身，伯赫洛斯半天陷落，七年战争之后人类获胜。',
      now: '神月历1838年5月～1839年3月。南境战争已经结束，只剩地下监狱里的收尾——原人类解放军总司令盖欧露易丝作为无期囚犯，越狱刚刚开始。',
      worldChange: '【恶神凯拉涅斯在南端的造物体系尚未清算：残滓还剩下四体，被完成到极限的「灭器」仍握在「大王」手里】',
      wbEntries: ["[KingExit]🏰王逝 · 世界观合理化与角色索引","[KingExit]🏰王逝 · 主线大纲","[KingExit]🏰王逝 · 盖欧露易丝 · 人设与语料","[KingExit]🏰王逝 · 斯提亚拉 · 人设与语料","[KingExit]🏰王逝 · 古伊奈 · 人设与语料","[KingExit]🏰王逝 · 魔族势力 · 人设与语料","[KingExit]🏰王逝 · 自由模式（战后日常）","[KingExit]🏰王逝 · 后日谈（完结篇）","[KingExit]🏰王逝 · 南境 · 五月雨","[KingExit]🏰王逝 · 南境 · 阿本特","[KingExit]🏰王逝 · 南境 · 拉斯塔博士","[KingExit]🏰王逝 · 南境 · 贝洛与三名弟子","[KingExit]🏰王逝 · 南境 · 瓦鲁","[KingExit]🏰王逝 · 南境 · 空铠的骑士","[KingExit]🏰王逝 · 南境 · 天下乱","[KingExit]🏰王逝 · 南境 · 学姐与学弟","[KingExit]🏰王逝 · 南境 · 拉修赫特王","[KingExit]🏰王逝 · 南境 · 巴尔甘女王","[KingExit]🏰王逝 · 南境 · 泽尔瑟与春","[KingExit]🏰王逝 · 南境 · 凯亚普利斯","[KingExit]🏰王逝 · 南境 · 库坦"]
    },
    '医术师-温伯格篇': {
      tags: ['[医术师]'],
      avatar: IJ_SPRITE,
      bigImg: IJ_SPRITE,
      bg: '【医术师】潘多拉大陆北端的温伯格帝国：医学圣地阿尔米奥锡安毁于『神之惩罚』，教会把治愈术垄断为神恩，医者被当作异端。',
      now: '神月历1839年3月～1840年3月。阿尔米奥锡安唯一的幸存者雷克西斯・格拉曼带着永续监视南下，在帝国南北要冲的奥威尔堡撞见与故乡方向相反的病变——「兽」。',
      worldChange: '【温伯格帝国北端新起一局：北方正教会正在把「净化医者」做成制度，而地底更古老的坠落物已经开始重组活人的身体】',
      wbEntries: ["[医术师]🏥温伯格 · 世界观合理化与角色索引","[医术师]🏥温伯格 · 主线大纲","[医术师]🏥温伯格 · 雷克西斯 · 人设与语料","[医术师]🏥温伯格 · 帕特里琪娅 · 人设与语料","[医术师]🏥温伯格 · 奇诺米 · 人设与语料","[医术师]🏥温伯格 · 蒂莎 · 人设与语料","[医术师]🏥温伯格 · 加莉泰娅 · 人设与语料","[医术师]🏥温伯格 · 奥威尔堡 · 人设与语料","[医术师]🏥温伯格 · 商会与教会 · 人设与语料","[医术师]🏥温伯格 · 北之民与帝都 · 人设与语料","[医术师]🏥温伯格 · 星船与引导者 · 人设与语料","[医术师]🏥温伯格 · 自由模式（旅途日常）","[医术师]🏥温伯格 · 后日谈（完结篇）"]
    },
    '祈愿诗篇-安纳托尔岛篇': {
      tags: ['[祈愿诗篇]'],
      avatar: PG_SPRITE,
      bigImg: PG_SPRITE,
      bg: '【祈愿诗篇】潘多拉海域的孤岛安纳托尔：本国把用尽的人往这里送——被制造出来的亚克罗德学园学生、奴隶、被流放者、搞人体实验的背信者。',
      now: '第 0 天～第 80 天。亚克罗德学园的毕业生艾尔希在毕业前夜被袭，漂流到岛上；她的魔核带着失控的催淫魔法与多层保护机能，为了混过出港检查，她替魔法师公会的卡莲收集合成材料。',
      worldChange: '【孤岛上三方拉锯：魔法师公会把持委托与素材，波莫娜教把「爱惜人以外的生命」写进教义，戈尔修族用拳头说话——而三者之上，还有一个只是「看着」的东西】',
      wbEntries: ["[祈愿诗篇]🏝️安纳托尔 · 世界观合理化与角色索引","[祈愿诗篇]🏝️安纳托尔 · 主线大纲","[祈愿诗篇]🏝️安纳托尔 · 艾尔希 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 狄娜 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 卡莲与公会 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 柯萝特 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 芙萝 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 幽妮娅 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 欧迪 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 布娜 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 杰斯与盗贼团 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 威尔与戈尔修族 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 芙洛瑞丝与希特 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 岛民与同居男人们 · 人设与语料","[祈愿诗篇]🏝️安纳托尔 · 自由模式（岛上日常）","[祈愿诗篇]🏝️安纳托尔 · 后日谈（Last story）"]
    },
    'BS2-残片篇': {
      tags: ['[BS2]'],
      avatar: 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
      bigImg: 'https://origin.picgo.net/2026/10/10/8e24b184-9c08-4ef5-a33d-d61fbc3e7cd9e22e2baa769f8394.png',
      bg: '【BLACK SOULS II】另一个世界的箱庭体系：不思议之国、冬之钟、库因兰德、克里米亚看护墓地、混沌迷宫、图书室之梦……全部是上位存在以「童话」为素材编织出来的封闭世界。',
      now: '那座箱庭已经崩坏：轮回断裂，古兰·吉涅尔停止运转，蠕动潜行者被击退，玛丽苏的创作整体坏掉。碎片像梦境残渣一样漂进潘多拉大陆的偏远角落，凝成「残响地」——他们保有外貌、记忆、性格、执念与部分技能，失去的是箱庭创造权、支配者级无限复活与改写世界规则的能力。',
      worldChange: '【箱庭的碎片顺着因果缝隙落到潘多拉大陆的偏远角落：雾里多出的一段路、地图上不该有的车站、只在下雨时浮现的墓地——残片以执念为锚，战力最高不过 7.5 级；善神与恶神仍是这个世界唯一真正的 8.0】',
      wbEntries: ["[BS2]🟣童话碎片 · 世界观与相撞机制", "[BS2]🌑三月兔 · 人设与背景", "[BS2]🌑小红帽 · 人设与背景", "[BS2]🌑帽子屋 · 人设与背景", "[BS2]🌑普利凯特 · 人设与背景", "[BS2]🌑柴郡猫 · 人设与背景", "[BS2]🌑梅贝尔 · 人设与背景", "[BS2]🌑爱丽丝·利德尔 · 人设与背景", "[BS2]🌑玛丽·安 · 人设与背景", "[BS2]🌑诺登 · 人设与背景", "[BS2]🌑三月兔 · 语料", "[BS2]🌑小红帽 · 语料", "[BS2]🌑帽子屋 · 语料", "[BS2]🌑普利凯特 · 语料", "[BS2]🌑柴郡猫 · 语料", "[BS2]🌑梅贝尔 · 语料", "[BS2]🌑爱丽丝·利德尔 · 语料", "[BS2]🌑玛丽·安 · 语料", "[BS2]🌑诺登 · 语料", "[BS2]🌑不来梅的乐队 · 人设与语料", "[BS2]🌑假海龟 · 人设与语料", "[BS2]🌑克缇 · 人设与语料", "[BS2]🌑公爵夫人 · 人设与语料", "[BS2]🌑匹诺曹 · 人设与语料", "[BS2]🌑南瓜·欧尔 · 人设与语料", "[BS2]🌑卡纳奇 · 人设与语料", "[BS2]🌑圣母卡塔丽娜 · 人设与语料", "[BS2]🌑娼妇玛丽 · 人设与语料", "[BS2]🌑学徒 · 人设与语料", "[BS2]🌑小王子 · 人设与语料", "[BS2]🌑尤妮丝 · 人设与语料", "[BS2]🌑崔德尔双子 · 人设与语料", "[BS2]🌑巴纳伊 · 人设与语料", "[BS2]🌑布莱克威尔医师 · 人设与语料", "[BS2]🌑希伏契 · 人设与语料", "[BS2]🌑希夏 · 人设与语料", "[BS2]🌑帕托拉休 · 人设与语料", "[BS2]🌑弗洛伦斯 · 人设与语料", "[BS2]🌑格尔达 · 人设与语料", "[BS2]🌑格里菲 · 人设与语料", "[BS2]🌑比尔 · 人设与语料", "[BS2]🌑渡渡 · 人设与语料", "[BS2]🌑班达斯奈奇 · 人设与语料", "[BS2]🌑睡鼠 · 人设与语料", "[BS2]🌑矮胖子 · 人设与语料", "[BS2]🌑维多利雅 · 人设与语料", "[BS2]🌑罗丽娜 · 人设与语料", "[BS2]🌑罗宾汉 · 人设与语料", "[BS2]🌑莱登 · 人设与语料", "[BS2]🌑贾巴沃克 · 人设与语料", "[BS2]🌑贾布加布 · 人设与语料", "[BS2]🌑辛巴达 · 人设与语料", "[BS2]🌑钢铁汉斯 · 人设与语料", "[BS2]🌑长腿叔叔 · 人设与语料", "[BS2]🌑雏鸟 · 人设与语料", "[BS2]🌑韩塞尔与格蕾特 · 人设与语料", "[BS2]🌑驴耳朵的国王 · 人设与语料", "[BS2]🌑麻袋女 · 人设与语料"]
    },
    '摇篮-格拉提亚篇': {
      tags: ['[摇篮]'],
      avatar: 'https://origin.picgo.net/2026/10/09/dbf1773e4b140fb5d2b9b87f563b578f0d2610f2c16fcd74.png',
      bigImg: 'https://origin.picgo.net/2026/10/10/image9e5cf507b624c800.png',
      bg: '【摇篮】潘多拉大陆西陲的半封闭边区：中央是恩惠之城格拉提亚，四周被纺线者之森包住，北面是伏沦岭山地，再往北是圣域。名义上归中央帝国，实际自治——官道只有南面一条，冬季封路。',
      now: '诺艾儿·柯涅尔在贝尔米特学园袭击事件后卧床两周，刚刚靠着新的咏唱装置复学。姐姐吩咐的素材、森林里的魔族、伏沦岭兽人矿工的委托、以及遗迹深处那个说矮人语的存在，正一件件挤进她的日常。',
      worldChange: '【潘多拉西陲出现一片自成一套的边区：这里的魔法是被管理与认证的公共规格，魔族是从圣域方向渗透出来的野生灾害，而一个背着法杖的精灵少女正把断掉的那截重新接回去】',
      wbEntries: ["[摇篮]🎀摇篮世界 · 世界观合理化与角色索引", "[摇篮][地图]🎀摇篮世界地理", "[摇篮][地图]🎀格拉提亚地点", "[摇篮][地图]🎀摇篮世界国家表", "[摇篮]🎀诺艾儿 · 人设与背景", "[摇篮]🎀诺艾儿 · 语料", "[摇篮]🎀丽薇歌塔 · 人设与背景", "[摇篮]🎀丽薇歌塔 · 语料", "[摇篮]🎀伊夏 · 人设与背景", "[摇篮]🎀伊夏 · 语料", "[摇篮]🎀普莉姆拉 · 人设与背景", "[摇篮]🎀普莉姆拉 · 语料", "[摇篮]🎀蒂格蕾娜 · 人设与背景", "[摇篮]🎀蒂格蕾娜 · 语料", "[摇篮]🎀阿尔玛 · 人设与背景", "[摇篮]🎀阿尔玛 · 语料", "[摇篮]🎀提尔德 · 人设与语料", "[摇篮]🎀德尔菲尼 · 人设与语料", "[摇篮]🎀瓦罗斯 · 人设与语料", "[摇篮]🎀南丁格尔 · 人设与语料", "[摇篮]🎀奥斯托利亚 · 人设与语料", "[摇篮]🎀梅法 · 人设与语料", "[摇篮]🎀巴顿 · 人设与语料", "[摇篮]🎀爱莉丝 · 人设与语料"]
    }
  };

  function getHostDoc() {
    try {
      if (window.parent && window.parent !== window && window.parent.document) {
        return window.parent.document;
      }
    } catch (_) {}
    return document;
  }

  function getHostWin() {
    try {
      if (window.parent && window.parent !== window) return window.parent;
    } catch (_) {}
    return window;
  }

  const HW = getHostWin();
  const HD = getHostDoc();

  if (HW[SLOT] && HW[SLOT].destroy) {
    try { HW[SLOT].destroy(); } catch (_) {}
  }

  function fn(name) {
    const scopes = [window, window.TavernHelper, HW, HW.TavernHelper];
    for (const s of scopes) {
      try {
        if (s && typeof s[name] === 'function') return s[name].bind(s);
      } catch (_) {}
    }
    return null;
  }

 /* ── 命运主线角色与预设开局配置 ── */
        const DESTINY_CONFIG = {
    linked: [
      {
        name: '响木天音',
        linkKey: '响木天音',
        avatar: 'https://origin.picgo.net/2026/09/25/37006260238a0b0548b3bfa0782220d3008ccef9e096d764.png',
        prompt: '【响木天音·命运主线】异空间一战后，精疲力竭的魔法少女坠落到这片魔法原野，你第一个赶到。'
      },
      {
        name: '托莉娜',
        linkKey: '托莉娜',
        avatar: 'https://origin.picgo.net/2026/10/02/baf1073fccd03e0d73215a07dc7621448d075e160cd34497.png',
        prompt: '【托莉娜·命运主线】阿斯林顿的清晨，见习神官托莉娜在礼拜堂等你一起出门。'
      },
      {
        name: '芙洛蒂',
        linkKey: '芙洛蒂',
        avatar: 'https://origin.picgo.net/2026/09/25/4dc6200820290c3f0850b1ef48e107eec138f9223373b60b.png',
        prompt: '【芙洛蒂·命运主线】凯尔维斯岛的旧神殿石阶上，被流放的修女第一次踏足这片土地，你替她拎着行李。'
      },
      {
        name: '艾妮希雅',
        linkKey: '艾妮希雅',
        avatar: 'https://origin.picgo.net/2026/09/25/35c2aa1a16d684964cdc8c58bc8438ff4dc4733308eeb8a0.png',
        prompt: '【艾妮希雅·命运主线】美吉斯塔的夜里，代理祭司跪在告解室前，锁骨下的契约纹在发烫。'
      },
      {
        name: '夏洛特',
        linkKey: '夏洛特',
        avatar: 'https://origin.picgo.net/2026/09/25/cfd04c9114e4aa6437c8334891a48cc3fdc86ac377d63ceb.png',
        prompt: '【夏洛特·命运主线】从高空坠落的驱魔少女撑着身子起身，你正好在场，成了她在这世界的第一个坐标。'
      },
      {
        name: '一之濑雫',
        linkKey: '一之濑雫',
        avatar: 'https://origin.picgo.net/2026/10/02/13bcc39120a81f21da53e7602f9fb44be44c3589799d5a5c.png',
        prompt: '【一之濑雫·命运主线】残破废墟里，状态发作的少女撑着石壁，戒备地盯着你。'
      },
      {
        name: '艾尔希',
        linkKey: '祈愿诗篇-安纳托尔岛篇',
        avatar: PG_FACE.elsie,
        prompt: '【艾尔希·命运主线】一切都已尘埃落定。封印泽恩与人魔根源之后,曾经漂来的少女决定带着 POWER[Ⅳ] 的力量亲眼看看这个世界。'
      },
      {
        name: '狄娜',
        linkKey: '祈愿诗篇-安纳托尔岛篇',
        avatar: PG_FACE.dina,
        prompt: '【狄娜·命运主线】利奥回来了，重新用自己的魔核的狄娜打算带他看看世界，你与她同行。'
      },
      {
        name: '卡莲',
        linkKey: '祈愿诗篇-安纳托尔岛篇',
        avatar: PG_FACE.karen,
        prompt: '【卡莲·命运主线】洛博特的道具店里，她一边拨算盘一边说「你道什么歉」。'
      },
      {
        name: '柯萝特',
        linkKey: '祈愿诗篇-安纳托尔岛篇',
        avatar: PG_FACE.korotte,
        prompt: '【柯萝特·命运主线】古里耶夫森林边缘，继承了双魔核的少女背着竹篓回头问你走不走。'
      },
      {
        name: '帕特里琪娅',
        linkKey: '医术师-温伯格篇',
        avatar: IJ_FACE.patricia,
        prompt: '【帕特里琪娅·命运主线】司法院的走廊里，佩剑的监视官确认完装备，让你跟上。'
      },
      {
        name: '奇诺米',
        linkKey: '医术师-温伯格篇',
        avatar: IJ_FACE.chinomi,
        prompt: '【奇诺米·命运主线】圣灵教区的桥头，吵得整条街都听见的见习治愈师抓着你去劝一个不肯治病的老人。'
      },
      {
        name: '蒂莎',
        linkKey: '医术师-温伯格篇',
        avatar: IJ_FACE.tisha,
        prompt: '【蒂莎·命运主线】奥威尔堡领主之馆朝东的房间，长年卧床的幼女抬头看向门口。'
      },
      {
        name: '加莉泰娅',
        linkKey: '医术师-温伯格篇',
        avatar: IJ_FACE.galatea,
        prompt: '【加莉泰娅·命运主线】无色之道的白之花田永远停在正午，黑泥造物少女等着一个不该等的人。'
      },
      {
        name: '盖欧露易丝',
        linkKey: '王逝-南境篇',
        avatar: KE_FACE.georgia,
        prompt: '【盖欧露易丝·命运主线】终战纪念桥上，卸任的救世主靠着栏杆看地图，问你要不要一起走一段。'
      },
      {
        name: '斯提亚拉',
        linkKey: '王逝-南境篇',
        avatar: KE_FACE.stiara,
        prompt: '【斯提亚拉·命运主线】救济院门口，盲眼少女坐在门槛上，听着你的脚步问你走不走。'
      },
      {
        name: '古伊奈',
        linkKey: '王逝-南境篇',
        avatar: KE_FACE.guine,
        prompt: '【古伊奈·命运主线】城门口，教完最后一堂魂式的她叉着腰拦住你，说带她走她不认路但能打。'
      },
      {
        name: '诺艾儿',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/dbf1773e4b140fb5d2b9b87f563b578f0d2610f2c16fcd74.png',
        prompt: '【诺艾儿·命运主线】格拉提亚的石板路上，被唤作「魔女」的少女正把刚采的草药分门别类，抬头见你便先问你有没有受伤。'
      },
      {
        name: '丽薇歌塔',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/a8b107fdee3322ceaf8a60dd7a8e44f1a5400ba8a91b5357.png',
        prompt: '【丽薇歌塔·命运主线】魔女工房的门被推开，柯涅尔家的女主人放下手里的活计，先给你倒了杯热茶。'
      },
      {
        name: '伊夏',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/8a92daf62cb0dbefd47c13369d2a3723f1fa038f9a0f6fe0.png',
        prompt: '【伊夏·命运主线】贝尔米特国立大学的走廊拐角，抱着书堆的少女与你撞了个满怀，纸张散了一地。'
      },
      {
        name: '爱莉丝',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/e7358a0e690ac9ee8d3aa49c800ee009bfb40ef3e2806f70.png',
        prompt: '【爱莉丝·命运主线】摇篮地带的界碑旁，抱着旧布偶的少女说她认得你——从很久很久以前。'
      },
      {
        name: '诺登',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/77f0ce219f648a571427e5714d58240e54bdb2d9dc32d2e5.png',
        prompt: '【诺登·命运主线】残响地里立着一座不该存在的钟塔，门内是那间熟悉的图书室——她正把一枚时计摆上台面，抬头看你。'
      },
      {
        name: '小红帽',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/1c4eb4a13f11a987104f66f37bd94d8546f22fe9308e15e5.png',
        prompt: '【小红帽·命运主线】雾里传来拉枪机的声音，红帽从树影里走出来，第一句话不是问候，而是问你「这一轮」还记得多少。'
      },
      {
        name: '梅贝尔',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/27f90d0f6f0497d00bb1ceaf8115284e1b66c644216537c3.png',
        prompt: '【梅贝尔·命运主线】她坐在残响地的边缘晃着脚，笑着说这个世界比箱庭有趣——然后问你愿不愿意带她到处看看。'
      },
      {
        name: '爱丽丝·利德尔',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
        prompt: '【爱丽丝·利德尔·命运主线】王都的巷口，那个熟悉的背影转过来——她叫你「先生」，像等了很久，又像刚刚才想起你。'
      },
      {
        name: '玛丽·安',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/68208d56a291c30f7e89bc8a5fa6fd13e1aed1c696238752.png',
        prompt: '【玛丽·安·命运主线】巴掌大的妖精绕着你飞了三圈，叉着腰宣布：从今天起这个世界的女主角是她。'
      }
    ],
    origin: [
      {
        name: '艾拉',
        avatar: 'https://origin.picgo.net/2026/09/16/bdf825043d9582bba3d3ec9ae02dafad295f3a856a6c53ab.png',
        prompt: '【艾拉·命运主线】巴掌大的妖精凭空停在你眼前，脑子里响起她戏谑的心灵通话。'
      },
      {
        name: '克蕾雅',
        avatar: 'https://origin.picgo.net/2026/09/16/1409d4e13ab7c1ad7e96924a36bdd9a3482303ab0ef221c1.png',
        prompt: '【克蕾雅·命运主线】东塔沙龙里，公爵千金摇着折扇把你列进了她的差遣名单。'
      },
      {
        name: '伊莉丝',
        avatar: 'https://origin.picgo.net/2026/09/19/34615f5ddf9e4653b.png',
        prompt: '【伊莉丝·命运主线】边境公会的委托板前，被夺去圣女之名的银发少女问你愿不愿意结伴。'
      },
      {
        name: '莉莉娅',
        avatar: 'https://origin.picgo.net/2026/09/16/1b3aaf46fcec72dd5b23d8ecd9092f3b0f41accba6f103d6.png',
        prompt: '【莉莉娅·命运主线】钟楼天台上，教会出资的圣女藏起面包屑，问你要不要一起吹吹风。'
      },
      {
        name: '梅拉妮',
        avatar: 'https://origin.picgo.net/2026/09/16/31f3ea8ecb0364f11784be1d0e50200bb3a6ea2667f58b02.png',
        prompt: '【梅拉妮·命运主线】图书馆排架深处，被孤立的咒术千金抱着蓝雾花，求你让她做点什么。'
      },
      {
        name: '拉姆内',
        avatar: 'https://origin.picgo.net/2026/09/16/140a45b97be03162fb8a7e59122a125807d4ba4f42278523.png',
        prompt: '【拉姆内·命运主线】学园橡树上，北方兽人公主啃着苹果，邀你翘课去喝果酿。'
      },
      {
        name: '丽塔',
        avatar: 'https://origin.picgo.net/2026/09/19/47add4de39d9d3d7f8aeee6228c46f8453aa07b8239428b3.png',
        prompt: '【丽塔·命运主线】暴雨荒野，满身血泥的狼耳少女拽着你的手腕逃进石窟。'
      }
    ],
    branch: [
      {
        name: '帽子屋',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/1ba5573147239aa7c55e7cbb16c7ca25e371d8726a04a2d4.png',
        prompt: '【帽子屋·命运主线】荒地上摆开一桌永远喝不完的茶，帽子屋小姐正对着空椅子说话，并邀请你入席。'
      },
      {
        name: '三月兔',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/791905c560e833185bf5c86d2893563cdf5f75d6f095945b.png',
        prompt: '【三月兔·命运主线】三月兔从茶桌底下钻出来，第一句话就把你问得说不出话。'
      },
      {
        name: '柴郡猫',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/10b332bf0cf41232d9ede85ed4d0993927a335b40acf9b6b.png',
        prompt: '【柴郡猫·命运主线】半空中先出现笑，再出现猫。她说她什么都知道喵，只要你拿点有趣的东西来换。'
      },
      {
        name: '罗丽娜',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/b997d7fef52e6eee76c4425bc3c78faf0a4b42391dc02b30.png',
        prompt: '【罗丽娜·命运主线】扑克兵列成两排，心脏女王坐在高处，问你要献上的是头颅还是灵魂。'
      },
      {
        name: '比尔',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/0444efc5eee28f540afbf6192ae23264dbf5299a7b84d651.png',
        prompt: '【比尔·命运主线】小小的祭坛前，巫女正在祈祷，见你来便唤你「先生」。'
      },
      {
        name: '普利凯特',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/ca56c10823d6dfc4a27c94ba4ea9c4511cc8a6f6aee686b3.png',
        prompt: '【普利凯特·命运主线】她在废墟里搭起一个歪歪扭扭的台子，对你说：没有舞台就自己造一个，你要不要当第一个观众。'
      },
      {
        name: '妈妈爱丽丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/097e2ebda0c4b078383c2b19c4920bde1cc4125f756ef6aa.png',
        prompt: '【妈妈爱丽丝·命运主线】摇篮深处的小屋，系着围裙的女人正把面包从炉里取出来，回头喊你洗手吃饭。'
      },
      {
        name: '女儿爱丽丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/89da196c1fb9669196f2ad9a6a09ec2abf29e85dad0da0fb.png',
        prompt: '【女儿爱丽丝·命运主线】小女孩抱着兔子玩偶站在门口，说她已经在这里等了你很久。'
      },
      {
        name: '妹妹爱丽丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/3c41af5f604c2bb1ed68f6662853c44b4f8dc8105575bad6.png',
        prompt: '【妹妹爱丽丝·命运主线】妹妹把你的衣角攥得死紧，说什么都不肯松手。'
      },
      {
        name: '爱·丽·丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
        prompt: '【爱·丽·丝·命运主线】祂注意到了你。祂是无数存在的本身，祂想让你成为新的主角……一间华丽的洋房内，美丽的少女爱丽丝(？)坐在你面前，语气轻柔温和。'
      },
      {
        name: '普莉姆拉',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/f7f280b17e6d7805d7897ba696a1e20d3b8f10b29e9d8c94.png',
        prompt: '【普莉姆拉·命运主线】纺线者之森的边缘，小小的身影蹲在蘑菇丛后，警惕又好奇地打量你。'
      },
      {
        name: '蒂格蕾娜',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/2ec536e01e4a1d8fa5e03a3d0108a67f6fbb29064719cdbf.png',
        prompt: '【蒂格蕾娜·命运主线】冒险者公会的柜台后，索菈家的小姐一边盘账，一边把最麻烦的那张委托推给你。'
      },
      {
        name: '阿尔玛',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/c198a204eee2c132480f921abc2d8ef9a3e0f3b392fc4390.png',
        prompt: '【阿尔玛·命运主线】「三月兔」酒吧的角落，奥普菲帕姆家的千金用指尖转着杯子，等你先开口。'
      },
      {
        name: '提尔德',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/2b6b1e8136d25067d2ea66a8009867006d68b43a8642b5ba.png',
        prompt: '【提尔德·命运主线】菲奥蕾特道场里，柯涅尔家的少女单手撑着木刀，让你站到垫子上去。'
      },
      {
        name: '德尔菲尼',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/17eb70e5e194849d2a49305239c387dcac5ade9035262b14.png',
        prompt: '【德尔菲尼·命运主线】美术馆后厅，柯涅尔家的姐姐停在一幅画前，问你觉得这幅画在骗谁。'
      },
      {
        name: '梅法',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/5def7d08ef95a3b170e457c10a7089b027585b9f3ab31e06.png',
        prompt: '【梅法·命运主线】天空设施的藏书室里，格里亚德家的人从架上抽出一本不存在的书，递给你。'
      },
      {
        name: '南丁格尔',
        linkKey: '摇篮-格拉提亚篇',
        avatar: 'https://origin.picgo.net/2026/10/09/7ba8d84351398bde2d59f37b8576dfa103223c6e258a3bf5.png',
        prompt: '【南丁格尔·命运主线】格拉提亚贫民窟的铁匠铺前，提着灯的女人替受伤的孩子包扎，头也不抬地让你搭把手。'
      },
      {
        name: '凯拉涅斯',
        avatar: 'https://origin.picgo.net/2026/09/25/bb4a5ed33708e06d417eda8ddb0e91f68e74b80f51d10325.png',
        prompt: '【凯拉涅斯·命运主线】封印裂隙深处，恶神把脱轨的灵魂拘进神域，赐下神谕与伴生祝福。'
      },
      {
        name: '人偶爱丽丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/02-D14585590e6b7f795.png',
        prompt: '【人偶爱丽丝·命运主线】展柜的玻璃上蒙着一层薄灰，做工精细的人偶在你靠近时，睫毛动了一下。'
      },
      {
        name: '爱丽丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
        prompt: '【爱丽丝·命运主线】兔子洞底部的门半开着，穿围裙的少女回头问你：「你也是掉下来的吗？」'
      },
      {
        name: '五月雨',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/28/73accf3be7605e89f3761656f72183e225fe340d23ced5b5.png',
        prompt: '【五月雨·命运主线】茶会的长桌末尾，撑伞的少女把第五杯茶推到你面前，说外面在下雨，不急。'
      },
      {
        name: '崔德尔·蒂',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/1c4970974e4d8539449cd885faa450aff250a6732dc135dc.png',
        prompt: '【崔德尔·蒂·命运主线】岔路口的双胞胎之一拽住你的左袖，坚持说这条路才是正路。'
      },
      {
        name: '崔德尔·达姆',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/184a570189a0a08fbaaf3869debd0ab87efbb67d0ad87da4.png',
        prompt: '【崔德尔·达姆·命运主线】岔路口的双胞胎之二拽住你的右袖，说他哥说的全是假的。'
      },
      {
        name: '公爵夫人',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/1216129b006b0afd1bf774045f3a143ed3455d4fb36660c9.png',
        prompt: '【公爵夫人·命运主线】厨房里的胡椒味呛得人流泪，公爵夫人抱着猪崽问你有没有见过她的孩子。'
      },
      {
        name: '假海龟',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/efc9a1ed037ff82ca2cae7188a1ed873e0d8eaa07203b795.png',
        prompt: '【假海龟·命运主线】海滩的浅水里，自称曾是海龟的东西慢吞吞地问你愿不愿意听一段很长的往事。'
      },
      {
        name: '渡渡',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/01c652f6295aa9d879b6edc78d15a1bc3a07d8a19355fe81.png',
        prompt: '【渡渡·命运主线】赛跑刚结束，谁也没赢。渡渡宣布必须所有人都有奖，然后看向你。'
      },
      {
        name: '莉耶芙',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/68208d56a291c30f7e89bc8a5fa6fd13e1aed1c696238752.png',
        prompt: '【莉耶芙·命运主线】雪原的树洞里，叶片一样轻的少女蜷在里面，问你有没有见过春天。'
      },
      {
        name: '莱登',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/38a4e9c4e0eb78bc673b4181afe01519ef722fc246ed5d7f.png',
        prompt: '【莱登·命运主线】冰封的渡口，摆渡人收起了船桨，说这条河今天不想载人。'
      },
      {
        name: '蛇神',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/3bbc05b5fd9c50bfb6aedabd8561913e6dc51bf2e531d8b4.png',
        prompt: '【蛇神·命运主线】废弃神殿的供桌前，盘踞的东西睁开眼睛，说它等这具身体等了很久。'
      },
      {
        name: '格尔达',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/3ac5fe98a76ed9b7f07baae999747a86d28860c6dbc6fffd.png',
        prompt: '【格尔达·命运主线】雪地里跋涉的少女拽住你的衣角，问你有没有见过一个被带走的男孩。'
      },
      {
        name: '格里菲',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/e8d44a1d9f39317ce599d94299e3d4709d247b246f960cc2.png',
        prompt: '【格里菲·命运主线】残破的竞技场上，持枪的男人把长枪插进土里，问你有没有兴趣打一场。'
      },
      {
        name: '桑尼',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/16/a1053a15a247fce3f550d7bded6046c67cc23cbe47716f0a.png',
        prompt: '【桑尼·命运主线】阳光斜照的走廊里，少年把手里的信藏到身后，说这封信不能给你看。'
      },
      {
        name: '芙萝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/29/d42bc6bfe30dc9fba9f0bb3b72b0d96430c5e4eda1959dd9.png',
        prompt: '【芙萝·命运主线】花房的门被风吹开，放下剪子的少女抬头，说这里的花都认得你。'
      },
      {
        name: '芙洛瑞丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/29/98a89e9e1c99d3180fc2145b6d31506fea73cc00947be8c7.png',
        prompt: '【芙洛瑞丝·命运主线】花园深处，藤蔓编成的椅子上坐着的人问你：想让哪一朵开？'
      },
      {
        name: '艾珀尔',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/29/678582aa9b9eaa9a413b09fad59bf58ace7ed9acb8bc71e5.png',
        prompt: '【艾珀尔·命运主线】果园的树下落满没人捡的果子，少女说你可以拿，但要留下一样东西。'
      },
      {
        name: '尤妮丝',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/ff8a0b04f4731b352285cd8c0ba4269ef74975a52f838548.png',
        prompt: '【尤妮丝·命运主线】钟楼敲了十三下，守钟的少女说她数错了，让你替她再数一遍。'
      },
      {
        name: '小春',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/28/9c29c6d29af5d31e6b48e46ed1cffad77a6c029ca66ed4e9.png',
        prompt: '【小春·命运主线】春日的田埂上，抱着野菜篮的姑娘问你走不走这条路，可以一道。'
      },
      {
        name: '大王',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/28/70613f9cd926eb9df8dc022f17ca61912aeb9c2553cd6916.png',
        prompt: '【大王·命运主线】纸牌堆成的王座上，那位「大王」正手忙脚乱地扶住快要塌下来的王冠。'
      },
      {
        name: '塞伊',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/29/8e62b282f44ee645991192a03528683c5ffe336fdd2a15e7.png',
        prompt: '【塞伊·命运主线】图书室的梯子下面，塞伊抱着一摞歪掉的书，让你先别动。'
      },
      {
        name: '利奥',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/29/629723423085ca2f84dec0fb44b157ec7246078acec59370.png',
        prompt: '【利奥·命运主线】病院的窗边，少年把魔核按回胸口，说这次他能自己走出去。'
      },
      {
        name: '卡伊埃尔',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/16/02667b3c75d750d735ccf39b458b59e44df3c52454f35dd9.png',
        prompt: '【卡伊埃尔·命运主线】破败的教堂里，与凯埃尔相似的面孔抬起眼，问你信不信神。'
      },
      {
        name: '斯雅',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/09/26/4d26a6b4ad5b72c59bdbfc9acf8b79988691d20c23dcfea7.png',
        prompt: '【斯雅·命运主线】市场的角落，她把兜帽压得更低，说别喊她的名字。'
      },
      {
        name: '克缇',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/ff1ee1b191655fb8c9aa04f6d09f76a9f62bddd5931366d9.png',
        prompt: '【克缇·命运主线】地下斗技场的休息间，猫耳少女一边缠绷带一边问你要不要下注。'
      },
      {
        name: '班达斯奈奇',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/d366140eb2de17f66eabdfa7b8989a126df38d4017c34ae9.png',
        prompt: '【班达斯奈奇·命运主线】林间的空气忽然变得粘稠，某种看不见的东西绕着你转了一圈，然后笑了。'
      },
      {
        name: '维多利雅',
        linkKey: 'BS2-残片篇',
        avatar: 'https://origin.picgo.net/2026/10/08/c27572a47de3e01fb4a5455d537b355543c4223c9185e464.png',
        prompt: '【维多利雅·命运主线】舞会散场的楼梯上，维多利雅停下来，说她记得你——在那场大火之前。'
      }
    ]
  };;;;

  const FREE_OPENINGS = [
    {
      group: '王都 · 潘多拉学院',
      key: '学院冒险开局(自输入搭档)',
      era: '学院远游',
      blurb: '潘多拉学园宣布期一年的学生冒险活动。你和你的搭档一起出发……',
      opening: '生成风和日丽的一天，潘多拉学园宣布要举行为期一年的学生冒险活动，目的是让生徒们主动去看看这个世界。你现在在远离王都的某处地点，和你分配在一起的人物是：【】的开局'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '入学潘多拉学院的第一天',
      era: '初入校园',
      blurb: '你来到了潘多拉学院门口，进入这所大陆顶尖的贵族学园，现在是开学第一天，人群非常多。',
      opening: '生成<user>来到潘多拉学园门口，在开学第一天的热闹人潮中正式踏入校园生活的开局'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '穿越但是遇到被霸凌的莉莉娅',
      era: '命运相遇',
      blurb: '你的灵魂初次来到这具身体，眼前是学院大门，你看到一位不起眼的贵族少女正在角落里被几个同窗堵住找茬。',
      opening: '你的灵魂初次来到这具身体，眼前是学院大门，你看到莉莉娅正在角落里被几个同窗堵住找茬'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '身为伊莉丝的监督和她一起进入学校',
      era: '特殊转学',
      blurb: '教会想让一位教会执行者休息一下，于是安排她转学到潘多拉学院体验学生生活。你作为她的监督陪在身边，一边盯住她体内的东西，一边和她一起上学。',
      opening: '生成教会安排一位伊莉丝转入潘多拉学园体验校园生活，<user>与她的同伴作为监督者一同转学陪伴在身边的开局'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '克蕾雅大小姐的跟班',
      era: '千金日常',
      blurb: '你是王都那位公爵千金最出名的跟班之一。她很受用你的讨好，允许你留在她身边，一起过完这段学院生活。',
      opening: '生成<user>作为克蕾雅大小姐的心腹跟班之一，陪伴她在潘多拉学园展开高贵日常的开局'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '和克蕾雅大小姐的冒险',
      era: '学院远游',
      blurb: '潘多拉学园宣布举行为期一年的学生冒险活动，让生徒们亲自去看看这个世界。你和那位公爵千金坐在远离王都的马车上。',
      opening: '生成风和日丽的一天，潘多拉学园宣布要举行为期一年的学生冒险活动，目的是让生徒们主动去看看这个世界。你和克蕾雅大小姐在远离王都的马车上，听着她抱怨的开局'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '王城召见·被选中的勇者',
      era: '圣谕',
      birth: '王都',
      blurb: '国王的召唤文书落到你手上——龙灾在即，命你组建一支小队。',
      opening: '生成<user>被埃斯特拉德拉帝国国王亲自召见、在王城宴会厅接受讨伐恶龙之命并被授权自行组建小队的开局。请先写召见的过程与国王的措辞，以及<user>得到的授权与资源（爵位／金币／通行令由 <user> 自定），再写<user>开始物色队友的过程：来应募的人由故事自然带出，<user>也可以自己去找人。招募要有试探与代价，不要一步到位'
    },
    {
      group: '王都 · 潘多拉学院',
      key: '醒来·艾拉与玛丽·安在你眼前争论',
      era: '穿越醒来',
      birth: '王都',
      blurb: '你睁开眼，两个人正为你「该归谁管」吵得不可开交。',
      opening: '生成<user>穿越醒来、睁眼就发现艾拉与玛丽·安正在为「这个人归谁管」争论不休的开局。请先写<user>这具身体的现状，再写两人争辩的内容：艾拉轻佻戏谑、句句戳人，玛丽·安温软礼貌却占有欲极强，两人各自的主张、暗示的来历以及谁更强势，最后写她们发现<user>已醒之后各自的反应与第一句话。<user>的来历由 <user> 自定，不要替 <user> 做决定'
    },
    {
      group: '日常 · 轻松向',
      key: '魔力太阳能房车 · 环游世界',
      era: '轻松穿越',
      birth: '王都',
      blurb: '你有一辆魔力太阳能房车：不用油，白天晒魔力、夜里靠储能回路续着，装着全部家当，可以带着它环游潘多拉。',
      opening: '生成<user>开着一辆「魔力太阳能房车」在潘多拉大陆环游世界的开局。这辆车靠魔力太阳能驱动，不需要燃料：车顶是可收式魔导集能板，白天吸收魔素，夜里由储能回路续供；车内家当由 <user> 自定（生活用品、囤货、工具、便携工房、几箱泡面都行）。请先写<user>此刻正停在哪里、在做什么——是刚翻过一道山脊望见谷底的城镇，还是停在官道边给集能板清灰；再写第一个撞见这辆车的人的反应：本地人没见过「不用马拉、自己会走的铁皮房子」，教会或公会的人可能会把它当成未登记的魔导器来盘查。基调轻松，这辆车能到任何地方，所以麻烦也会跟着来，但不用急着推主线'
    },
    {
      group: '日常 · 轻松向',
      key: '只想开一家小店过完后半生',
      era: '退休人生',
      birth: '王都',
      blurb: '你不想拯救世界。你只想找个铺面，卖点吃的，把日子过下去。',
      opening: '生成<user>在王都盘下一间小铺面、准备安安稳稳做点小生意的开局。<user>要卖什么、本钱从哪来，由 <user> 自定。请先写租铺面时遇到的房东、隔壁店主与开店要办的琐事（登记、进货、定价），再写第一位客人——是谁由这条街自然带出来，不要提前点名。全程不安排危机，写活市井烟火气'
    },
    {
      group: '日常 · 轻松向',
      key: '被误认成预言里的那个人',
      era: '误会喜剧',
      birth: '圣灵教区',
      blurb: '教会翻出一段旧预言，怎么读都像在说你。可你连这国家的名字都念不利索。',
      opening: '生成<user>被温伯格圣灵教区误认成预言中人物的开局。请先写这场误会的起因（一块胎记、一句口误、一次巧合，由 <user> 自定），再写教会的隆重接待与<user>的心虚，以及真信与不信的两派神职人员各自的盘算。基调诙谐：把误会越滚越大，但别让事态真的失控'
    },
    {
      group: '日常 · 轻松向',
      key: '在学院食堂打工的日子',
      era: '打工日常',
      birth: '王都',
      blurb: '你的工作是打饭。你的同事是女仆班，你的客户是全大陆最难伺候的一群贵族少年少女。',
      opening: '生成<user>在潘多拉学院食堂／女仆班打工的开局。<user>的岗位由 <user> 自定（打饭窗口、洗切、跑堂、采购）。请先写后厨的节奏与规矩，再写打饭窗口前那些熟面孔学生的固定点单与小动作，最后让学生会或某位千金提出一个让<user>为难的无理要求。轻松、有烟火气，不必上价值'
    },
    {
      group: '日常 · 轻松向',
      key: '雨天捡到一把会说话的剑',
      era: '奇幻小品',
      birth: '王都',
      blurb: '剑说它曾经很厉害。剑还说它现在只是有点饿。',
      opening: '生成<user>在雨天捡到一把会说话的剑的开局。剑的性格、来历与「饿」的含义由 <user> 自定。请先写捡到它的过程与第一段对话（剑自来熟、爱吹牛、偶尔说中要害），再写<user>带着它回到人群里时产生的麻烦与笑料。基调轻快，剑只提供信息与吐槽，不替 <user> 做决定'
    },
    {
      group: '日常 · 轻松向',
      key: '卢娜湖镇的温泉旅馆',
      era: '北境慢生活',
      birth: '卢娜湖镇',
      blurb: '雪落了一整夜。旅馆今天只有一位客人，而你负责烧水。',
      opening: '生成<user>在北方卢娜湖镇一家温泉旅馆帮工（或经营）的开局。请先写雪、炉火、温泉与兽人小镇的冬日常态，再写今天到店的那位客人——本地的兽人也好、路过的旅人也好，由故事自然带出，以及一段围着火炉展开的闲聊。节奏舒缓，写足北地的安静与温度'
    },
    {
      group: '日常 · 轻松向',
      key: '格拉提亚的魔女杂货店店员',
      era: '西陲日常',
      birth: '格拉提亚',
      blurb: '货架上摆的东西有一半你叫不出名字。店主说那不重要，账别记错就行。',
      opening: '生成<user>在格拉提亚魔女庭院里一家杂货店当店员的开局。<user>对魔导器与药材的了解程度由 <user> 自定。请先写开店的流程与货架上的怪东西，再写第一位上门的客人——是谁由这家店的位置与货品自然带出，以及一桩把商品、价钱和常识一起搅乱的小插曲。基调轻快'
    },
    {
      group: '日常 · 轻松向',
      key: '异世界的第一场雪',
      era: '静景开场',
      birth: '王都',
      blurb: '你在异世界醒来的第三天，下雪了。',
      opening: '生成<user>来到这个世界不久、遇上第一场雪的开局。<user>此刻的落脚处与身份由 <user> 自定（借住、旅店、街头、学院宿舍）。请先写这场雪落在哪、<user>身上穿得够不够、手边还剩什么；再写一件小事把 <user> 从发呆里拽出来——有人敲了门，或者有谁在窗下喊了一声。整体安静、留白，不急着推进任何事物'
    },
    {
      group: '日常 · 轻松向',
      key: '退休勇者的菜园子',
      era: '反差日常',
      birth: '联合王都',
      blurb: '传闻中的那位英雄，如今每天最重要的事是赶鸟。',
      opening: '生成<user>（或 <user> 身边某位）以「退休勇者」身份过着种菜日子的开局。请先写清晨的菜园、被啃过的菜叶与那身早就不合身的旧装备，再写一个找上门来的人：可能是来求教的年轻人、来讨债的旧同伴、或是单纯来买菜的邻居（由 <user> 自定）。写足反差与松弛感，不安排战斗'
    },
    {
      group: '日常 · 轻松向',
      key: '酒馆里那个总赊账的客人',
      era: '市井小品',
      birth: '竞技场都市',
      blurb: '他每天都来，每天都说下次一定结。你居然还一直给他倒。',
      opening: '生成<user>在竞技场都市一间酒馆里当酒保（或店主）的开局。请先写酒馆里嘈杂的日常与账本上的红字，再写那位总赊账的熟客今晚带来的新说法（一个故事、一个请求、或者一个真的能还钱的机会），最后由 <user> 决定信不信。轻松、有来有往，别把事做绝'
    },
    {
      group: '王都 · 王城与贵族街',
      key: '舞会上的不速之客',
      era: '贵族社交',
      birth: '王都',
      blurb: '王城的夜宴，你的名字不在名册上，但所有人都看见你了。',
      opening: '生成<user>出现在王城夜宴上、而名册里并没有<user>名字的开局。请先写宴会厅的气氛与<user>混进来的方式（请柬、冒充随从、被人带进来、还是本来就该在——由 <user> 自定），再写第一个发现<user>「不在名册上」的人如何当众发难，以及周围贵族各自的反应'
    },
    {
      group: '王都 · 王城与贵族街',
      key: '花街的一笔委托',
      era: '市井暗面',
      birth: '王都',
      blurb: '有人在花街下了单，指名要一个「看起来不像杀手的人」。',
      opening: '生成<user>在王都花街接下第一份委托的开局。<user>在雇主眼里最大的优点就是「看起来不像杀手」——真实身份与身手由 <user> 自定。请先写接头的过程与雇主给出的条件（报酬、期限、底线），再写目标是谁、这件事背后牵到哪一家贵族，最后让<user>意识到这份委托没有看上去那么简单'
    },
    {
      group: '王都 · 王城与贵族街',
      key: '贵族街的旧借据',
      era: '商战',
      birth: '王都',
      blurb: '一张借据把瓦莱里安家的旧账翻了出来，你是经手人。',
      opening: '生成<user>作为经手人，在王都贵族街区处理一张牵扯瓦莱里安家旧账的借据的开局。<user>的立场由 <user> 自定：债主、代办、被雇来平账的会计、替家族出面的人。请先写这张借据的来历与金额，再写第一场交锋——对面派来的人、他们手里的把柄，以及<user>打算怎么用这张纸'
    },
    {
      group: '塞拉丁与北境',
      key: '回到荒废的塞拉丁',
      era: '领地重建',
      birth: '塞拉丁',
      blurb: '马车驶进塞拉丁——瓦莱里安家荒废的领地，贫民窟里还有人记得你。',
      opening: '生成<user>时隔多年回到塞拉丁——瓦莱里安家已荒废的领地的开局。请先写一路上的见闻（荒田、塌屋、戈尔德商会与家族帮的势力分布），再写<user>进城后第一个认出<user>的人：他记得的旧事、他现在的处境、他向<user>提的第一个要求。<user>的身份与回来的目的由 <user> 自定'
    },
    {
      group: '塞拉丁与北境',
      key: '矿脉下的敲击声',
      era: '地下探掘',
      birth: '塞拉丁',
      blurb: '塞拉丁的魔力矿脉深处传出规律的敲击声，不像矿工的手笔。',
      opening: '生成<user>带人下到塞拉丁魔力矿脉深处、调查规律敲击声的开局。请先写队伍组成（矿工、家族帮向导、公会派来的人，或 <user> 自定），再写越往深处越不对的细节（温度、魔力浓度、旧矿道的封堵痕迹），最后让<user>在某一处听到敲击声从背后传来'
    },
    {
      group: '塞拉丁与北境',
      key: '兽人村的冬祭',
      era: '北境风土',
      birth: '卢娜湖镇',
      blurb: '卢娜湖镇的冬祭，兽人把最好的酒留给远客——也把最难的问题留给他。',
      opening: '生成<user>在北方卢娜湖镇赶上兽人冬祭的开局。请先写雪原、湖面与祭典的热闹，再写<user>被请上主位（原因由 <user> 自定：恩人、使者、远亲、或是被当作吉兆的客人），然后让村长在酒过三巡后提出那件「只有外来人能做」的事'
    },
    {
      group: '竞技场都市与黑市',
      key: '斗技场的无名之辈',
      era: '血与名',
      birth: '竞技场都市',
      blurb: '你没有名字，只有编号。连胜七场就能把它赎回来。',
      opening: '生成<user>以编号身份在竞技场都市参赛的开局。<user>失去名字的原因、真实身手与身上残留的旧伤由 <user> 自定。请先写地下候场区的气味与赌盘，再写第一场：对手是谁、观众在赌什么、<user>用什么方式赢或故意输，以及赛后台下一个找上来的人'
    },
    {
      group: '竞技场都市与黑市',
      key: '黑市检查站的通行证',
      era: '越境',
      birth: '黑市',
      blurb: '要进黑市，得先被登记为「商品」或「持有者」。你只有一次机会选。',
      opening: '生成<user>在黑市检查站办理入境登记的开局。登记只有两个选项：被登记为「商品」或「持有者」，<user>的选择由 <user> 自定，并要承担对应后果。请先写检查站的流程与官员的刁难，再写<user>拿到身份后进入异空间市场的第一眼，以及市场里第一个主动搭话的人'
    },
    {
      group: '温伯格 · 医术师篇',
      key: '奥威尔堡的铁丝网街',
      era: '北方工业',
      birth: '奥威尔堡',
      blurb: '船底贫民区里蒸汽与血混在一起。你是来治人的，还是来拆人的。',
      opening: '生成<user>初到温伯格帝国奥威尔堡、在铁丝网街与船底贫民区落脚的开局。<user>此行的目的由 <user> 自定：行医、拆解兵装、赊账讨债、护送病人、或追一个人。请先写这座工业城市的味道与规矩，再写<user>接到的第一份活与它背后的隐情'
    },
    {
      group: '温伯格 · 医术师篇',
      key: '圣灵教区的禁书室',
      era: '禁忌知识',
      birth: '圣灵教区',
      blurb: '教区允许你查阅禁书室——代价是永远不能把那本书合上。',
      opening: '生成<user>获准进入温伯格圣灵教区禁书室的开局。请先写教会的条件与看守者的警告，再写<user>在书架上找到的那一本（内容与危险由 <user> 自定），最后让阅读本身开始产生可见的影响——有人进来了，或者书页自己翻了'
    },
    {
      group: '戴尔王国与联合王国',
      key: '美吉斯塔的日影大道',
      era: '边国暗街',
      birth: '美吉斯塔',
      blurb: '日影大道贫民区，地下会所今晚有一场不该有人的聚会。',
      opening: '生成<user>在戴尔王国美吉斯塔的日影大道贫民区、卷入一场地下会所聚会的开局。<user>与会的原因由 <user> 自定：被雇、被邀、跟踪、送货、或本身就是名单上的人。请先写街区的雨与眼线，再写会所门口的对暗号，最后让<user>在里面看见一个不该出现的人'
    },
    {
      group: '戴尔王国与联合王国',
      key: '联合王都的旁听生',
      era: '东方学都',
      birth: '联合王都',
      blurb: '神学院要一名「不信仰任何神」的旁听生。你报了名。',
      opening: '生成<user>以「不信仰任何神」的旁听生身份进入联合王都神学院的开局。请先写报名的规矩与神学院里对无信者的态度，再写<user>第一堂课上的表现与一位坚持要收<user>为徒（或坚持要赶<user>出去）的导师，最后让第一王子研究所的人注意到<user>'
    },
    {
      group: '戴尔王国与联合王国',
      key: '阿斯林顿的公会与娼馆',
      era: '边境商贸',
      birth: '阿斯林顿',
      blurb: '阿斯林顿什么都卖：情报、药、人、还有别人的名字。',
      opening: '生成<user>在联合王国边境城市阿斯林顿落脚、并在公会接下第一桩生意的开局。<user>的本行由 <user> 自定：雇佣兵、商人、情报贩、医师、跑腿。请先写公会的规矩与价目，再写雇主与货物，最后让交易在娼馆后巷收尾时出了岔子'
    },
    {
      group: '南境 · 王逝篇',
      key: '伯赫洛斯的地下监牢',
      era: '囚徒',
      birth: '伯赫洛斯',
      blurb: '南境旧都的地下监牢，你的编号被写在墙上，日期还在走。',
      opening: '生成<user>被关押在伯赫洛斯地下监牢的开局。请先写牢房、拷问室与看守的作息，交代<user>被关的原因（由 <user> 自定，可以是冤枉、可以是罪有应得），再写一次审讯或一次放风，让<user>从中摸到越狱或翻案的第一条线索'
    },
    {
      group: '南境 · 王逝篇',
      key: '拉修赫特的残部',
      era: '败军',
      birth: '拉修赫特',
      blurb: '龙骑士团只剩残部，而你是那个还愿意扛旗的人。',
      opening: '生成<user>在拉修赫特加入（或重整）龙骑士团残部的开局。<user>的旧职与过往战绩由 <user> 自定。请先写败退后的营地、残缺的名册与士兵的士气，再写<user>必须立刻做出的第一个决断：收拢残兵、投降、还是再战一场'
    },
    {
      group: '安纳托尔与凯尔维斯',
      key: '安纳托尔的中央医院',
      era: '祈愿诗篇',
      birth: '港口洛博特',
      blurb: '安纳托尔孤岛的中央医院收容所有「不该活着的人」——包括你。',
      opening: '生成<user>在安纳托尔孤岛港口洛博特的中央医院醒来的开局。请先写病房、走廊与护士的规矩，交代<user>入院的原因（由 <user> 自定），再写高帕尔学园的实习生或地下街的掮客找上<user>，提出一件只有「医院里的人」才能做的事'
    },
    {
      group: '安纳托尔与凯尔维斯',
      key: '波莫娜教会的地下',
      era: '黑幕',
      birth: '波莫娜教会',
      blurb: '教会说那是地下救济院。你下去看了一眼。',
      opening: '生成<user>深入安纳托尔波莫娜教会地下的开局。请先写教会本部的体面与通往地下的那扇门，再写<user>在下面看见的东西（由 <user> 自定规模与性质），最后让<user>必须在「上报」「沉默」「动手」之间立刻选一个'
    },
    {
      group: '安纳托尔与凯尔维斯',
      key: '诺依圣域的妖香之森',
      era: '芙洛蒂篇',
      birth: '诺依圣域',
      blurb: '凯尔维斯孤岛的妖香之森，香味会替你做出选择。',
      opening: '生成<user>进入凯尔维斯孤岛诺依圣域外围妖香之森的开局。请先写渡海的抵达与秘境的入口，再写妖香对<user>产生的具体影响（看见什么、想做什么、身体如何反应），最后让森林深处的人或物主动现身'
    },
    {
      group: '迷宫都市 · 伊莉丝篇',
      key: '阿萨伊拉姆的大阶梯',
      era: '迷宫都市',
      birth: '阿萨伊拉姆',
      blurb: '迷宫都市的大阶梯向下是地下深穴，向上是还在等回信的上层废墟。',
      opening: '生成<user>抵达边陲迷宫都市阿萨伊拉姆的开局。请先写这座城市的构造（大阶梯、上层废墟、地下深穴探针）与它自成一体的规矩，再让<user>在岔路口做出选择：先下去，还是先上去，并写清这个选择带来的第一批遭遇'
    },
    {
      group: '迷宫都市 · 伊莉丝篇',
      key: '地下深穴的探针',
      era: '深渊',
      birth: '阿萨伊拉姆',
      blurb: '探针每天只下降一米。今天它带回了别的东西。',
      opening: '生成<user>参与迷宫都市地下深穴探针作业的开局。<user>在此地的工作由 <user> 自定：作业员、护卫、记录官、出资人。请先写升降装置与地下工事，再写今天探针带回的东西（由 <user> 自定，但必须超出所有人的预期），最后写队伍里第一个主张「把它封回去」的人'
    },
    {
      group: '摇篮 · 格拉提亚篇',
      key: '南面官道的两周脚程',
      era: '西陲边城',
      birth: '格拉提亚',
      blurb: '两周脚程之后，你看见恩惠之城的天空设施在云里缓缓转动。',
      opening: '生成<user>沿南面官道长途跋涉、抵达潘多拉大陆西陲恩惠之城格拉提亚的开局。请先写十天到两周的旅途（冬季封路、商队、伏沦岭的兽人向导由 <user> 自定是否遇到），再写进城第一眼：森林哨卡、天空设施、城区中层与下层的气味，最后让<user>在城区遇到第一个必须处理的问题'
    },
    {
      group: '摇篮 · 格拉提亚篇',
      key: '贝尔米特国立大学的插班',
      era: '西陲学园',
      birth: '格拉提亚',
      blurb: '贝尔米特国立大学按 Ⅰ～Ⅳ 级制编班，兼办魔族讨伐课程。你插进了哪一级？',
      opening: '生成<user>作为插班生进入格拉提亚贝尔米特国立大学的开局。<user>的级别（Ⅰ～Ⅳ）与所修学科由 <user> 自定。请先写校门、中庭与东西楼走廊的日常，再写第一堂课或第一场实操；让魔族讨伐课程里的某个人（同学、教官、或同级的对头）立刻与<user>产生牵连'
    },
    {
      group: '摇篮 · 格拉提亚篇',
      key: '纺线者之森的巨树',
      era: '深林遗迹',
      birth: '纺线者之森',
      blurb: '酸液巨树·黑宝石大门后面，是石碑大道与古代遗迹群。',
      opening: '生成<user>深入格拉提亚外围纺线者之森的开局。<user>进林的目的由 <user> 自定：采药、寻人、绘图、追猎、或受雇护送。请先写森林的层次与钟楼残垣、石碑大道等地标，再写<user>在酸液巨树·黑宝石大门前遭遇的东西，以及开门需要付出的代价'
    },
    {
      group: '圈外 · 文明之外',
      key: '与伊莉丝的冒险',
      era: '远侧冒险',
      blurb: '远离王都的偏远地带，一切都已尘埃落定。你和那对教会出身的姐妹组成三人小队，继续往前冒险。',
      opening: '生成在远离王都的偏远地带，一切已然平息，<user>与那对教会出身的姐妹组成三人冒险小队并肩踏上全新旅程的开局'
    },
    {
      group: '圈外 · 文明之外',
      key: '自由开局·学院门外的人',
      era: '编外身份',
      blurb: '你不是学生。你在潘多拉学院里有一份差事——身份自定：新聘助教、教会派驻的见习神官、厨房与女仆班的雇工、护卫佣兵、出入校门的行商、来送弟妹入学的乡下长姐……',
      opening: '生成<user>以「非学生」的身份进入潘多拉学院开学季的开局。<user>不是在籍学生，而是在这所学园里讨一份差事的编外人员，具体身份由 <user> 自定：可选新聘助教、教会派驻学园的见习神官、厨房与女仆班的雇工、受雇的护卫佣兵、出入校门的行商、来送弟弟妹妹入学的乡下长姐、理事会的临时文书、购买部的伙计、某一科的器材管理人。请先把<user>这份差事的一天写实（工牌、上下工、能被谁使唤、不被谁当回事），再让第一批在籍学生自然与<user>发生第一次交集的开局——遇到谁由当天的事带出来，不要提前列名单'
    },
    {
      group: '圈外 · 文明之外',
      key: '自由开局·另一个转生者',
      era: '异邦转生',
      blurb: '你也是被「轮回之道」丢进来的异界灵魂，只是落点不在公爵邸。身份自定：没落贵族次子、贫民窟孤儿、奴隶市场的货品、流亡骑士、兽人部族收养的人类……',
      opening: '生成<user>作为另一个被「轮回之道」投入潘多拉大陆的异界灵魂、在远离王都的地方醒来的开局。<user>的出身由 <user> 自定：可选没落贵族的次子、贫民窟的孤儿、奴隶市场待售的货品、战败流亡的骑士、兽人部族收养的人类、教会孤儿院的孩子、被当作祭品的少年少女、某位权贵的私生子。请先写<user>睁眼时的处境、身体的变化与所选定的来历（保留前世记忆，但对这个世界的了解程度由 <user> 自定），再让这份来历自然把<user>推向王都与潘多拉学院方向的开局'
    },
    {
      group: '圈外 · 文明之外',
      key: '自由开局·文明之外的存在',
      era: '圈外之物',
      blurb: '你的起点在文明之外：魔物、兽人部族、地下城深处的居民、被教团改造的兵装、从裂隙坠落的异界来客。人与非人的边境，由你站。',
      opening: '生成<user>的起点在文明之外的开局。<user>的种族与来历由 <user> 自定：可选拥有自我意识的魔物、兽人部族的战士、地下城深处的原住民、被教团改造的兵装、从裂隙坠落的异界来客、半魔半人的混血、被诅咒的不死者。请先写<user>在自己的地盘上的一天、所受到的猎杀或崇拜，再让<user>与潘多拉学院的人（接下讨伐委托的学生、学科实习队、交换生或迷路的贵族千金）撞上，从而被拖进文明一侧的开局'
    }
  ];

  /* ── 原著章节 ── */
  const CANON_CHAPTERS = [
    {
      key: '序章', act: '序', era: '第1年 3月',
      blurb: '死在轮回之道，被问了一句「男还是女」，睁眼站在舞会中央——婚约正被当众解除。',
      opening: '序章开始·生成克蕾雅初穿越在王都舞会被当众退婚、回到房间与艾拉自我介绍的开局'
    },
    {
      key: '第一章', act: '一', era: '第1年 4月',
      blurb: '入学首日。女式内衣、校门前救下平民圣女，以及城郊洞窟悬赏魔物讨伐初战。',
      opening: '第一章开始·生成克蕾雅度过转生后第一个早晨，在学园门前遇见被贵族堵住刁难的圣女莉莉娅的开局'
    },
    {
      key: '第二章', act: '二', era: '第1年 6月',
      blurb: '巴金登门逼债、奖学金赌约立誓，以及训练场上与二皇子凯埃尔的公开切磋。',
      opening: '第二章开始·生成克蕾雅面对巴金上门索要巨额学费立下奖学金赌约、并在训练场与皇子凯埃尔公开切磋展现蜕变实力的开局'
    },
    {
      key: '第三章', act: '三', era: '第1年 7月～8月',
      blurb: '北方卢娜湖避暑、月湖村魔物潮防御战，深入北部地下城斩首巨大兽人并破坏第1枚圣遗物。',
      opening: '第三章开始·生成克蕾雅前往北方卢娜湖镇避暑度假，遭遇魔物潮独断指挥防守，随后杀入北部地下城斩杀巨大兽人并亲手破坏第1枚圣遗物的开局'
    },
    {
      key: '第四章', act: '四', era: '第1年 11月～12月',
      blurb: '封印松动致使学园异界化，蒸发变异巨大史莱姆、破坏第2枚圣遗物，舍身救仆双腿染残，年末圣夜祭声望翻盘。',
      opening: '第四章开始·生成克蕾雅遭遇学园空间异界化的开局'
    },
    {
      key: '第五章', act: '五', era: '第2年 初',
      blurb: '亲赴贫瘠荒芜的塞拉丁领地，收编自卫团、查封商会禁绝奴隶，决战击杀被植入神之碎片的老大，回收第3枚圣遗物项链。',
      opening: '第五章开始·生成克蕾雅收到塞拉丁领地叛乱密报后亲赴领地调查的开局'
    },
    {
      key: '第六章', act: '六', era: '第2年 8月',
      blurb: '出勤不足暑期补课，元老院诬陷拘禁，皇子协助脱逃杀入黑市，手刃不死肉团父亲并引爆亚空间，破坏第4枚圣遗物。',
      opening: '第六章开始·生成克蕾雅遭元老院陷害拘禁后在皇子协助下逃出，改道杀入黑市异空间，撞见变成不死肉团的公爵父亲并亲手破坏第4枚圣遗物引爆黑市的开局'
    },
    {
      key: '第七章', act: '七', era: '第2年 秋',
      blurb: '主教指认魂魄异质，兹沃恩王女提亲，学年评估决斗连胜圣女与皇子，王女当场转而求婚克蕾雅，丘比特双重误解成型。',
      opening: '第七章开始·生成克蕾雅被枢机主教当众指认魔物气息，随后在学年评估决斗中连胜莉莉娅与凯埃尔的开局'
    },
    {
      key: '第八章', act: '八', era: '第2年 冬～第3年 初',
      blurb: '封印反噬致全境魔物狂暴，主城沦陷被时空固定，皇子与圣女各自发起最后的圣夜祭邀约，全军总动员定于1月决战。',
      opening: '第八章开始·生成克蕾雅面对全境魔物狂潮与主城时空固定沦陷，在皇子与圣女各自私下发出圣夜祭深情邀约后，进行选择的开局'
    },
    {
      key: '第九章', act: '九', era: '第3年 1月',
      blurb: '因果许愿陷阱，艾拉揭穿《贫穷圣女》谎言，第5枚圣遗物强行破碎，邪神复活囚于地牢，地牢强吻与真爱告白重铸因果力量，终局决战。',
      opening: '第九章开始·生成克蕾雅在决战前夕受骗许愿导致第5枚圣遗物破碎、艾拉揭穿《贫穷圣女》谎言、恶神凯拉涅斯复活的开局'
    },
    {
      key: '第十章', act: '十', era: '第3年 春',
      blurb: '恶神重归封印，毕业典礼纪念合影，肃清元老院残党，正式继位瓦莱里安女公爵，宿命彻底破除。',
      opening: '第十章开始·生成克蕾雅在恶神被再次封印数后，克蕾雅和伙伴们看着阳光感慨的开局'
    },
  ];

  const SPECIAL_CHAPTERS = [
    { key: '自由模式', act: '自由', era: '参与角色们的命运主线与冒险，潘多拉大陆的旅程即将上演',
      blurb: '潘多拉大陆无比广袤，四处各有危机亦或机遇，请自由选择你要涉足的道路',
      opening: '你的灵魂初次来到这具身体，眼前是学院大门，你看到一位不起眼的贵族少女正在角落里被几个同窗堵住找茬',
      thumb: FREE_IMAGE },
    { key: '学院模式', act: '学院', era: '魔法校园开课啦',
      blurb: '锁定潘多拉学院内部的纯粹校园生活：课业与考课、社团与委托、比试与竞赛、交换生与节庆、宿舍与社交。外部主线与危机全部停摆，只在背景里存在。',
      opening: '生成潘多拉学院新学期的第一天：<user>以在籍学生身份踏入校门，晨钟、制服、课表与同班同学一并展开，学园日常正式开幕的开局',
      thumb: ACADEMY_IMAGE }
  ];

  /* ── 8条支线 ── */
  const ROUTES = [
    { 
      key: '三千金的矫正', featured: true,
      thumb: 'https://origin.picgo.net/2026/09/17/TRIO05_02982db6c118dba6d6.md.png',
      opening: '生成<user>在礼仪课上接受露娜、萨尼、萨菲亚三人暗示魔法体验课的开局', 
      blurb: '暗示一层压一层。到最后她们三个自己也数不清加了多少条。' 
    },
    { 
      key: '哥布林巢穴', featured: true,
      thumb: 'https://origin.picgo.net/2026/09/17/Gob01_0184e5d67c92b84535.md.png',
      opening: '生成<user>在地下城败给哥布林群、首次被夺走身体的开局', 
      blurb: '地下城里的败北。第一次你还吐了口水，第三次你已经会说谢谢。' 
    },
    { 
      key: '圣女的反转诅咒', featured: true,
      thumb: 'https://origin.picgo.net/2026/09/17/SNT06_11311a41d5c0e9d183.md.png',
      opening: '生成<user>在训练场听莉莉娅坦白长出了男性器、答应做自慰示范的开局', 
      blurb: '黑珍珠在莉莉娅身上留下的那点残余，长成了别的东西。' 
    },
    { 
      key: '波奇与解咒仪式', featured: true,
      thumb: 'https://origin.picgo.net/2026/09/17/DOG01_004fbb4cbc04a7d31b.md.png',
      opening: '生成<user>在公园H房被波奇困住、被迫交出身体的开局', 
      blurb: '那条你随手降服、取名波奇的野狗，和莫里的偏门解咒。' 
    },
    { key: '巴金的债务', featured: false, opening: '生成<user>被巴金以元老院印章索还学费、还不上钱只能以身体折抵债务的上门惩罚开局', blurb: '还不上的钱不会消失，只会换成别的东西来收。' },
    { key: '戈尔德的契约', featured: false, opening: '生成<user>与戈尔德签下限期奴隶契约、以商品身份通过黑市检查站的开局', blurb: '限期奴隶契约，和一只以反抗心为食的神器。' },
    { key: '牧场榨乳', featured: false, opening: '生成<user>为凑够佩利卡第一次走进牧场牲口棚、被药物强制泌乳的开局', blurb: '为了凑够佩利卡，你开始卖自己的魔力体液。' },
    { key: '酒馆潜入', featured: false, opening: '生成<user>化名露西亚，在塞拉丁的酒馆里打听黑帮。情报到手，门也被永久关上的开局', blurb: '化名露西亚，在塞拉丁的酒馆里打听黑帮。情报到手，门也被永久关上。' },
  ];

  /* ── 伊莉丝 支线 ── */
  const IRIS_ROUTES = [
    { key: '处女检查与主教的教育', opening: '生成伊莉丝在阿塞勒姆教会支部接受贞洁检查、被主教以「教育」为名留下处置的开局', blurb: '起点。检查本来只是流程，主教却把它变成了「教育」。' },
    { key: '哥布林巢穴的败北', opening: '生成伊莉丝在迷宫第三层被哥布林群围住、为活命主动献出身体的开局', blurb: '第三层的缝隙。她走那条路是为了绕开结界。' },
    { key: '淫纹与淫魔的奴隶', opening: '生成伊莉丝被卡米拉刻下淫纹、发现无法解除、开始违抗不了的开局', blurb: '淫魔笑着告诉她：这个，连她自己都解不开。' },
    { key: '娼馆出道', opening: '生成伊莉丝在下层欢乐街的娼馆里报上假名、第一次接客的开局', blurb: '为了查案走进那扇门，出来时她已经登记在册。' },
    { key: '魔犬的宠物', opening: '生成伊莉丝与半魔物化的小黑同住、被它确立上下关系的开局', blurb: '她把神圣力灌给它续命，它把顺序重新排了一遍。' },
    { key: '领主宅邸的女仆调教', opening: '生成伊莉丝以女仆身份进入领主宅邸、被催眠暗示一层层拆开的开局', blurb: '通行证的代价是「来府邸帮忙做几天女仆」。' },
    { key: '伯爵的性奴隶契约', opening: '生成伊莉丝在领主宅邸面对单方面的性奴隶誓约书与蜜穴印章、米夏被叫来主持「圣洁式」的开局', blurb: '契约里对女性一方写满了要求，男性一方一片空白。' },
    { key: '异端审判', opening: '生成伊莉丝被中央教会以淫行罪名公开审判、枢机主教巴特罗梅乌斯主审、米夏担任辩护人的开局', blurb: '审的不是吸血鬼。审的是淫行。' },
    { key: '佣兵格拉奇的赌债', opening: '生成伊莉丝因委托失败被格拉奇以一万金币为名要挟、以身体折抵债务的开局', blurb: '一万金币。她拿不出来。' },
    { key: '贫民窟的最终堕落', opening: '生成伊莉丝在贫民窟帐篷区彻底堕落、再未以灭魔圣女之名现身的开局', blurb: '自此以后，那位被誉为灭魔圣女的少女，便再未在众人面前现身。' },
    { key: '魔物败北与战斗H', opening: '生成伊莉丝在迷宫中被魔物擒住、魔力被吸尽后无法挣脱的开局', blurb: '魔力被吸走，快感就停不下来；高潮又耗尽魔力。循环从这里开始。' },
    { key: '人偶化', opening: '生成伊莉丝受大贤者委托潜入上层富豪宅邸、被当成「装了拟似人格的人偶」的开局', blurb: '她去买那具长得和她一样的人偶，结果被当成了新送到的那一具。' },
    { key: '贫民窟的恶汉', opening: '生成伊莉丝在贫民窟被恶汉用媚药放倒、春药耐性已经不再的开局', blurb: '之前那点媚药对她根本没用。这条线的前提是，那个前提没有了。' },
  ];

  const ALL_ROUTES = ROUTES.concat(IRIS_ROUTES);

  const KNOWLEDGE = [
    { key: '无', blurb: '不发送原作掌握信息。' },
    { key: '全部结局', blurb: '你玩通过，包括那些坏结局。' },
    { key: '只知道大概', blurb: '记得主线，细节模糊。' },
    { key: '几乎不记得', blurb: '只记得这游戏的名字。' },
  ];

  const VIEWS = [
    { key: '克蕾雅', blurb: '你就是转生者本人。克蕾雅说什么、做什么，全由你决定。' },
    { key: '外来者', blurb: '你是另一个人。克蕾雅由 AI 扮演，你要在她的故事里插一脚。' },
    { key: '伊莉丝', blurb: '这次你站在远侧：伊莉丝线的主角是伊莉丝本人，克蕾雅那边照常运转。需要第一页启用「迷宫都市篇」。' },
  ];

    
  /* ── 出生地地图数据（与状态栏前端同一份 PANDORA_MAP_FULL，含摇篮扩展）── */
    /* ── 出生地地图：各地区的常驻角色（点地图时在节点旁显示头像）── */
    /* ── BS2 箱庭：网状图分组（点圆球进入对应箱庭）── */
  const BS_GARDENS = [
    { name: '爱丽丝 · 不可思议之国', icon: '🐇', chars: ['爱丽丝·利德尔', '妈妈爱丽丝', '女儿爱丽丝', '妹妹爱丽丝', '爱·丽·丝', '人偶爱丽丝', '爱丽丝', '爱莉丝'] },
    { name: '帽子屋的茶会', icon: '🎩', chars: ['帽子屋', '三月兔', '柴郡猫', '普利凯特', '五月雨'] },
    { name: '红心城', icon: '♥', chars: ['罗丽娜', '崔德尔·蒂', '崔德尔·达姆', '公爵夫人', '假海龟', '渡渡'] },
    { name: '白雪与魔女', icon: '❄', chars: ['玛丽·安', '诺登', '小红帽', '梅贝尔', '莉耶芙', '莱登', '蛇神'] },
    { name: '残片 · 其它箱庭', icon: '🩹', chars: ['格尔达', '格里菲', '桑尼', '芙萝', '芙洛瑞丝', '艾珀尔', '尤妮丝', '小春', '大王', '塞伊', '利奥', '卡伊埃尔', '斯雅', '提亚拉', '克缇', '班达斯奈奇', '维多利雅'] },
  ];

  const LOC_CHARS = {
    '王都': ['克蕾雅', '莉莉娅', '梅拉妮', '拉姆内', '伊莉丝', '丽塔', '艾拉', '阿黛拉', '露娜', '凯拉涅斯'],
    '塞拉丁': ['克蕾雅', '拉菲莉娅'],
    '卢娜湖镇': ['拉姆内'],
    '竞技场都市': ['丽塔', '拉菲莉娅'],
    '黑市': ['斯雅'],
    '美吉斯塔': ['艾妮希雅'],
    '联合王都': ['托莉娜'],
    '阿斯林顿': ['托莉娜'],
    '伯赫洛斯': ['盖欧露易丝', '斯提亚拉', '古伊奈'],
    '拉修赫特': ['盖欧露易丝', '古伊奈'],
    '大和国': ['古伊奈'],
    '玛依拉港': ['芙洛蒂'],
    '诺依圣域': ['芙洛蒂'],
    '阿萨伊拉姆': ['一之濑雫', '伊莉丝'],
    '格拉提亚': ['诺艾儿', '丽薇歌塔', '伊夏', '普莉姆拉', '蒂格蕾娜', '阿尔玛', '提尔德', '德尔菲尼', '梅法', '南丁格尔', '爱莉丝'],
    '纺线者之森': ['诺艾儿', '普莉姆拉', '爱莉丝'],
    '伏沦岭': ['蒂格蕾娜', '阿尔玛', '提尔德'],
    '圣域': ['德尔菲尼', '梅法', '南丁格尔'],
    '埃雷米亚': ['帕特里琪娅', '奇诺米', '蒂莎', '加莉泰娅'],
    '奥威尔堡': ['帕特里琪娅', '奇诺米', '蒂莎'],
    '圣灵教区': ['加莉泰娅'],
    '港口洛博特': ['艾尔希', '狄娜', '卡莲', '柯萝特'],
    '波莫娜教会': ['艾尔希', '狄娜'],
  };
  const LOC_CHAR_AV = {
    '一之濑雫': 'https://origin.picgo.net/2026/10/02/13bcc39120a81f21da53e7602f9fb44be44c3589799d5a5c.png',
    '丽塔': 'https://origin.picgo.net/2026/09/19/47add4de39d9d3d7f8aeee6228c46f8453aa07b8239428b3.png',
    '丽薇歌塔': 'https://origin.picgo.net/2026/10/09/a8b107fdee3322ceaf8a60dd7a8e44f1a5400ba8a91b5357.png',
    '伊夏': 'https://origin.picgo.net/2026/10/09/8a92daf62cb0dbefd47c13369d2a3723f1fa038f9a0f6fe0.png',
    '伊莉丝': 'https://origin.picgo.net/2026/09/19/2d1f3a9410fb102694138c3814c6eea58e488a9222034f2f.png',
    '克蕾雅': 'https://origin.picgo.net/2026/09/16/1409d4e13ab7c1ad7e96924a36bdd9a3482303ab0ef221c1.png',
    '南丁格尔': 'https://origin.picgo.net/2026/10/09/7ba8d84351398bde2d59f37b8576dfa103223c6e258a3bf5.png',
    '古伊奈': 'https://origin.picgo.net/2026/09/28/b6bfaa8e95ac22b482fef2f25949aa7e32c4ce6dbc25df7a.png',
    '德尔菲尼': 'https://origin.picgo.net/2026/10/09/17eb70e5e194849d2a49305239c387dcac5ade9035262b14.png',
    '托莉娜': 'https://origin.picgo.net/2026/10/02/baf1073fccd03e0d73215a07dc7621448d075e160cd34497.png',
    '拉姆内': 'https://origin.picgo.net/2026/09/16/140a45b97be03162fb8a7e59122a125807d4ba4f42278523.png',
    '拉菲莉娅': 'https://origin.picgo.net/2026/09/25/eb8b2e9da49acde3a0c1317b0955027b23ebb331418be102.png',
    '提尔德': 'https://origin.picgo.net/2026/10/09/2b6b1e8136d25067d2ea66a8009867006d68b43a8642b5ba.png',
    '斯提亚拉': 'https://origin.picgo.net/2026/09/28/b3b47ee8648ac6c5930081c384263903867ff6907683f228.png',
    '斯雅': 'https://origin.picgo.net/2026/09/26/4d26a6b4ad5b72c59bdbfc9acf8b79988691d20c23dcfea7.png',
    '普莉姆拉': 'https://origin.picgo.net/2026/10/09/f7f280b17e6d7805d7897ba696a1e20d3b8f10b29e9d8c94.png',
    '梅拉妮': 'https://origin.picgo.net/2026/09/16/31f3ea8ecb0364f11784be1d0e50200bb3a6ea2667f58b02.png',
    '梅法': 'https://origin.picgo.net/2026/10/09/5def7d08ef95a3b170e457c10a7089b027585b9f3ab31e06.png',
    '爱莉丝': 'https://origin.picgo.net/2026/10/09/e7358a0e690ac9ee8d3aa49c800ee009bfb40ef3e2806f70.png',
    '盖欧露易丝': 'https://origin.picgo.net/2026/09/28/80f2841ea5530359f4a924b182e2963f11d676a4db76088d.png',
    '艾妮希雅': 'https://origin.picgo.net/2026/09/25/35c2aa1a16d684964cdc8c58bc8438ff4dc4733308eeb8a0.png',
    '艾拉': 'https://origin.picgo.net/2026/09/16/bdf825043d9582bba3d3ec9ae02dafad295f3a856a6c53ab.png',
    '芙洛蒂': 'https://origin.picgo.net/2026/09/25/4dc6200820290c3f0850b1ef48e107eec138f9223373b60b.png',
    '莉莉娅': 'https://origin.picgo.net/2026/09/16/1b3aaf46fcec72dd5b23d8ecd9092f3b0f41accba6f103d6.png',
    '蒂格蕾娜': 'https://origin.picgo.net/2026/10/09/2ec536e01e4a1d8fa5e03a3d0108a67f6fbb29064719cdbf.png',
    '诺艾儿': 'https://origin.picgo.net/2026/10/09/dbf1773e4b140fb5d2b9b87f563b578f0d2610f2c16fcd74.png',
    '阿尔玛': 'https://origin.picgo.net/2026/10/09/c198a204eee2c132480f921abc2d8ef9a3e0f3b392fc4390.png',
    '阿黛拉': 'https://origin.picgo.net/2026/09/16/8960482acfee34f1120a7e040e65b7ba8ea28a72c3e3e1c4.png',
    '露娜': 'https://origin.picgo.net/2026/09/16/22706d19f51532c81.png',
    '凯拉涅斯': 'https://origin.picgo.net/2026/09/25/bb4a5ed33708e06d417eda8ddb0e91f68e74b80f51d10325.png',
    '加莉泰娅': 'https://origin.picgo.net/2026/09/28/afbef5e55f6f940364db2f4b914370184230cc8e002f37af.png',
    '卡莲': 'https://origin.picgo.net/2026/09/29/f42a78c5c131cbc403c3be55402bb41d33586ace93d01d27.png',
    '奇诺米': 'https://origin.picgo.net/2026/09/28/0c120bef0861efca8485e86c94aea4917f2ecc31a8c236b7.png',
    '帕特里琪娅': 'https://origin.picgo.net/2026/09/28/fbe5e0bbc4983a9368ddb8721d7589280f23e9bc35f9a04d.png',
    '柯萝特': 'https://origin.picgo.net/2026/09/29/48f0e97d0043fe4bb899f512a032bb302b834aeb8c44d345.png',
    '狄娜': 'https://origin.picgo.net/2026/09/29/1dadf45d3588c9cfec1d46185611170cc753da727fa980a1.png',
    '艾尔希': 'https://origin.picgo.net/2026/09/29/37b20dcdd51edc1af6a386bbab63d98760b6124e5ca6c745.png',
    '蒂莎': 'https://origin.picgo.net/2026/09/28/dddf9f7b026a25a6fe59bfc6e7d6bdfcd3801f07834c4e22.png',
    '三月兔': 'https://origin.picgo.net/2026/10/08/791905c560e833185bf5c86d2893563cdf5f75d6f095945b.png',
    '五月雨': 'https://origin.picgo.net/2026/09/28/73accf3be7605e89f3761656f72183e225fe340d23ced5b5.png',
    '人偶爱丽丝': 'https://origin.picgo.net/2026/10/08/02-D14585590e6b7f795.png',
    '假海龟': 'https://origin.picgo.net/2026/10/08/efc9a1ed037ff82ca2cae7188a1ed873e0d8eaa07203b795.png',
    '克缇': 'https://origin.picgo.net/2026/10/08/ff1ee1b191655fb8c9aa04f6d09f76a9f62bddd5931366d9.png',
    '公爵夫人': 'https://origin.picgo.net/2026/10/08/1216129b006b0afd1bf774045f3a143ed3455d4fb36660c9.png',
    '利奥': 'https://origin.picgo.net/2026/09/29/629723423085ca2f84dec0fb44b157ec7246078acec59370.png',
    '卡伊埃尔': 'https://origin.picgo.net/2026/09/16/02667b3c75d750d735ccf39b458b59e44df3c52454f35dd9.png',
    '塞伊': 'https://origin.picgo.net/2026/09/29/8e62b282f44ee645991192a03528683c5ffe336fdd2a15e7.png',
    '大王': 'https://origin.picgo.net/2026/09/28/70613f9cd926eb9df8dc022f17ca61912aeb9c2553cd6916.png',
    '女儿爱丽丝': 'https://origin.picgo.net/2026/10/08/89da196c1fb9669196f2ad9a6a09ec2abf29e85dad0da0fb.png',
    '妈妈爱丽丝': 'https://origin.picgo.net/2026/10/08/097e2ebda0c4b078383c2b19c4920bde1cc4125f756ef6aa.png',
    '妹妹爱丽丝': 'https://origin.picgo.net/2026/10/08/3c41af5f604c2bb1ed68f6662853c44b4f8dc8105575bad6.png',
    '小春': 'https://origin.picgo.net/2026/09/28/9c29c6d29af5d31e6b48e46ed1cffad77a6c029ca66ed4e9.png',
    '小红帽': 'https://origin.picgo.net/2026/10/08/1c4eb4a13f11a987104f66f37bd94d8546f22fe9308e15e5.png',
    '尤妮丝': 'https://origin.picgo.net/2026/10/08/ff8a0b04f4731b352285cd8c0ba4269ef74975a52f838548.png',
    '崔德尔·蒂': 'https://origin.picgo.net/2026/10/08/1c4970974e4d8539449cd885faa450aff250a6732dc135dc.png',
    '崔德尔·达姆': 'https://origin.picgo.net/2026/10/08/184a570189a0a08fbaaf3869debd0ab87efbb67d0ad87da4.png',
    '帽子屋': 'https://origin.picgo.net/2026/10/08/1ba5573147239aa7c55e7cbb16c7ca25e371d8726a04a2d4.png',
    '提亚拉': 'https://origin.picgo.net/2026/09/28/b3b47ee8648ac6c5930081c384263903867ff6907683f228.png',
    '普利凯特': 'https://origin.picgo.net/2026/10/08/ca56c10823d6dfc4a27c94ba4ea9c4511cc8a6f6aee686b3.png',
    '柴郡猫': 'https://origin.picgo.net/2026/10/08/10b332bf0cf41232d9ede85ed4d0993927a335b40acf9b6b.png',
    '格尔达': 'https://origin.picgo.net/2026/10/08/3ac5fe98a76ed9b7f07baae999747a86d28860c6dbc6fffd.png',
    '格里菲': 'https://origin.picgo.net/2026/10/08/e8d44a1d9f39317ce599d94299e3d4709d247b246f960cc2.png',
    '桑尼': 'https://origin.picgo.net/2026/09/16/a1053a15a247fce3f550d7bded6046c67cc23cbe47716f0a.png',
    '梅贝尔': 'https://origin.picgo.net/2026/10/08/27f90d0f6f0497d00bb1ceaf8115284e1b66c644216537c3.png',
    '渡渡': 'https://origin.picgo.net/2026/10/08/01c652f6295aa9d879b6edc78d15a1bc3a07d8a19355fe81.png',
    '爱·丽·丝': 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
    '爱丽丝': 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
    '爱丽丝·利德尔': 'https://origin.picgo.net/2026/10/08/fb26cbb7d5caf2b3e5bb006a54de0875c04384eb7c62cad1.png',
    '玛丽·安': 'https://origin.picgo.net/2026/10/08/68208d56a291c30f7e89bc8a5fa6fd13e1aed1c696238752.png',
    '班达斯奈奇': 'https://origin.picgo.net/2026/10/08/d366140eb2de17f66eabdfa7b8989a126df38d4017c34ae9.png',
    '维多利雅': 'https://origin.picgo.net/2026/10/08/c27572a47de3e01fb4a5455d537b355543c4223c9185e464.png',
    '罗丽娜': 'https://origin.picgo.net/2026/10/08/b997d7fef52e6eee76c4425bc3c78faf0a4b42391dc02b30.png',
    '艾珀尔': 'https://origin.picgo.net/2026/09/29/678582aa9b9eaa9a413b09fad59bf58ace7ed9acb8bc71e5.png',
    '芙洛瑞丝': 'https://origin.picgo.net/2026/09/29/98a89e9e1c99d3180fc2145b6d31506fea73cc00947be8c7.png',
    '芙萝': 'https://origin.picgo.net/2026/09/29/d42bc6bfe30dc9fba9f0bb3b72b0d96430c5e4eda1959dd9.png',
    '莉耶芙': 'https://origin.picgo.net/2026/10/08/68208d56a291c30f7e89bc8a5fa6fd13e1aed1c696238752.png',
    '莱登': 'https://origin.picgo.net/2026/10/08/38a4e9c4e0eb78bc673b4181afe01519ef722fc246ed5d7f.png',
    '蛇神': 'https://origin.picgo.net/2026/10/08/3bbc05b5fd9c50bfb6aedabd8561913e6dc51bf2e531d8b4.png',
    '诺登': 'https://origin.picgo.net/2026/10/08/77f0ce219f648a571427e5714d58240e54bdb2d9dc32d2e5.png',
  };

  const BIRTH_MAP = {
    factions: [
      { cn: "埃斯特拉德尔帝国", en: "Central Estradel Empire", dlc: "", x: 1450, y: 1120, w: 940, h: 680, color: "rgba(230, 184, 92, 0.05)", border: "rgba(230, 184, 92, 0.3)" },
      { cn: "温伯格北方帝国", en: "Northern Weinberg Imperium", dlc: "※ 需开启【医术师 / 温伯格篇】扩展", x: 1450, y: 360, w: 1050, h: 480, color: "rgba(56, 189, 248, 0.05)", border: "rgba(56, 189, 248, 0.3)" },
      { cn: "戴尔王国 · 美吉斯塔", en: "Dale Kingdom · Megista", dlc: "※ 需开启【艾妮希雅】扩展", x: 560, y: 820, w: 760, h: 600, color: "rgba(244, 114, 182, 0.05)", border: "rgba(244, 114, 182, 0.3)" },
      { cn: "联合王国疆域", en: "Eastern United Kingdom", dlc: "※ 需开启【托莉娜】扩展", x: 2400, y: 1080, w: 1000, h: 640, color: "rgba(34, 197, 94, 0.05)", border: "rgba(34, 197, 94, 0.3)" },
      { cn: "南境 · 旧拉修赫特与绝地", en: "South Lasshut & End Zone", dlc: "※ 需开启【王逝 King Exit】扩展", x: 1450, y: 1840, w: 1050, h: 540, color: "rgba(239, 68, 68, 0.06)", border: "rgba(239, 68, 68, 0.3)" },
      { cn: "海外 · 安纳托尔流放岛", en: "Anatol Isolated Isle", dlc: "※ 需开启【祈愿诗篇】扩展", x: 480, y: 1680, w: 660, h: 740, color: "rgba(168, 85, 247, 0.06)", border: "rgba(168, 85, 247, 0.35)" },
      { cn: "海外 · 凯尔维斯孤岛", en: "Kelvis Isle & Holy Realm", dlc: "※ 需开启【芙洛蒂】扩展", x: 2420, y: 1800, w: 780, h: 580, color: "rgba(45, 212, 191, 0.05)", border: "rgba(45, 212, 191, 0.35)" },
      { cn: "边陲 · 迷宫都市阿萨伊拉姆", en: "Asylum Maze Metropolis", dlc: "※ 需开启【伊莉丝】扩展", x: 2920, y: 1720, w: 460, h: 460, color: "rgba(129, 140, 248, 0.06)", border: "rgba(129, 140, 248, 0.35)" },
    
      { cn: "摇篮地带 · 西陲", en: "Cradle Frontier · West", dlc: "※ 需开启【摇篮 · 格拉提亚篇】扩展", x: -350, y: 1000, w: 760, h: 1180, color: "rgba(212, 165, 216, 0.05)", border: "rgba(212, 165, 216, 0.32)" },],
    nodes: [
      { id: "王都", name: "王都", nation: "埃斯特拉德尔帝国", type: "capital", icon: "🏛️", x: 1450, y: 1100, desc: "帝国全境中心，皇室与元老院所在。", cost: "中心原点", fanAngle: 90, subs: ["学院", "瓦莱里安公爵邸", "贵族街区", "商店街", "花街"] },
      { id: "塞拉丁", name: "塞拉丁", nation: "埃斯特拉德尔帝国", type: "city", icon: "🏚️", x: 1120, y: 1080, desc: "瓦莱里安家荒废领地，形同贫民窟。", cost: "马车 1~2日", fanAngle: 180, subs: ["领主馆", "贫民窟巷", "魔力矿脉"] },
      { id: "卢娜湖镇", name: "卢娜湖镇", nation: "埃斯特拉德尔帝国", type: "city", icon: "🐺", x: 1450, y: 820, desc: "北方兽人居留地，镇守北方魔物。", cost: "马车 3~4日", fanAngle: 0, subs: ["镇广场", "兽人村", "温泉", "湖畔"] },
      { id: "竞技场都市", name: "竞技场都市", nation: "埃斯特拉德尔帝国", type: "city", icon: "⚔️", x: 1450, y: 1380, desc: "南部繁华斗技都市，黑市入口。", cost: "马车 2日", fanAngle: 90, subs: ["斗技场正门", "黑市检查站"] },
      { id: "试炼之塔", name: "试炼之塔", nation: "灵魂表层", type: "special", icon: "🗼", x: 1650, y: 1220, desc: "灵魂表层独立结界空间。", cost: "意识投影", fanAngle: 45, subs: ["塔之入口", "因果律中枢"] },
      { id: "黑市", name: "异界黑市", nation: "非常规异界", type: "special", icon: "🎭", x: 1680, y: 1420, desc: "需凭特许进入的异界黑市。", cost: "特许检查站", fanAngle: 0, subs: ["异界市场", "拍卖行"] },
      { id: "埃雷米亚", name: "帝都埃雷米亚", nation: "温伯格帝国", type: "capital", icon: "🏰", x: 1560, y: 260, desc: "北境大帝国，军靴与教派并立。", cost: "跨国干道 7日+", fanAngle: 270, subs: ["皇宫", "卡米尔特学院", "近卫师团驻地"] },
      { id: "奥威尔堡", name: "奥威尔堡", nation: "温伯格帝国", type: "city", icon: "⚙️", x: 1180, y: 380, desc: "工业领主都市，阶级森严。", cost: "跨国 6日", fanAngle: 180, subs: ["铁丝网街", "船底贫民区", "地下斗技场"] },
      { id: "圣灵教区", name: "圣灵教区", nation: "温伯格帝国", type: "city", icon: "🕊️", x: 1850, y: 360, desc: "茨塔尔正教城镇，严禁武器。", cost: "渡河 1日", fanAngle: 0, subs: ["教会", "圣火塔", "禁书室"] },
      { id: "迷雾_迪娜碎片", name: "[???] 坠星禁区迪娜", nation: "温伯格禁忌地", type: "fog", icon: "☄️", x: 940, y: 220, desc: "古代星船坠落之地，大圣女故乡，时空撕裂碎片。", cost: "封锁禁足", subs: ["古代地底遗迹", "星船残骸"] },
      { id: "美吉斯塔", name: "美吉斯塔市街", nation: "戴尔王国", type: "city", icon: "⚜️", x: 620, y: 820, desc: "东部萧条旧领，黑纹咒术笼罩之地。", cost: "边境", fanAngle: 90, subs: ["小教堂", "日影大道贫民区", "地下会所"] },
      { id: "迷雾_毒龙", name: "[???] 毒龙残骸", nation: "美吉斯塔禁地", type: "fog", icon: "🐉", x: 400, y: 720, desc: "卡拜因地底王朝覆灭源头，被冥约咒术操控。", cost: "极度危险", subs: ["地底遗迹", "冥约之石"] },
      { id: "迷雾_拉斯提姆", name: "[???] 拉斯提姆深穴", nation: "异界淫界", type: "fog", icon: "🕳️", x: 420, y: 960, desc: "契约魔灵巢穴，充斥魔性诱惑。", cost: "异界裂口", subs: ["魔灵据点"] },
      { id: "联合王都", name: "联合王都", nation: "联合王国", type: "capital", icon: "👑", x: 2150, y: 1040, desc: "大陆东部腹地之王国，魔导繁盛。", cost: "东部干线 5日", fanAngle: 270, subs: ["皇宫", "神学院", "第一王子研究所"] },
      { id: "阿斯林顿", name: "阿斯林顿", nation: "联合王国", type: "city", icon: "🏹", x: 2420, y: 1080, desc: "勇者封印魔王的前线要冲。", cost: "驿站 3日", fanAngle: 90, subs: ["公会", "富人街", "娼馆", "赌场"] },
      { id: "诺娜瓦灵峰", name: "诺娜瓦灵峰", nation: "联合王国", type: "fortress", icon: "🏔️", x: 2680, y: 1020, desc: "设有通往魔王城传送阵的高耸古峰。", cost: "攀登 2日", fanAngle: 270, subs: ["雪山小屋", "传送阵"] },
      { id: "魔王城", name: "云上魔王城", nation: "远古极恶之所", type: "fortress", icon: "👁️", x: 2950, y: 980, desc: "漂浮于云层之上的魔王封印之殿。", cost: "传送直达", fanAngle: 0, subs: ["魔王心脏房间", "昔日勇者残影"] },
      { id: "伯赫洛斯", name: "伯赫洛斯", nation: "南境旧都", type: "fortress", icon: "⛓️", x: 1450, y: 1760, desc: "七年前陷落的旧都，现为魔族据点与庞大监狱。", cost: "险道 数周", fanAngle: 90, subs: ["王座", "地下监牢", "拷问室"] },
      { id: "拉修赫特", name: "城下街", nation: "拉修赫特残部", type: "city", icon: "🛡️", x: 1140, y: 1740, desc: "龙骑士团大本营。", cost: "跋涉 10日+", fanAngle: 180, subs: ["龙骑士团大本营", "终战纪念桥"] },
      { id: "大和国", name: "大和国", nation: "南方独立武国", type: "capital", icon: "🌸", x: 1820, y: 1880, desc: "五月雨统治的独立武国。", cost: "远航 3周", fanAngle: 0, subs: ["樱花城", "武馆街", "神社"] },
      { id: "迷雾_终末魔域", name: "[???] 传说的终末", nation: "南境极南魔域", type: "fog", icon: "🌋", x: 1450, y: 2050, desc: "人类与魔族终结点，熔岩洞窟最深处。", cost: "死地", subs: ["熔岩广场", "最后的世界"] },
      { id: "港口洛博特", name: "港口洛博特", nation: "安纳托尔孤岛", type: "city", icon: "⚓", x: 540, y: 1620, desc: "恶徒与奴隶自治港。", cost: "渡海大船", fanAngle: 90, subs: ["中央医院", "高帕尔学园", "地下街"] },
      { id: "波莫娜教会", name: "波莫娜教会总部", nation: "安纳托尔孤岛", type: "fortress", icon: "⛪", x: 320, y: 1450, desc: "赛法尔雪原旁的黑暗信仰决战地。", cost: "穿越雪原 2日", fanAngle: 180, subs: ["教会本部", "地下人类工厂"] },
      { id: "迷雾_世界中心", name: "[???] 人魔根源", nation: "安纳托尔深层", type: "fog", icon: "🌀", x: 260, y: 1860, desc: "世界最深处，连结所有魔核的无底深渊。", cost: "界外", subs: ["深层根源之核"] },
      { id: "玛依拉港", name: "玛依拉港", nation: "凯尔维斯孤岛", type: "city", icon: "🏖️", x: 2320, y: 1720, desc: "光耀与夜母信仰冲突之港。", cost: "远洋航行", fanAngle: 270, subs: ["旧神殿", "伊纳克村", "海德拉商会"] },
      { id: "诺依圣域", name: "诺依圣域", nation: "凯尔维斯孤岛", type: "fortress", icon: "🌿", x: 2620, y: 1840, desc: "善神夜母支派的隐秘圣域。", cost: "秘境潜行", fanAngle: 0, subs: ["妖香之森", "海岸洞窟"] },
      { id: "迷雾_天神草", name: "[???] 天神草伪神域", nation: "恶神试验场", type: "fog", icon: "🌱", x: 2180, y: 1920, desc: "吞噬高纯度神血诞生的恐怖伪神植物。", cost: "死线", subs: ["天神草母核", "人偶工坊"] },
      { id: "阿萨伊拉姆", name: "阿萨伊拉姆", nation: "边陲 · 迷宫都市", type: "city", icon: "🕳️", x: 2920, y: 1720, desc: "迷宫都市阿萨伊拉姆，位于潘多拉大陆遥远边陲地带。大阶梯向下是地下深穴，向上是上层废墟。", cost: "极远边陲 · 长途跋涉", fanAngle: 180, subs: ["迷宫大阶梯", "上层废墟", "地下深穴探针"] },
    
      { id: "格拉提亚", name: "格拉提亚", nation: "格拉提亚城邦", type: "capital", icon: "🎀", x: -350, y: 1120, desc: "恩惠之城，潘多拉大陆西陲边区首邑。市议会、冒险者公会、拉库鲁斯教团西陲教区、贝尔米特国立大学四根柱子撑着。", cost: "南面官道 10日~2周", fanAngle: 90, subs: ["城区", "天空设施", "贝尔米特国立大学", "城内设施", "魔女庭院"] },
      { id: "纺线者之森", name: "纺线者之森", nation: "格拉提亚城邦", type: "fog", icon: "🌲", x: -350, y: 1520, desc: "包围格拉提亚的森林，魔物密度最高，深处有巨树与古代遗迹群。", cost: "城郊 半日", fanAngle: 180, subs: ["钟楼残垣", "石碑大道", "酸液巨树·黑宝石大门", "栖蛙黑沼", "迷途者的归宿"] },
      { id: "伏沦岭", name: "伏沦岭", nation: "伏沦矿工部落", type: "city", icon: "⛰️", x: -350, y: 760, desc: "山地，兽人矿工部落与伏沦乡的集落在此；魔力稀薄，反而相对安全。", cost: "山道 2日", fanAngle: 0, subs: ["伏沦乡", "伏沦教会", "伏沦矿工部落", "考古研究所", "废弃的藏身居所"] },
      { id: "圣域", name: "圣域", nation: "无属禁忌之地", type: "fortress", icon: "⛪", x: -350, y: 430, desc: "更北的禁忌之地，魔素最浓、魔物最强，圣遗物祭坛设于此。", cost: "越岭穿林 数日", fanAngle: 0, subs: ["参道", "圣遗物祭坛", "圣域外围"] },],
    connections: [
      { from: "王都", to: "塞拉丁", type: "main-road" },
      { from: "王都", to: "卢娜湖镇", type: "main-road" },
      { from: "王都", to: "竞技场都市", type: "main-road" },
      { from: "王都", to: "美吉斯塔", type: "main-road" },
      { from: "卢娜湖镇", to: "奥威尔堡", type: "main-road" },
      { from: "奥威尔堡", to: "埃雷米亚", type: "main-road" },
      { from: "奥威尔堡", to: "圣灵教区", type: "main-road" },
      { from: "奥威尔堡", to: "迷雾_迪娜碎片", type: "isolated" },
      { from: "美吉斯塔", to: "迷雾_毒龙", type: "isolated" },
      { from: "美吉斯塔", to: "迷雾_拉斯提姆", type: "isolated" },
      { from: "王都", to: "联合王都", type: "main-road" },
      { from: "联合王都", to: "阿斯林顿", type: "main-road" },
      { from: "阿斯林顿", to: "诺娜瓦灵峰", type: "main-road" },
      { from: "诺娜瓦灵峰", to: "魔王城", type: "isolated" },
      { from: "竞技场都市", to: "伯赫洛斯", type: "main-road" },
      { from: "伯赫洛斯", to: "拉修赫特", type: "main-road" },
      { from: "伯赫洛斯", to: "大和国", type: "main-road" },
      { from: "伯赫洛斯", to: "迷雾_终末魔域", type: "isolated" },
      { from: "竞技场都市", to: "黑市", type: "isolated" },
      { from: "王都", to: "试炼之塔", type: "isolated" },
      { from: "塞拉丁", to: "港口洛博特", type: "isolated" },
      { from: "港口洛博特", to: "波莫娜教会", type: "main-road" },
      { from: "港口洛博特", to: "迷雾_世界中心", type: "isolated" },
      { from: "阿斯林顿", to: "玛依拉港", type: "isolated" },
      { from: "玛依拉港", to: "诺依圣域", type: "main-road" },
      { from: "玛依拉港", to: "迷雾_天神草", type: "isolated" },
      { from: "玛依拉港", to: "阿萨伊拉姆", type: "isolated" },
    
    { from: "王都", to: "格拉提亚", type: "isolated" },
    { from: "格拉提亚", to: "纺线者之森", type: "main-road" },
    { from: "格拉提亚", to: "伏沦岭", type: "main-road" },
    { from: "伏沦岭", to: "圣域", type: "isolated" },]
  };

  const state = {
    page: 0,
    maxPage: 7,
    chapter: '',
    labChapter: '',
    keChapter: '',
    ijChapter: '',
    pgChapter: '',
    freeCustomKey: '学院冒险开局(自输入搭档)',
    worldCrisis: { on: false, name: '', intro: '', goal: '', progress: '',
                   phase: 'Ⅰ', phaseImpact: '', nextPhase: '', worldImpact: '', countdown: '' },
    wcPresetKey: 'blank',
    customOpenings: [],   /* [{name, text}] 自定义开局预设库 */
    customOpening: '',    /* 兼容旧存档/当前编辑中的正文 */
    route: '',
    knowledge: '无',
    view: '外来者',
    name: '',
    gender: '无',
    gold: '根据人设', 
    power: '', 
    past: '',
    /* 严格遵循变量结构的 user 扩展字段 */
    userExtra: {
      身份: '外来旅人',
      服装: '旅人常服',
      状态: '状态完好',
      风评: '籍籍无名',
      身体: '健康',
      淫乱度: 0,
      世界接纳度: 0,
      契约: '无'
    },
    userSkills: [],   // { 名称, 流派, 熟练度, 介绍, 提升方法 }
    userTraits: [],   // { 名称, 分类, 描述 }
    userAssets: [],   // { 名称, 类型, 位置, 规模, 状态, 建设序列, 产出, 住客, 分配 }
    customCompanions: [], // 👥 开局同伴名册库：[{ 姓名, 登场, 关系, 羁绊, 身份, 战力水平, 服装, 身体状态, 亲密程度, 性吸引力, 金币, 动向, 来历 }]
    openingText: '',
    openingTouched: false,
    birthPlace: '',
    birthSub: '',
    openTab: 'free',
    futaChars: [],
    futaCustom: '',
    works: { 克蕾雅篇: true, 迷宫都市篇: true },
    mode: '自由模式',
    /* 学院模式：所选区块与所选入学开局（影响 composeText 的【学院编成】段） */
    academyClassId: 'class_a',
    academyItemKey: '',
    academyCharName: '',
    /* 学院模式 · 全自定义开局 */
    acaCustomOpen: false,
    acaCustomIdentity: '',
    acaCustomRelation: '',
    acaCustomScene: '',
    villain: false,
    stories: { 克蕾雅剧情: false, 迷宫都市剧情: false, 王逝剧情: false, 医术师剧情: false, 祈愿诗篇剧情: false },
    openChapters: { 克蕾雅章节: false, 迷宫都市章节: false, 自由模式章节: true, 王逝南境章节: false, 医术师温伯格章节: false, 祈愿诗篇安纳托尔章节: false },
    sideOpen: { 克蕾雅支线: false, 伊莉丝支线: false },
    workHint: '',
    linkMode: true,
    linkChars: { '响木天音': true, '托莉娜': true, '芙洛蒂': false, '艾妮希雅': false, '夏洛特': false, '一之濑雫': false, '王逝-南境篇': true, '医术师-温伯格篇': true, '祈愿诗篇-安纳托尔岛篇': true, 'BS2-残片篇': true, '摇篮-格拉提亚篇': true },
    currentLinkChar: '响木天音'
  };

  /* ── 偏好设置持久化缓存 ── */
  const KRS_STORAGE_KEY = 'KRS_FATE_BOOK_PREFERENCES_V1';

  function loadPersistedState() {
    try {
      const raw = localStorage.getItem(KRS_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;

      if (saved.linkChars && typeof saved.linkChars === 'object') {
        Object.assign(state.linkChars, saved.linkChars);
      }
      /* v2：五大联动扩展改成默认全开。老存档只迁移这一次，玩家之后自己关的不会再被强行打开 */
      if (saved.__v !== 2) {
        ['王逝-南境篇', '医术师-温伯格篇', '祈愿诗篇-安纳托尔岛篇', 'BS2-残片篇', '摇篮-格拉提亚篇']
          .forEach(function (k) { state.linkChars[k] = true; });
        state.linkMode = true;
        state.__needPersist = true;
      }
      if (saved.works && typeof saved.works === 'object') {
        Object.assign(state.works, saved.works);
      }
      if (typeof saved.linkMode === 'boolean') state.linkMode = saved.linkMode;
      if (saved.mode) state.mode = saved.mode;
      /* v3：默认模式必须是「自由模式」。老存档里存的学院模式等一律复位，
         否则新卡导入后会莫名其妙直接进学院模式 */
      if (saved.__v !== 3) {
        state.mode = '自由模式';
        state.stories = state.stories || {};
        Object.keys(state.stories).forEach(function (k) { state.stories[k] = false; });
        state.__needPersist = true;
      }
      if (Array.isArray(saved.futaChars)) state.futaChars = saved.futaChars;
      if (saved.gender) state.gender = saved.gender;
      if (saved.knowledge) state.knowledge = saved.knowledge;
      if (saved.gold) state.gold = saved.gold;
      if (Array.isArray(saved.customCompanions)) state.customCompanions = saved.customCompanions;
      if (typeof saved.customOpening === 'string') state.customOpening = saved.customOpening;
      if (saved.worldCrisis && typeof saved.worldCrisis === 'object') Object.assign(state.worldCrisis, saved.worldCrisis);
      if (typeof saved.wcPresetKey === 'string') state.wcPresetKey = saved.wcPresetKey;
      if (Array.isArray(saved.customOpenings)) {
        state.customOpenings = saved.customOpenings.filter(function (x) { return x && typeof x.text === 'string'; })
          .map(function (x) { return { name: String(x.name || '未命名'), text: String(x.text) }; });
      }
      /* 旧存档里只有一条 customOpening 时，自动迁移成预设库里的一条 */
      if (!state.customOpenings.length && state.customOpening) {
        state.customOpenings.push({ name: '未命名开局', text: state.customOpening });
      }
    } catch (e) {
      console.warn('[命运之书] 读取本地偏好失败：', e);
    }
  }

  function persistCurrentState() {
    try {
      const toSave = {
        linkMode: state.linkMode,
        linkChars: state.linkChars,
        works: state.works,
        mode: state.mode,
        futaChars: state.futaChars,
        gender: state.gender,
        knowledge: state.knowledge,
        gold: state.gold,
        customCompanions: state.customCompanions,
        __v: 3,
        customOpening: state.customOpening,
        customOpenings: state.customOpenings,
        worldCrisis: state.worldCrisis,
        wcPresetKey: state.wcPresetKey
      };
      localStorage.setItem(KRS_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('[命运之书] 写入本地偏好失败：', e);
    }
  }

  loadPersistedState();

  const SHADOW_CSS = `
    :host {
      --krs-ink: #0b0912;
      --krs-ink2: #161224;
      --krs-line: #382e4e;
      --krs-gold: #c9a54e;
      --krs-gold-soft: rgba(201,165,78,0.12);
      --krs-gold-hover: #e0be6c;
      --krs-gold2: #84682c;
      --krs-text: #ece6d8;
      --krs-dim: #9991a6;
      --krs-red: #ba434b;
      --krs-red-soft: rgba(186,67,75,0.15);

      display: block;
      width: 100%;
      max-width: 100%;
      margin: 0;
      font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", Georgia, serif;
      color: var(--krs-text);
      line-height: 1.65;
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .book-shell {
      position: relative;
      isolation: isolate;
      min-height: 560px;
      background: var(--krs-ink);
      border-top: 1px solid var(--krs-gold2);
      border-bottom: 1px solid var(--krs-gold2);
      box-shadow: 0 18px 50px rgba(0,0,0,0.65);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .book-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -2;
      background-image: var(--bg-current, url("${DEFAULT_BG}"));
      background-size: cover;
      background-position: center 32%;
      background-repeat: no-repeat;
      opacity: 1;
      transition: opacity 0.5s ease, filter 0.5s ease, background-image 0.5s ease;
      pointer-events: none;
    }
    .book-shell::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background:
        linear-gradient(180deg,
          rgba(10,8,16,0.30) 0%,
          rgba(10,8,16,0.06) 26%,
          rgba(10,8,16,0.32) 60%,
          rgba(10,8,16,0.90) 100%),
        radial-gradient(120% 80% at 18% 100%, rgba(10,8,16,0.62) 0%, transparent 60%);
      opacity: 1;
      transition: opacity 0.45s ease;
      pointer-events: none;
    }
    .book-shell[data-current-page="0"]::before { opacity: 1; }
    .book-shell[data-current-page="0"]::after  { opacity: 1; }
    .book-shell:not([data-current-page="0"])::before {
      opacity: 0.22;
      filter: saturate(0.8) brightness(0.9);
    }
    .book-shell:not([data-current-page="0"])::after {
      opacity: 0.65;
      background: linear-gradient(180deg,
        rgba(11,9,18,0.76) 0%,
        rgba(11,9,18,0.84) 50%,
        rgba(11,9,18,0.90) 100%);
    }

    /* ── 顶部全局导航指示条 (Stepper) ── */
    .stepper-nav {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      padding: 14px 28px 10px;
      background: rgba(14, 11, 20, 0.85);
      border-bottom: 1px solid var(--krs-line);
      backdrop-filter: blur(6px);
      overflow-x: auto;
      gap: 10px;
    }
    .step-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-width: 85px;
      cursor: pointer;
      background: transparent;
      border: none;
      padding: 0;
      text-align: left;
      font-family: inherit;
      opacity: 0.55;
      transition: all 0.2s ease;
    }
    .step-item:hover { opacity: 0.9; }
    .step-item.active { opacity: 1; }
    .step-item-bar {
      height: 3px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 2px;
      transition: background 0.25s ease;
    }
    .step-item.active .step-item-bar {
      background: var(--krs-gold);
      box-shadow: 0 0 8px rgba(201,165,78,0.6);
    }
    .step-item.completed .step-item-bar {
      background: var(--krs-gold2);
    }
    .step-item-title {
      font-size: 12px;
      color: var(--krs-dim);
      letter-spacing: 0.05em;
      white-space: nowrap;
      transition: color 0.2s;
    }
    .step-item.active .step-item-title {
      color: var(--krs-gold);
      font-weight: bold;
    }
    @media (max-width: 780px) {
      .stepper-nav { padding: 10px 14px 8px; }
      .step-item-title { font-size: 10.5px; }
    }

    /* ── 第三幕：三大头像视点卡片排版 ── */
    .view-cards-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 14px;
    }
    @media (max-width: 650px) {
      .view-cards-row { grid-template-columns: 1fr; }
    }
    .view-card-btn {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: rgba(22, 18, 32, 0.75);
      border: 1.5px solid var(--krs-line);
      border-radius: 10px;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-text);
      transition: all 0.22s ease;
      user-select: none;
    }
    .view-card-btn * { pointer-events: none; } /* 🌟 核心防踩坑：禁止子元素截获点击事件 */
    .view-card-btn.view-card-text-only {
      padding-left: 18px;
    }
    .view-card-btn.disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .view-card-btn:hover {
      border-color: var(--krs-gold2);
      background: rgba(32, 26, 48, 0.85);
      transform: translateY(-2px);
    }
    .view-card-btn.active {
      border-color: var(--krs-gold);
      background: linear-gradient(135deg, rgba(201,165,78,0.2) 0%, rgba(30, 24, 45, 0.85) 100%);
      box-shadow: 0 0 16px rgba(201,165,78,0.35);
    }
    .view-card-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1.5px solid var(--krs-line);
      overflow: hidden;
      flex-shrink: 0;
      background: #111;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .view-card-btn.active .view-card-avatar {
      border-color: var(--krs-gold);
      box-shadow: 0 0 10px rgba(201,165,78,0.5);
    }
    .view-card-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .view-card-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .view-card-title { font-size: 14.5px; font-weight: 700; color: #fff; }
    .view-card-btn.active .view-card-title { color: var(--krs-gold); }
    .view-card-desc { font-size: 11px; color: var(--krs-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    /* 原著主角极简面板卡 */
    .canon-simple-card {
      background: rgba(18, 14, 26, 0.75);
      border: 1px solid var(--krs-line);
      border-left: 3px solid var(--krs-gold);
      border-radius: 8px;
      padding: 16px 18px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .canon-notice-banner {
      font-size: 15px;
      font-weight: 700;
      color: #ffe89e;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 8px;
      border-bottom: 1px dashed rgba(255,255,255,0.1);
    }

    /* 增强质感与可视化的输入单元 */
    .field-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(10, 8, 16, 0.45);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 6px;
      padding: 8px 10px;
      transition: border-color 0.2s;
    }
    .field-box:focus-within {
      border-color: rgba(201,165,78,0.5);
      background: rgba(14, 11, 22, 0.65);
    }
    .field-label {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--krs-gold);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .field-label svg { opacity: 0.85; }

    /* ── 第三幕：极简高度集成化外来者工作台 ── */
    .outlander-workbench {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 10px;
    }
    .wb-tabs-bar {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid var(--krs-line);
      padding-bottom: 8px;
      flex-wrap: wrap;
    }
    .wb-sub-tab {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--krs-line);
      color: var(--krs-dim);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .wb-sub-tab:hover { border-color: var(--krs-gold2); color: #fff; }
    .wb-sub-tab.active {
      background: rgba(201,165,78,0.18);
      border-color: var(--krs-gold);
      color: var(--krs-gold);
      box-shadow: 0 0 10px rgba(201,165,78,0.3);
    }
    .wb-sub-pane { display: none; animation: krsFade 0.2s ease; }

    /* ── 名册卡片与表单样式 ── */
    .comp-form-box {
      background: rgba(14, 11, 20, 0.75);
      border: 1px dashed rgba(201, 165, 78, 0.35);
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .comp-roster-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .comp-card {
      background: rgba(22, 17, 32, 0.85);
      border: 1.5px solid var(--krs-line);
      border-radius: 6px;
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
    }
    .comp-card.active {
      border-color: var(--krs-gold);
      background: rgba(30, 24, 45, 0.9);
      box-shadow: 0 0 12px rgba(201,165,78,0.25);
    }
    .comp-card-main {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }
    .comp-card-title {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .comp-card.active .comp-card-title { color: var(--krs-gold); }
    .comp-tag {
      font-size: 11px;
      padding: 1px 6px;
      border-radius: 3px;
      background: rgba(255,255,255,0.08);
      color: #bbb;
    }
    .comp-card-sub {
      font-size: 11.5px;
      color: var(--krs-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .comp-card-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .comp-btn-toggle {
      font-size: 11.5px;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--krs-line);
      color: var(--krs-dim);
      transition: all 0.15s;
    }
    .comp-btn-toggle.active {
      background: rgba(201, 165, 78, 0.25);
      border-color: var(--krs-gold);
      color: #ffd88a;
      font-weight: bold;
    }
    .comp-btn-action {
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      background: transparent;
      border: 1px solid var(--krs-line);
      color: var(--krs-dim);
      cursor: pointer;
      font-family: inherit;
    }
    .comp-btn-action:hover { border-color: #fff; color: #fff; }
    .comp-btn-del:hover { border-color: var(--krs-red); color: var(--krs-red); }
    .wb-sub-pane.active { display: block; }

    /* 高度集成卡片 */
    .wb-card {
      background: rgba(18, 14, 26, 0.7);
      border: 1px solid var(--krs-line);
      border-radius: 8px;
      padding: 14px 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    }
    .wb-card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px dashed rgba(201,165,78,0.25);
    }
    .wb-card-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--krs-gold);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .wb-card-btn {
      font-size: 11.5px;
      padding: 3px 10px;
      background: rgba(201,165,78,0.15);
      border: 1px solid var(--krs-gold);
      color: var(--krs-gold);
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }
    .wb-card-btn:hover { background: var(--krs-gold); color: #111; }
    .wb-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .wb-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    @media (max-width: 780px) {
      .wb-grid-2, .wb-grid-3 { grid-template-columns: 1fr; }
    }

    /* 状态栏同款资产与技能选择胶囊栏 */
    .wb-slider-bar {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 12px;
      scrollbar-width: thin;
    }
    .wb-pill-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: rgba(26, 20, 38, 0.6);
      border: 1px solid var(--krs-line);
      border-radius: 8px;
      cursor: pointer;
      white-space: nowrap;
      color: var(--krs-text);
      font-size: 12.5px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .wb-pill-item:hover { border-color: var(--krs-gold2); }
    .wb-pill-item.active {
      border-color: var(--krs-gold);
      background: rgba(201,165,78,0.18);
      color: var(--krs-gold);
      box-shadow: 0 0 10px rgba(201,165,78,0.3);
    }
    .wb-stage-detail {
      background: rgba(14, 11, 20, 0.7);
      border: 1px solid var(--krs-line);
      border-radius: 8px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .border-top {
      position: relative;
      z-index: 1;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--krs-gold), transparent);
      opacity: 0.8;
    }
    .stage {
      position: relative;
      z-index: 1;
      padding: 0;
      min-height: 480px;
      display: flex;
      flex-direction: column;
    }

    .page { display: none !important; }
    .page.active { display: block !important; animation: krsFade 0.25s ease both; }
    @keyframes krsFade {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .page:not(.cover-page) {
      width: 100%;
      max-width: 980px;
      margin: 0 auto;
      padding: 30px 36px 22px;
    }

    .cover-page {
      position: relative;
      display: none;
      width: 100%;
      min-height: 560px;
      overflow: hidden;
    }
    .cover-page.active { display: block !important; }
    .cover-copy {
      position: relative;
      z-index: 2;
      min-height: 560px;
      padding: 44px 56px 50px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .cover-badge {
      font-size: 13px;
      letter-spacing: 0.28em;
      color: rgba(240, 230, 210, 0.94);
      border: 1px solid rgba(201,165,78,0.72);
      background: rgba(10,8,16,0.30);
      padding: 5px 14px;
      border-radius: 20px;
      margin-bottom: 18px;
      backdrop-filter: blur(2px);
    }
    .cover-title {
      font-size: 42px;
      letter-spacing: 0.34em;
      color: #f7f0e3;
      margin-bottom: 8px;
      text-shadow: 0 2px 18px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.45);
    }
    .cover-sub {
      font-size: 15px;
      letter-spacing: 0.44em;
      color: rgba(224, 190, 108, 0.96);
      margin-bottom: 20px;
      text-shadow: 0 1px 8px rgba(0,0,0,0.85);
    }
    .cover-intro {
      max-width: 560px;
      font-size: 14.5px;
      line-height: 1.9;
      color: rgba(236, 230, 216, 0.88);
      margin-bottom: 30px;
      text-shadow: 0 1px 6px rgba(0,0,0,0.75);
    }

    /* ───────── 首页：大图作品选择卡 ───────── */
    .work-pick {
      width: 100%;
      max-width: 640px;
      margin: 8px 0 26px;
      padding: 16px 16px 14px;
      border: 1px solid rgba(201,165,78,0.30);
      border-radius: 8px;
      background: rgba(10,8,16,0.58);
      backdrop-filter: blur(4px);
      box-shadow: 0 12px 34px rgba(0,0,0,0.45);
    }
    .work-pick-title {
      font-size: 12.5px;
      letter-spacing: 0.30em;
      color: var(--krs-gold);
      margin-bottom: 12px;
      opacity: 0.92;
    }
    .work-pick-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .work-toggle {
      position: relative;
      display: grid;
      grid-template-columns: 118px minmax(0, 1fr);
      align-items: stretch;
      min-height: 136px;
      padding: 0;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-text);
      border: 1px solid var(--krs-line);
      border-radius: 7px;
      background: rgba(14,11,20,0.82);
      overflow: hidden;
      transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
    }
    .work-toggle:hover {
      transform: translateY(-2px);
      border-color: var(--krs-gold2);
      background: rgba(24,19,34,0.9);
    }
    .work-toggle.on {
      border-color: var(--krs-gold);
      background: rgba(30,24,42,0.92);
      box-shadow: 0 0 0 1px var(--krs-gold), 0 10px 26px rgba(0,0,0,0.42);
    }
    .work-toggle .wt-figure {
      position: relative;
      background-size: cover;
      background-position: center top;
      background-repeat: no-repeat;
      filter: grayscale(1) brightness(0.36) contrast(0.9);
      transition: filter .32s ease;
    }
    .work-toggle .wt-figure::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(14,11,20,0) 40%, rgba(14,11,20,0.94) 100%);
      transition: background .32s ease;
    }
    .work-toggle.on .wt-figure { filter: none; }
    .work-toggle.on .wt-figure::after {
      background: linear-gradient(90deg, rgba(30,24,42,0) 40%, rgba(30,24,42,0.94) 100%);
    }
    .work-toggle .wt-body {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 7px;
      min-width: 0;
    }
    .work-toggle .wt-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }
    .work-toggle .wt-head strong {
      font-size: 15.5px;
      letter-spacing: 0.08em;
      font-weight: 600;
      color: var(--krs-dim);
      transition: color .22s ease;
    }
    .work-toggle.on .wt-head strong { color: var(--krs-gold); }
    .work-toggle .wt-state {
      font-size: 11.5px;
      letter-spacing: 0.12em;
      color: var(--krs-dim);
      transition: color .22s ease;
    }
    .work-toggle.on .wt-state { color: var(--krs-gold); }
    .work-toggle .wt-body small {
      font-size: 12px;
      line-height: 1.6;
      color: var(--krs-dim);
      opacity: 0.92;
    }
    .work-hint { margin-top: 12px; font-size: 12px; color: var(--krs-dim); line-height: 1.6; }
    .work-hint.err { color: var(--krs-red); }

    /* ───────── 翻开书页按钮 ───────── */
    .cover-start {
      position: relative;
      cursor: pointer;
      font-family: inherit;
      display: block;
      width: 100%;
      max-width: 520px;
      text-align: center;
      padding: 17px 58px 17px 22px;
      font-size: 17px;
      letter-spacing: 0.34em;
      text-indent: 0.34em;
      color: var(--krs-gold);
      font-weight: 600;
      border: 1px solid var(--krs-gold2);
      border-radius: 3px;
      background: linear-gradient(180deg, rgba(201,165,78,0.18), rgba(201,165,78,0.03));
      box-shadow: 0 10px 28px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(201,165,78,0.10);
      transition: all .2s ease;
    }
    .cover-start::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, transparent, var(--krs-gold), transparent);
      opacity: 0.85;
    }
    .cover-start::after {
      content: "›";
      position: absolute;
      top: 50%;
      right: 22px;
      transform: translateY(-54%);
      font-size: 26px;
      font-weight: 300;
      color: currentColor;
      opacity: 0.9;
    }
    .cover-start:hover {
      color: var(--krs-ink);
      border-color: var(--krs-gold-hover);
      background: linear-gradient(180deg, var(--krs-gold-hover), var(--krs-gold));
      box-shadow: 0 14px 34px rgba(0,0,0,0.6), 0 0 26px rgba(201,165,78,0.35);
      transform: translateX(4px);
    }

    .header {
      border-bottom: 1px solid var(--krs-line);
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
      flex-wrap: wrap;
    }
    .h-title {
      font-size: 23px;
      color: var(--krs-gold);
      letter-spacing: 0.2em;
      font-weight: 600;
    }
    .h-desc {
      font-size: 13.5px;
      color: var(--krs-dim);
      margin-top: 4px;
    }

    .view-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 280px;
      gap: 24px;
      align-items: start;
    }
    .claire-sprite {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 6px;
      transition: opacity 0.3s ease, transform 0.3s ease;
      min-width: 0;
    }
    .claire-sprite.hidden {
      opacity: 0;
      transform: translateY(8px);
      pointer-events: none;
    }
    .claire-sprite img {
      display: block;
      width: 100%;
      max-width: 280px;
      height: auto;
      filter: drop-shadow(0 10px 24px rgba(0,0,0,0.55));
    }
    .claire-sprite .sprite-name {
      margin-top: 12px;
      font-size: 13px;
      letter-spacing: 0.3em;
      color: var(--krs-gold);
      text-shadow: 0 1px 6px rgba(0,0,0,0.7);
    }
    .claire-sprite .sprite-note {
      margin-top: 4px;
      font-size: 12px;
      letter-spacing: 0.12em;
      color: var(--krs-dim);
    }

    .form-row {
      display: flex;
      gap: 14px;
      align-items: center;
      margin-bottom: 16px;
      min-width: 0;
    }
    .form-row > label {
      width: 90px;
      flex-shrink: 0;
      font-size: 14.5px;
      color: var(--krs-gold);
      letter-spacing: 0.14em;
      font-weight: 600;
    }
    .form-row.stack {
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
    }
    .form-row.stack > label { width: auto; }
    input[type=text], input[type=number], textarea {
      font-family: inherit;
      font-size: 14.5px;
      color: var(--krs-text);
      background: rgba(0,0,0,0.55);
      border: 1px solid var(--krs-line);
      border-radius: 3px;
      padding: 10px 13px;
      flex: 1;
      width: 100%;
      min-width: 0;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    textarea { resize: vertical; min-height: 60px; line-height: 1.65; }
    input[type=text]:focus, input[type=number]:focus, textarea:focus { border-color: var(--krs-gold); background: rgba(0,0,0,0.7); }

    .chips-box {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      flex: 1;
      min-width: 0;
    }
    .btn-chip {
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      background: rgba(0,0,0,0.45);
      border: 1px solid var(--krs-line);
      border-radius: 3px;
      padding: 8px 16px;
      color: var(--krs-dim);
      transition: all 0.15s;
    }
    .btn-chip:hover { border-color: var(--krs-gold2); color: var(--krs-text); }
    .btn-chip.selected {
      border-color: var(--krs-gold);
      background: var(--krs-gold);
      color: var(--krs-ink);
      font-weight: 600;
    }
    .dynamic-hint {
      font-size: 13px;
      color: var(--krs-dim);
      margin-left: 104px;
      margin-bottom: 16px;
      min-height: 1.7em;
      line-height: 1.6;
    }

    .section-label {
      font-size: 13.5px;
      color: var(--krs-gold);
      letter-spacing: 0.18em;
      margin: 8px 0 14px;
      padding-bottom: 6px;
      border-bottom: 1px dashed var(--krs-line);
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .section-label::before {
      content: "✦";
      color: var(--krs-gold2);
      font-size: 12px;
    }
    .section-label.secondary {
      color: var(--krs-dim);
      font-size: 12.5px;
      letter-spacing: 0.15em;
      margin-top: 26px;
      opacity: 0.85;
      font-weight: 500;
    }

    .chapters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 10px;
      max-height: 260px;
      overflow-y: auto;
      padding-right: 6px;
    }
    .chap-card {
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      background: rgba(18,14,26,0.42);
      border: 1px solid rgba(56,46,78,0.5);
      border-radius: 3px;
      padding: 10px 13px;
      color: var(--krs-text);
      opacity: 0.7;
      transition: all 0.16s;
    }
    .chap-card:hover {
      opacity: 1;
      border-color: var(--krs-gold2);
      background: rgba(201,165,78,0.10);
    }
    .chap-card.selected {
      opacity: 1;
      border-color: var(--krs-gold);
      background: rgba(201,165,78,0.16);
      box-shadow: 0 0 0 1px rgba(201,165,78,0.5);
    }
    .chap-card b { color: var(--krs-gold); font-size: 15px; letter-spacing: 0.06em; font-weight: 600; }
    .chap-card i { font-style: normal; color: var(--krs-dim); font-size: 12px; margin-left: 6px; }
    .chap-card p { margin-top: 5px; font-size: 12.5px; line-height: 1.6; color: var(--krs-dim); }
    /* 显式变量注入角标 */
    .chap-inject-badge {
      display: none;
      margin-top: 8px;
      padding: 3px 8px;
      font-size: 11.5px;
      border-radius: 4px;
      background: rgba(201, 165, 78, 0.22);
      border: 1px solid var(--krs-gold);
      color: #f7e7be;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .chap-card.selected .chap-inject-badge {
      display: inline-block;
      animation: krsFade 0.2s ease;
    }

    .opening-input-wrap { margin-bottom: 18px; }
    .opening-input-wrap > label {
      display: block;
      font-size: 14px;
      color: var(--krs-gold);
      letter-spacing: 0.16em;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .opening-input-wrap textarea {
      width: 100%;
      font-family: inherit;
      font-size: 14.5px;
      color: var(--krs-text);
      background: rgba(0,0,0,0.6);
      border: 1px solid var(--krs-line);
      border-left: 3px solid var(--krs-gold);
      border-radius: 3px;
      padding: 12px 14px;
      outline: none;
      resize: vertical;
      min-height: 110px;
      line-height: 1.7;
      transition: border-color 0.2s, background 0.2s;
    }
    .opening-input-wrap textarea:focus { border-color: var(--krs-gold2); border-left-color: var(--krs-gold); background: rgba(0,0,0,0.75); }

    /* ───────── 联动角色页 ───────── */
    .link-section { display: flex; flex-direction: column; gap: 18px; width: 100%; }
    .link-top-btn { 
      width: 100%; padding: 14px; border-radius: 6px; 
      background: rgba(201,165,78,0.12); border: 1px solid #c9a54e; 
      color: #c9a54e; font-size: 16px; font-weight: bold; cursor: pointer; 
      text-align: center; transition: all 0.25s ease; letter-spacing: 0.1em;
    }
    .link-top-btn:hover { background: rgba(201,165,78,0.22); }
    .link-top-btn.on { background: rgba(201,165,78,0.35); color: #fff; box-shadow: 0 0 15px rgba(201,165,78,0.4); }
    .link-avatars { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin: 10px 0; }
    
    /* 角色头像容器与状态显化 */
    .link-avatar-btn { 
      width: 90px; height: 90px; border-radius: 50%; border: 2px solid #382e4e; 
      overflow: hidden; cursor: pointer; transition: all 0.25s ease; background: #111; 
      padding: 0; position: relative;
    }
    .link-avatar-btn:hover { transform: scale(1.05); }
    .link-avatar-btn img { 
      width: 100%; height: 100%; object-fit: cover; display: block; 
      filter: grayscale(0.85) brightness(0.5); /* 默认未启用：灰度暗色 */
      transition: filter 0.25s ease;
    }
    /* 当前选中的预览角色：白色外边框 */
    .link-avatar-btn.active { border-color: #ffffff !important; transform: scale(1.06); }
    /* 已启用的角色：全彩亮起 + 金色光圈 */
    .link-avatar-btn.on { border-color: #c9a54e; box-shadow: 0 0 16px rgba(201,165,78,0.6); }
    .link-avatar-btn.on img { filter: grayscale(0) brightness(1); }
    
    /* 头像底部的直观状态小胶囊角标 */
    .link-avatar-btn .link-badge {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 2px 0; font-size: 11px; text-align: center; font-weight: bold;
      background: rgba(20, 16, 28, 0.85); color: #888;
      border-top: 1px solid rgba(255,255,255,0.1);
      transition: all 0.2s ease;
    }
    .link-avatar-btn.on .link-badge {
      background: #c9a54e; color: #111;
    }

    /* 重大扩展篇章方形大卡片排版 */
    .link-expansions-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-top: 6px;
      margin-bottom: 12px;
    }
    .link-exp-card {
      position: relative;
      min-height: 145px;
      border: 1.5px solid #382e4e;
      border-radius: 8px;
      background: rgba(18, 14, 26, 0.9);
      overflow: hidden;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-text);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 14px 10px;
      transition: all 0.22s ease;
      background-size: cover;
      background-position: center 20%;
    }
    .link-exp-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(14, 11, 20, 0.45) 0%, rgba(10, 8, 16, 0.95) 100%);
      transition: background 0.22s ease;
      z-index: 0;
    }
    .link-exp-card:hover {
      transform: translateY(-2px);
      border-color: var(--krs-gold2);
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
    }
    .link-exp-card.active {
      border-color: #ffffff !important;
      box-shadow: 0 0 14px rgba(255,255,255,0.4);
    }
    .link-exp-card.on {
      border-color: var(--krs-gold);
      box-shadow: 0 0 16px rgba(201,165,78,0.5);
    }
    .link-exp-card.on::before {
      background: linear-gradient(180deg, rgba(14, 11, 20, 0.2) 0%, rgba(15, 12, 22, 0.88) 100%);
    }
    .link-exp-body {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 6px;
    }
    .link-exp-title {
      font-size: 14.5px;
      font-weight: 700;
      color: #e5dfd2;
      letter-spacing: 0.05em;
    }
    .link-exp-card.on .link-exp-title { color: var(--krs-gold); }
    .link-exp-badge {
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 4px;
      background: rgba(20, 16, 28, 0.8);
      border: 1px solid rgba(255,255,255,0.15);
      color: #888;
      font-weight: 600;
      white-space: nowrap;
    }
    .link-exp-card.on .link-exp-badge {
      background: var(--krs-gold);
      color: #111;
      border-color: var(--krs-gold);
    }
    /* 大扩展卡片内联角色小头像列 */
    .link-exp-chars {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px dashed rgba(255,255,255,0.12);
    }
    .link-exp-char-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1.5px solid #382e4e;
      overflow: hidden;
      cursor: pointer;
      background: #111;
      transition: all 0.2s ease;
      position: relative;
    }
    .link-exp-char-avatar:hover { transform: scale(1.15); border-color: #fff; }
    .link-exp-char-avatar.selected {
      border-color: var(--krs-gold);
      box-shadow: 0 0 10px rgba(201,165,78,0.7);
      transform: scale(1.15);
    }
    .link-exp-char-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }

    /* 需求3：联动世界剧情的暗红同人警示 */
    .story-warn-tip {
      display: inline-block;
      margin-top: 4px;
      font-size: 11px;
      color: #ff6b6b;
      background: rgba(255, 107, 107, 0.12);
      border: 1px solid rgba(255, 107, 107, 0.35);
      padding: 1px 6px;
      border-radius: 3px;
      letter-spacing: 0.02em;
    }

 /* 需求4：命运主线专属展台（正方形小框 · 纯净无发光高帧率版） */
    .destiny-preview-card {
      position: relative;
      display: flex;
      gap: 16px;
      align-items: flex-start;
      background: rgba(18, 14, 26, 0.95);
      border: 1px solid rgba(201, 165, 78, 0.4);
      border-left: 3px solid var(--krs-gold);
      border-radius: 6px;
      padding: 14px 16px;
      margin-bottom: 16px;
      animation: krsFade 0.2s ease;
    }
    @media (max-width: 780px) {
      .destiny-preview-card { flex-direction: column; align-items: flex-start; padding: 12px; }
    }
    /* 正方形小框：固定宽高，头像完整居中显示 */
    .destiny-preview-img {
      width: 86px;
      height: 86px;
      flex-shrink: 0;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid rgba(201, 165, 78, 0.45);
      background: #111;
    }
    .destiny-preview-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .destiny-preview-info { flex: 1; display: flex; flex-direction: column; gap: 8px; width: 100%; min-width: 0; }
    .destiny-preview-title { font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
    .destiny-preview-tag {
      font-size: 11px; padding: 1px 7px; border-radius: 3px;
      background: rgba(201,165,78,0.15); color: var(--krs-gold);
      border: 1px solid rgba(201,165,78,0.3);
    }

    /* 预设胶囊按钮（无发光，纯净配色） */
    .destiny-presets-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 2px; }
    .destiny-preset-pill {
      font-size: 11.5px; padding: 3px 10px; border-radius: 4px; cursor: pointer;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(201,165,78,0.25);
      color: #aaa; font-family: inherit; transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .destiny-preset-pill:hover { border-color: var(--krs-gold); color: #fff; }
    .destiny-preset-pill.active {
      background: rgba(201,165,78,0.22);
      border-color: var(--krs-gold); color: #f5eedf; font-weight: 600;
    }
    .destiny-preset-pill.is-custom-pill.active {
      background: rgba(230, 160, 50, 0.25);
      border-color: #e6a032; color: #ffd88a; font-weight: 600;
    }

    /* 自定义表单（轻量无阴影无滤镜） */
    .destiny-form-line { display: flex; flex-direction: column; gap: 4px; }
    .destiny-form-line label {
      font-size: 12px; color: var(--krs-gold); font-weight: 600;
      letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;
    }
    .destiny-form-line label::before { content: "✦"; font-size: 10px; color: rgba(201,165,78,0.5); }
    .destiny-form-input, .destiny-form-textarea {
      width: 100%; font-family: inherit; font-size: 13px; color: #eee;
      background: rgba(10, 8, 16, 0.7);
      border: 1px solid rgba(201,165,78,0.25);
      border-radius: 4px; padding: 7px 10px; outline: none;
      transition: border-color 0.15s, background 0.15s;
    }
    .destiny-form-input:focus, .destiny-form-textarea:focus {
      border-color: var(--krs-gold);
      background: rgba(15, 12, 22, 0.95);
    }
    .destiny-form-textarea { resize: vertical; min-height: 52px; line-height: 1.5; }

    /* 手机端响应式深度自适应 */
    @media (max-width: 780px) {
      .link-expansions-grid { grid-template-columns: 1fr; }
      .destiny-preview-card { flex-direction: column; align-items: flex-start; }
      .destiny-preview-img { width: 75px; height: 75px; }
      .link-detail { flex-direction: column; align-items: center; padding: 14px; }
      .link-detail-img { width: 120px; }
    }
    .link-exp-card {
      position: relative;
      min-height: 100px;
      border: 1.5px solid #382e4e;
      border-radius: 8px;
      background: rgba(18, 14, 26, 0.9);
      overflow: hidden;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-text);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 12px 14px;
      transition: all 0.22s ease;
      background-size: cover;
      background-position: center 20%;
    }
    .link-exp-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(14, 11, 20, 0.45) 0%, rgba(10, 8, 16, 0.92) 100%);
      transition: background 0.22s ease;
    }
    .link-exp-card:hover {
      transform: translateY(-2px);
      border-color: var(--krs-gold2);
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
    }
    .link-exp-card.active {
      border-color: #ffffff !important;
      box-shadow: 0 0 14px rgba(255,255,255,0.4);
    }
    .link-exp-card.on {
      border-color: var(--krs-gold);
      box-shadow: 0 0 16px rgba(201,165,78,0.5);
    }
    .link-exp-card.on::before {
      background: linear-gradient(180deg, rgba(14, 11, 20, 0.2) 0%, rgba(15, 12, 22, 0.85) 100%);
    }
    .link-exp-body {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .link-exp-title {
      font-size: 14px;
      font-weight: 700;
      color: #e5dfd2;
      letter-spacing: 0.05em;
    }
    .link-exp-card.on .link-exp-title {
      color: var(--krs-gold);
    }
    .link-exp-badge {
      display: inline-block;
      align-self: flex-start;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(20, 16, 28, 0.8);
      border: 1px solid rgba(255,255,255,0.15);
      color: #888;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .link-exp-card.on .link-exp-badge {
      background: var(--krs-gold);
      color: #111;
      border-color: var(--krs-gold);
    }
    @media (max-width: 780px) {
      .link-expansions-grid { grid-template-columns: 1fr; }
    }

    .link-detail { 
      background: rgba(20,16,28,0.85); border: 1px solid #382e4e; 
      border-radius: 8px; padding: 20px; display: flex; gap: 20px; 
      min-height: 240px; transition: all 0.3s ease; animation: krsFade 0.3s ease;
    }
    .link-detail-img { width: 180px; flex-shrink: 0; display: flex; align-items: flex-start; }
    .link-detail-img img { width: 100%; border-radius: 6px; object-fit: contain; border: 1px solid rgba(201,165,78,0.3); }
    .link-detail-text { flex: 1; display: flex; flex-direction: column; gap: 12px; justify-content: center; }
    /* 顶部：角色名与按钮左右并排 */
    .link-detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 1px dashed rgba(201,165,78,0.3);
      padding-bottom: 10px;
    }
    .link-detail-header h4 { color: #c9a54e; font-size: 22px; margin: 0; letter-spacing: 0.1em; }
    
    /* 随行角色（小忆/赛蕾姆丝）胶囊装饰 */
    .link-subchar-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 3px 10px 3px 4px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(201, 165, 78, 0.35);
      margin-left: 10px;
    }
    .link-subchar-avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid var(--krs-gold);
      overflow: hidden;
      flex-shrink: 0;
    }
    .link-subchar-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .link-subchar-text { font-size: 11.5px; color: var(--krs-dim); line-height: 1; }
    .link-subchar-text strong { color: #f0e6d2; margin-left: 3px; }
    
    /* 世界书条目徽章池 */
    .link-wb-box {
      margin-top: 4px;
      padding: 10px 14px;
      background: rgba(10, 8, 16, 0.6);
      border: 1px dashed rgba(201,165,78,0.35);
      border-radius: 4px;
    }
    .link-wb-label { font-size: 13px; color: var(--krs-gold); font-weight: 600; margin-bottom: 6px; }
    .link-wb-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .link-wb-tag {
      font-size: 11.5px; padding: 2px 8px; border-radius: 3px;
      background: rgba(201,165,78,0.12); color: #d4c8b2;
      border: 1px solid rgba(201,165,78,0.25);
    }

    /* 未启用时的封存变暗样式 */
    .link-detail.sealed .link-detail-img img {
      filter: grayscale(0.9) brightness(0.35);
      border-color: rgba(255,255,255,0.08);
    }
    .link-detail.sealed .link-detail-body {
      opacity: 0.38;
      filter: grayscale(0.6);
      user-select: none;
    }
    .link-detail-text p { color: #a89dbb; font-size: 13.5px; margin: 0; line-height: 1.8; }
    .link-detail-text p strong { color: #ece6d8; margin-right: 8px; }
    .link-toggle-btn { padding: 10px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.2s; margin-top: 10px; font-family: inherit; font-size: 14px; }
    @media (max-width: 780px) {
      .link-detail { flex-direction: column; align-items: center; }
      .link-detail-img { width: 140px; }
    }

    /* ───────── 命运主线角色圆钮排版 ───────── */
    .destiny-section { margin-bottom: 18px; }
    .destiny-group-title {
      font-size: 12px;
      color: var(--krs-dim);
      margin: 8px 0 10px;
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .destiny-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    .destiny-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
      transition: transform 0.2s ease, opacity 0.25s ease;
    }
    .destiny-btn:hover:not(.disabled) { transform: translateY(-3px); }
    .destiny-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid var(--krs-line);
      overflow: hidden;
      background: #14101e;
      position: relative;
      transition: all 0.25s ease;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }
    .destiny-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: filter 0.25s ease;
    }
    .destiny-name {
      font-size: 12.5px;
      color: var(--krs-dim);
      letter-spacing: 0.05em;
      transition: color 0.2s ease;
    }

    /* 选中状态：亮金光圈高亮 */
    .destiny-btn.selected .destiny-avatar {
      border-color: var(--krs-gold);
      box-shadow: 0 0 15px rgba(201, 165, 78, 0.7);
      transform: scale(1.05);
    }
    .destiny-btn.selected .destiny-name {
      color: var(--krs-gold);
      font-weight: bold;
    }

    /* 联动未开启时的灰色封存态 */
    .destiny-btn.disabled {
      opacity: 0.35;
      cursor: not-allowed;
      filter: grayscale(1);
    }
    .destiny-btn.disabled .destiny-avatar {
      border-color: rgba(255,255,255,0.1);
    }

    /* ───────── 纯净路线与反派开关布局 ───────── */
    #pure-route-box {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 14px;
    }
    @media (max-width: 780px) {
      #pure-route-box {
        grid-template-columns: 1fr;
      }
    }

    /* 纯净路线按钮样式（金色系） */
    .pure-route-btn {
      display: block;
      width: 100%;
      position: relative;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      background: rgba(20,16,28,0.72);
      border: 1px dashed var(--krs-line);
      border-radius: 3px;
      padding: 11px 14px;
      color: var(--krs-text);
      transition: all 0.15s;
    }
    .pure-route-btn:hover { border-color: var(--krs-gold2); background: var(--krs-gold-soft); }
    .pure-route-btn.selected { 
      border-color: var(--krs-gold); 
      background: rgba(201,165,78,0.16); 
      box-shadow: 0 0 0 1px var(--krs-gold);
    }
    .pure-route-btn strong { font-size: 14.5px; letter-spacing: 0.04em; color: var(--krs-gold); display: block; }
    .pure-route-btn small { display: block; font-size: 12px; color: var(--krs-dim); margin-top: 5px; line-height: 1.55; }

    /* 自由模式反派按钮样式（暗红系） */
    .villain-btn {
      display: block;
      width: 100%;
      position: relative;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      background: rgba(20,16,28,0.72);
      border: 1px dashed var(--krs-line);
      border-radius: 3px;
      padding: 11px 14px;
      color: var(--krs-text);
      transition: all 0.15s;
    }
    .villain-btn:hover { border-color: var(--krs-red); background: var(--krs-red-soft); }
    .villain-btn.selected {
      border-color: var(--krs-red);
      background: rgba(186, 67, 75, 0.22);
      box-shadow: 0 0 0 1px var(--krs-red);
    }
    .villain-btn strong { font-size: 14.5px; letter-spacing: 0.04em; color: var(--krs-red); display: block; }
    .villain-btn small { display: block; font-size: 12px; color: var(--krs-dim); margin-top: 5px; line-height: 1.55; }


    /* ───────── 重点带图支线 ───────── */
    .featured-routes-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .feat-route-card {
      position: relative;
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      gap: 0;
      min-height: 98px;
      border: 1px solid var(--krs-line);
      border-radius: 4px;
      background: rgba(18,14,26,0.72);
      overflow: hidden;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-text);
      transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
    }
    .feat-route-card:hover {
      transform: translateY(-2px);
      border-color: var(--krs-gold2);
      box-shadow: 0 8px 20px rgba(0,0,0,0.35);
    }
    .feat-route-card.selected {
      border-color: var(--krs-red);
      background: var(--krs-red-soft);
      box-shadow: 0 0 0 1px var(--krs-red), 0 8px 22px rgba(186,67,75,0.3);
    }
    .feat-route-thumb {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }
    .feat-route-thumb::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 50%, rgba(18,14,26,0.85) 100%);
    }
    .feat-route-body {
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
    }
    .feat-route-body strong { font-size: 14px; color: var(--krs-gold); letter-spacing: 0.05em; }
    .feat-route-body small { font-size: 11.5px; color: var(--krs-dim); line-height: 1.5; }

    .routes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 10px;
      max-height: 200px;
      overflow-y: auto;
      padding-right: 6px;
    }
    .route-card {
      position: relative;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      background: rgba(20,16,28,0.72);
      border: 1px solid var(--krs-line);
      border-radius: 3px;
      padding: 11px 14px;
      color: var(--krs-text);
      transition: all 0.15s;
    }
    .route-card:hover { border-color: var(--krs-gold2); background: var(--krs-gold-soft); }
    .route-card.selected { border-color: var(--krs-red); background: var(--krs-red-soft); }
    .route-card strong { font-size: 14.5px; letter-spacing: 0.04em; }
    .route-card small { display: block; font-size: 12px; color: var(--krs-dim); margin-top: 5px; line-height: 1.55; }

    /* ───────── futa ───────── */
    .futa-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 14px;
    }
    .futa-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 18px 12px 16px;
      cursor: pointer;
      font-family: inherit;
      border: 1px solid var(--krs-line);
      border-radius: 6px;
      background: rgba(18,14,26,0.72);
      color: var(--krs-text);
      transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
    }
    .futa-card:hover {
      transform: translateY(-2px);
      border-color: var(--krs-gold2);
      background: rgba(30,24,42,0.86);
    }
    .futa-card.selected {
      border-color: var(--krs-gold);
      background: rgba(201,165,78,0.14);
      box-shadow: 0 0 0 1px var(--krs-gold), 0 10px 26px rgba(0,0,0,0.36);
    }
    .futa-card .avatar {
      position: relative;
      width: 92px;
      height: 92px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #4a3a55, #2a1f36);
      border: 2px solid rgba(56,46,78,0.9);
      transition: border-color 0.18s ease, box-shadow 0.18s ease;
    }
    .futa-card.selected .avatar {
      border-color: var(--krs-gold);
      box-shadow: 0 0 0 3px rgba(201,165,78,0.22);
    }
    .futa-card .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .futa-card .name {
      font-size: 15px;
      letter-spacing: 0.12em;
      color: var(--krs-text);
      font-weight: 600;
    }
    .futa-card .check {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--krs-line);
      background: rgba(0,0,0,0.55);
      color: transparent;
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
      transition: all 0.18s ease;
    }
    .futa-card.selected .check {
      background: var(--krs-gold);
      border-color: var(--krs-gold);
      color: var(--krs-ink);
    }

    .futa-hint { font-size: 12.5px; color: var(--krs-dim); margin: 4px 0 16px; line-height: 1.6; }
    .futa-summary {
      margin-top: 14px; padding: 10px 14px;
      border-left: 3px solid var(--krs-gold);
      background: rgba(0,0,0,0.4);
      font-size: 13.5px; color: var(--krs-text); border-radius: 3px;
      min-height: 1.6em; line-height: 1.7;
    }
    .futa-summary.empty { color: var(--krs-dim); }

    /* 第三页：模式卡（自由大 / 结局小） */
    .timeline-row {
      display: grid;
      grid-template-columns: 2.2fr 1fr;
      gap: 12px;
      align-items: stretch;
    }
    .timeline-row.timeline-row--single {
      grid-template-columns: 1fr;
    }
    .mode-card {
      position: relative;
      display: flex;
      gap: 12px;
      align-items: stretch;
      padding: 0;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-text);
      border: 1px solid var(--krs-line);
      border-radius: 6px;
      background: rgba(18,14,26,0.72);
      overflow: hidden;
      transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    }
    .mode-card:hover { transform: translateY(-2px); border-color: var(--krs-gold2); background: rgba(30,24,42,0.86); }
    .mode-card.selected { border-color: var(--krs-gold); background: rgba(201,165,78,0.14); box-shadow: 0 0 0 1px var(--krs-gold), 0 10px 26px rgba(0,0,0,0.36); }
    .mode-card .mode-thumb { flex: 0 0 34%; min-height: 92px; background-size: cover; background-position: center; filter: saturate(.8); }
    .mode-card.narrow .mode-thumb { display: none; }
    .mode-card .mode-body { flex: 1 1 auto; padding: 14px 16px; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
    .mode-card .mode-head { display: flex; align-items: baseline; gap: 8px; }
    .mode-card .mode-head b { font-size: 17px; letter-spacing: 0.06em; }
    .mode-card .mode-head i { font-style: normal; font-size: 11.5px; color: var(--krs-dim); }
    .mode-card p { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--krs-dim); }

    .story-card {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 14px 16px;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: var(--krs-dim);
      border: 1px solid var(--krs-line);
      border-radius: 6px;
      background: rgba(18,14,26,0.72);
      transition: all 0.18s ease;
    }
    .story-card:hover { border-color: var(--krs-gold2); color: var(--krs-text); transform: translateY(-2px); }
    .story-card.on { border-color: var(--krs-gold); background: rgba(201,165,78,0.16); color: var(--krs-gold); box-shadow: 0 0 0 1px var(--krs-gold); }
    .story-card strong { font-size: 15px; letter-spacing: 0.05em; }
    .story-card small { font-size: 12px; color: var(--krs-dim); line-height: 1.55; }
    .story-hint { margin: 12px 0 4px; padding: 9px 13px; border-left: 3px solid var(--krs-gold); background: rgba(0,0,0,0.4); font-size: 12.5px; color: var(--krs-text); line-height: 1.65; border-radius: 3px; }
/* ───────── 学院模式全新网格与圆钮排版 ───────── */
    .academy-quad-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin: 10px 0 16px;
    }
    @media (max-width: 780px) {
      .academy-quad-grid { grid-template-columns: 1fr; }
    }
    .academy-quad-card {
      position: relative;
      min-height: 125px;
      border: 1.5px solid var(--krs-line);
      border-radius: 8px;
      background: rgba(18, 14, 26, 0.9);
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 14px 10px;
      transition: all 0.22s ease;
      background-size: cover;
      background-position: center;
    }
    .academy-quad-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(14, 11, 20, 0.5) 0%, rgba(10, 8, 16, 0.95) 100%);
      transition: background 0.22s ease;
      z-index: 0;
    }
    .academy-quad-card:hover { transform: translateY(-2px); border-color: var(--krs-gold2); }
    .academy-quad-card.selected {
      border-color: var(--krs-gold) !important;
      box-shadow: 0 0 16px rgba(201,165,78,0.5);
    }
    .academy-quad-card.selected::before {
      background: linear-gradient(180deg, rgba(14, 11, 20, 0.25) 0%, rgba(15, 12, 22, 0.88) 100%);
    }
    .academy-quad-head {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .academy-quad-title { font-size: 15px; font-weight: 700; color: #ece6d8; letter-spacing: 0.05em; }
    .academy-quad-card.selected .academy-quad-title { color: var(--krs-gold); }
    .academy-quad-badge {
      font-size: 11px; padding: 2px 7px; border-radius: 4px;
      background: rgba(20, 16, 28, 0.8); border: 1px solid rgba(255,255,255,0.15); color: #888;
    }
    .academy-quad-card.selected .academy-quad-badge {
      background: var(--krs-gold); color: #111; font-weight: bold; border-color: var(--krs-gold);
    }
    .academy-quad-subchars {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px dashed rgba(255,255,255,0.12);
    }
    .academy-mini-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid var(--krs-line); overflow: hidden; background: #111;
    }
    .academy-mini-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }

    /* 班级专属成员圆钮展台 */
    .academy-stage {
      background: rgba(16, 12, 22, 0.8);
      border: 1px solid var(--krs-line);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 14px;
      animation: krsFade 0.25s ease;
    }
    .academy-char-row {
      display: flex; gap: 16px; flex-wrap: wrap; margin: 10px 0 14px;
    }
    .academy-major-openings-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;
    }
    .academy-quad-desc {
      position: relative; z-index: 1; font-size: 11.5px; line-height: 1.55;
      color: #c3bcd0; margin: 6px 0 0; max-height: 54px; overflow: hidden;
    }
    .academy-stage-head {
      display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
      padding-bottom: 8px; border-bottom: 1px solid var(--krs-line);
    }
    .academy-stage-head b { font-size: 16px; color: var(--krs-gold); letter-spacing: 0.06em; }
    .academy-stage-head i {
      font-style: normal; font-size: 11.5px; color: #b9b2c6;
      border: 1px solid var(--krs-line); border-radius: 4px; padding: 2px 8px;
    }
    .academy-stage-desc {
      font-size: 12.5px; color: var(--krs-dim); line-height: 1.7; margin: 9px 0 12px;
    }
    .academy-stage-foot {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      flex-wrap: wrap; margin-top: 14px; padding-top: 10px;
      border-top: 1px dashed rgba(255,255,255,0.12);
      font-size: 12.5px; color: var(--krs-dim);
    }
    .academy-stage-foot b { color: var(--krs-gold); }
    /* 无立绘角色的字母头像兜底 */
    .krs-letter-avatar {
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(160deg, #2a2340, #14101f);
      border: 1px solid var(--krs-gold2);
    }
    .krs-letter-avatar::after {
      content: attr(data-initial);
      font-family: "Noto Serif SC", Georgia, serif;
      font-size: 20px; line-height: 1; color: var(--krs-gold);
      letter-spacing: 0;
    }
    .krs-mini-letter {
      width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
      font-size: 13px; color: var(--krs-gold); background: #1b1628;
    }

    /* 折叠面板通用 */
    .chap-panel { margin: 12px 0; border: 1px solid var(--krs-line); border-radius: 6px; overflow: hidden; background: rgba(12,10,18,0.6); }
    .chap-panel-head {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      cursor: pointer;
      font-family: inherit;
      font-size: 15px;
      letter-spacing: 0.08em;
      color: var(--krs-text);
      border: 0;
      background: linear-gradient(90deg, rgba(201,165,78,0.10), rgba(201,165,78,0.02));
      transition: background 0.18s ease, color 0.18s ease;
    }
    .chap-panel-head:hover { background: linear-gradient(90deg, rgba(201,165,78,0.20), rgba(201,165,78,0.04)); color: var(--krs-gold); }
    .chap-panel-head.open { color: var(--krs-gold); }
    .chap-panel-mark { font-size: 12.5px; color: var(--krs-dim); }
    .chap-panel.locked { opacity: 0.42; }
    .chap-panel.locked .chap-panel-head { cursor: not-allowed; background: rgba(40,36,48,0.5); color: var(--krs-dim); }
    .chap-panel.locked .chap-panel-head:hover { background: rgba(40,36,48,0.5); color: var(--krs-dim); }
    .chap-panel-body { padding: 14px 14px 6px; }
    .chap-panel-body[hidden] { display: none; }

    .side-panel { border-color: rgba(150,58,72,0.55); background: rgba(26,12,18,0.62); }
    .side-panel .chap-panel-head { background: linear-gradient(90deg, rgba(150,58,72,0.20), rgba(150,58,72,0.04)); }
    .side-panel .chap-panel-head:hover, .side-panel .chap-panel-head.open { background: linear-gradient(90deg, rgba(150,58,72,0.32), rgba(150,58,72,0.08)); color: #f0b9c2; }
    .side-panel.locked .chap-panel-head { background: rgba(40,36,48,0.5); color: var(--krs-dim); }
    .side-hint { font-size: 12.5px; line-height: 1.7; color: var(--krs-dim); margin: 0 4px 12px; }
    .side-note { margin-top: 12px; font-size: 12.5px; line-height: 1.7; color: var(--krs-dim); }

    .page-back-row { margin-bottom: 14px; }
    .nav-btn.slim { display: inline-flex; min-width: 0; padding: 9px 16px; font-size: 13px; }
    .btn-chip.disabled { opacity: 0.4; cursor: not-allowed; text-decoration: line-through; }

    .confirm-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 14px;
    }
    .confirm-table td {
      padding: 9px 10px;
      border-bottom: 1px solid var(--krs-line);
      vertical-align: top;
    }
    .confirm-table td:first-child { width: 96px; color: var(--krs-gold); letter-spacing: 0.1em; font-weight: 600; }
    .confirm-preview {
      background: rgba(0,0,0,0.6);
      border: 1px solid var(--krs-line);
      border-left: 3px solid var(--krs-gold);
      padding: 12px 14px;
      font-size: 13px;
      line-height: 1.7;
      max-height: 160px;
      overflow-y: auto;
      color: var(--krs-dim);
      white-space: pre-wrap;
      border-radius: 3px;
    }

    .footer {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 32px 18px;
      border-top: 1px solid var(--krs-line);
      background: rgba(11,9,18,0.85);
      gap: 12px;
    }
    .nav-btn {
      font-family: inherit;
      cursor: pointer;
      background: transparent;
      color: var(--krs-gold);
      border: 1px solid var(--krs-gold2);
      border-radius: 3px;
      font-size: 14px;
      letter-spacing: 0.14em;
      padding: 9px 20px;
      transition: all 0.2s;
    }
    .nav-btn:hover:not(:disabled) { background: var(--krs-gold-soft); border-color: var(--krs-gold); }
    .nav-btn:disabled { opacity: 0.3; cursor: default; }
    .nav-btn.primary {
      background: var(--krs-gold);
      color: var(--krs-ink);
      font-weight: 600;
      border-color: var(--krs-gold);
    }
    .nav-btn.primary:hover:not(:disabled) { background: var(--krs-gold-hover); }
    .indicator { font-size: 13.5px; color: var(--krs-dim); letter-spacing: 0.14em; }
    .err-tip { color: var(--krs-red); font-size: 12.5px; margin-top: 6px; text-align: right; }

    /* =========================================================
       手机端（窄屏）响应式适配
       ========================================================= */
    @media (max-width: 780px) {
      .page:not(.cover-page) { padding: 22px 16px 16px; }
      
      .work-pick { padding: 12px 12px 10px; }
      .work-pick-row { grid-template-columns: 1fr; gap: 10px; }
      .work-toggle { 
        grid-template-columns: 1fr; 
        grid-template-rows: 120px auto;
        min-height: auto; 
      }
      .work-toggle .wt-figure { 
        background-position: center 20%; 
      }
      .work-toggle .wt-body { padding: 12px 14px; }
      .work-toggle .wt-head strong { font-size: 15px; }
      
      .view-layout { grid-template-columns: 1fr; gap: 20px; }
      .view-form { min-width: 0; }
      .form-row { flex-direction: column; align-items: flex-start; gap: 6px; }
      .form-row > label { width: 100%; }
      .dynamic-hint { margin-left: 0; margin-bottom: 12px; }
      
      .claire-sprite { padding-top: 0; }
      .claire-sprite img { max-width: 200px; margin: 0 auto; }
      
      .featured-routes-grid { grid-template-columns: 1fr; }
      .chapters-grid { max-height: none; }
      .routes-grid { max-height: none; }
      .futa-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
      .futa-card .avatar { width: 70px; height: 70px; }
      .futa-card .name { font-size: 13px; }
      
      .timeline-row { grid-template-columns: 1fr; }
      .mode-card { flex-direction: column; }
      .mode-card .mode-thumb { flex: 0 0 100px; }
      .mode-card.narrow .mode-thumb { display: block; }
      .mode-card .mode-body { padding: 12px 14px; }
      
      .cover-title { font-size: 30px; }
      .cover-sub { font-size: 13px; letter-spacing: 0.3em; }
      .cover-copy { padding: 30px 20px 30px; min-height: 520px; }
      .cover-intro { font-size: 13px; margin-bottom: 22px; }
      .cover-start { font-size: 15px; padding: 14px 44px 14px 16px; letter-spacing: 0.24em; }
      
      .footer { padding: 12px 12px 14px; flex-wrap: wrap; }
      .nav-btn { padding: 8px 14px; font-size: 13px; }
      .indicator { font-size: 12px; }
    }

    @media (max-width: 480px) {
      .cover-badge { font-size: 11px; padding: 4px 10px; }
      .cover-title { font-size: 24px; letter-spacing: 0.2em; }
      .cover-sub { font-size: 11px; letter-spacing: 0.2em; }
      .cover-copy { min-height: 460px; padding: 20px 14px 24px; }
      .cover-intro { font-size: 12px; line-height: 1.7; }
      .cover-start { font-size: 14px; padding: 12px 36px 12px 12px; letter-spacing: 0.18em; text-indent: 0.18em; }
      .cover-start::after { right: 14px; font-size: 22px; }
      
      .work-toggle { grid-template-rows: 90px auto; }
      .work-toggle .wt-head strong { font-size: 14px; }
      .work-toggle .wt-body small { font-size: 11px; line-height: 1.4; }
      
      .h-title { font-size: 18px; letter-spacing: 0.12em; }
      .h-desc { font-size: 12px; }
      .page-back-row { margin-bottom: 10px; }
      .nav-btn.slim { font-size: 12px; padding: 7px 12px; }
      
      .chap-panel-head { padding: 12px 14px; font-size: 14px; }
      .chap-panel-body { padding: 10px 10px 4px; }
      
      .confirm-table { font-size: 12.5px; }
      .confirm-table td { padding: 7px 8px; }
      .confirm-table td:first-child { width: 70px; }
    }
  
    /* ══════════════════════════════════════════════════════════════
     * 第四幕 · 自由模式：四个开局页签（完全自由 / 单人命运主线 / 章节 / 战败支线）
     * 学院模式是独立容器，不经过这里。
     * ══════════════════════════════════════════════════════════════ */
    .open-tabs-bar {
      display: flex; gap: 8px; flex-wrap: wrap;
      border-bottom: 1px solid var(--krs-line);
      padding-bottom: 10px; margin-bottom: 16px;
    }
    .open-tab {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--krs-line);
      color: var(--krs-dim);
      padding: 8px 18px; border-radius: 8px;
      font-size: 13.5px; font-weight: 600; font-family: inherit;
      letter-spacing: 0.04em; cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.2s ease;
    }
    .open-tab:hover { border-color: var(--krs-gold2); color: #fff; }
    .open-tab.active {
      background: rgba(201,165,78,0.18);
      border-color: var(--krs-gold);
      color: var(--krs-gold);
      box-shadow: 0 0 10px rgba(201,165,78,0.3);
    }
    .open-pane { display: none; }
    .open-pane.active { display: block; }

    /* ══════════════════════════════════════════════════════════════
     * 完全自由 · 出生地地图（复用状态栏 PANDORA_MAP_FULL 坐标）
     * ══════════════════════════════════════════════════════════════ */
    .birth-map-shell { display: flex; gap: 14px; align-items: flex-start; }
    .birth-map-viewport {
      flex: 1 1 auto; min-width: 0; overflow: hidden;
      border: 1px solid var(--krs-line); border-radius: 10px;
      background: radial-gradient(ellipse at 50% 40%, rgba(30,24,44,0.85), rgba(10,8,16,0.95));
      position: relative;
    }
    .birth-map-canvas { position: relative; }
    .birth-region {
      position: absolute; border: 1px dashed; border-radius: 14px; pointer-events: none;
    }
    .birth-region-name {
      position: absolute; top: 4px; left: 8px; font-size: 10.5px;
      letter-spacing: 0.12em; color: var(--krs-dim); opacity: 0.75; white-space: nowrap;
    }
    .birth-map-svg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; }
    .birth-line { stroke: rgba(201,165,78,0.42); stroke-width: 1.6; }
    .birth-line-iso { stroke: rgba(186,67,75,0.42); stroke-dasharray: 5 5; }
    .birth-node-layer { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
    .birth-node {
      position: absolute; transform: translate(-50%, -50%);
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      background: none; border: 0; padding: 0; cursor: pointer; font-family: inherit;
    }
    .birth-node-icon {
      width: 30px; height: 30px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; line-height: 1;
      background: rgba(20,16,30,0.92);
      border: 1px solid var(--krs-line);
      transition: all 0.18s ease;
    }
    .birth-node-name {
      font-size: 10.5px; color: var(--krs-dim); white-space: nowrap;
      text-shadow: 0 1px 3px rgba(0,0,0,0.9); letter-spacing: 0.02em;
    }
    .birth-node:hover .birth-node-icon { border-color: var(--krs-gold2); transform: scale(1.12); }
    .birth-node:hover .birth-node-name { color: #fff; }
    .birth-node.selected .birth-node-icon {
      border-color: var(--krs-gold); background: rgba(201,165,78,0.28);
      box-shadow: 0 0 12px rgba(201,165,78,0.6); transform: scale(1.15);
    }
    .birth-node.selected .birth-node-name { color: var(--krs-gold); font-weight: 700; }
    .birth-node--fog { opacity: 0.4; cursor: not-allowed; }
    .birth-node--capital .birth-node-icon { border-color: rgba(201,165,78,0.55); }
    .birth-side {
      flex: 0 0 236px; display: flex; flex-direction: column; gap: 10px;
      border: 1px solid var(--krs-line); border-radius: 10px; padding: 12px;
      background: rgba(12,10,18,0.6); min-height: 180px;
    }
    .birth-side-empty { color: var(--krs-dim); font-size: 12.5px; line-height: 1.9; }
    .birth-side-empty span { font-size: 11.5px; opacity: 0.75; }
    .birth-info-head { display: flex; align-items: center; gap: 7px; margin-bottom: 6px; }
    .birth-info-icon { font-size: 17px; }
    .birth-info-name { font-size: 15px; color: var(--krs-gold); font-weight: 700; letter-spacing: 0.06em; }
    .birth-info-meta { font-size: 11px; color: var(--krs-dim); margin-bottom: 7px; }
    .birth-info-desc { font-size: 12px; color: var(--krs-text); line-height: 1.75; opacity: 0.9; }
    .birth-info-sublabel { font-size: 11px; color: var(--krs-dim); margin: 10px 0 6px; letter-spacing: 0.1em; }
    .birth-subs { display: flex; flex-wrap: wrap; gap: 5px; }
    .birth-sub {
      font-family: inherit; font-size: 11.5px; cursor: pointer;
      padding: 3px 9px; border-radius: 6px;
      border: 1px solid var(--krs-line); background: rgba(255,255,255,0.05); color: var(--krs-dim);
      transition: all 0.15s ease;
    }
    .birth-sub:hover { border-color: var(--krs-gold2); color: #fff; }
    .birth-sub.active { border-color: var(--krs-gold); color: var(--krs-gold); background: rgba(201,165,78,0.18); }
    .birth-clear {
      margin-top: auto; font-family: inherit; font-size: 12px; cursor: pointer;
      padding: 6px 12px; border-radius: 6px;
      border: 1px solid var(--krs-line); background: rgba(186,67,75,0.12); color: var(--krs-dim);
    }
    .birth-clear:hover { border-color: var(--krs-red); color: #fff; }
    @media (max-width: 760px) {
      .birth-map-shell { flex-direction: column; }
      .birth-side { flex: 1 1 auto; width: 100%; }
    }

    /* ── 自由开局预设：世界/地点分组标题 + 建议出生地 ── */
    .free-group-label {
      grid-column: 1 / -1;
      font-size: 12.5px; letter-spacing: 0.16em; color: var(--krs-gold2);
      border-bottom: 1px dashed var(--krs-line);
      padding: 6px 0 7px; margin: 10px 0 2px;
    }
    .free-group-label:first-child { margin-top: 0; }
    .free-birth-hint { font-size: 11.5px; color: var(--krs-gold); opacity: 0.85; margin-top: 6px; letter-spacing: 0.03em; }

    /* ══════════════════════════════════════════════════════════════════════
     * 第三幕 · 魂之印记 —— 捏人工作台视觉现代化（纯外观，未改动任何字段/ID）
     * 全部规则都限定在 #p-3 / #view-cards-container / #outlander-workbench /
     * #canon-protagonist-panel 之内，不影响其它页面。
     * ══════════════════════════════════════════════════════════════════════ */

    /* ── 导语 ── */
    #p-3 .wb-kicker {
      font-size: 12px; letter-spacing: 0.22em; color: var(--krs-gold2);
      margin: -6px 0 14px; padding-left: 2px;
    }
    #outlander-workbench .wb-lead {
      margin: 0 0 4px; font-size: 12.5px; line-height: 1.85; color: var(--krs-dim);
      background: linear-gradient(90deg, rgba(201,165,78,0.09), rgba(201,165,78,0.01));
      border-left: 3px solid rgba(201,165,78,0.5);
      border-radius: 0 10px 10px 0; padding: 10px 14px;
    }
    #outlander-workbench .wb-lead b { color: var(--krs-gold); font-weight: 600; }

    /* ── 视点卡片 ── */
    #view-cards-container { gap: 14px; margin-bottom: 18px; }
    #view-cards-container .view-card-btn {
      padding: 15px 16px; border-radius: 14px; gap: 14px; overflow: hidden;
      background: linear-gradient(165deg, rgba(31,25,45,0.92) 0%, rgba(15,12,23,0.9) 100%);
      border: 1.5px solid rgba(255,255,255,0.075);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
    }
    #view-cards-container .view-card-btn::before {
      content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(201,165,78,0.6), transparent);
      opacity: 0; transition: opacity 0.25s ease;
    }
    #view-cards-container .view-card-btn:hover::before { opacity: 1; }
    #view-cards-container .view-card-btn:hover {
      transform: translateY(-3px); border-color: rgba(201,165,78,0.45);
      background: linear-gradient(165deg, rgba(40,32,56,0.94) 0%, rgba(19,15,28,0.92) 100%);
    }
    #view-cards-container .view-card-btn.active {
      border-color: var(--krs-gold);
      background: linear-gradient(165deg, rgba(52,41,23,0.95) 0%, rgba(22,17,28,0.92) 100%);
      box-shadow: 0 0 0 1px rgba(201,165,78,0.32), 0 10px 28px rgba(201,165,78,0.16), 0 6px 20px rgba(0,0,0,0.45);
    }
    #view-cards-container .view-card-btn.active::after {
      content: "✓ 当前视点"; position: absolute; top: 9px; right: 10px;
      font-size: 9.5px; letter-spacing: 0.06em; color: var(--krs-gold);
      background: rgba(201,165,78,0.16); border: 1px solid rgba(201,165,78,0.42);
      border-radius: 999px; padding: 2px 8px; white-space: nowrap;
    }
    #view-cards-container .view-card-avatar {
      width: 56px; height: 56px; border-width: 2px; border-color: rgba(255,255,255,0.14);
      box-shadow: 0 4px 14px rgba(0,0,0,0.5);
    }
    #view-cards-container .view-card-btn.active .view-card-avatar {
      border-color: var(--krs-gold);
      box-shadow: 0 0 0 3px rgba(201,165,78,0.16), 0 4px 16px rgba(0,0,0,0.55);
    }
    #view-cards-container .view-card-title { font-size: 15px; letter-spacing: 0.05em; }
    #view-cards-container .view-card-desc {
      font-size: 11.5px; line-height: 1.5; white-space: normal;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }

    /* ── 原著主角面板 ── */
    #canon-protagonist-panel .canon-simple-card {
      border-radius: 16px; padding: 20px 22px; gap: 16px;
      background: linear-gradient(180deg, rgba(26,20,36,0.85) 0%, rgba(14,11,20,0.8) 100%);
      border-left-width: 3px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.42);
    }
    #canon-protagonist-panel .canon-notice-banner { font-size: 15.5px; letter-spacing: 0.03em; }
    #canon-protagonist-panel .form-row > label { letter-spacing: 0.1em; font-size: 13.5px; }

    /* ── 工作台页签：分段控件 ── */
    #outlander-workbench { gap: 16px; }
    #outlander-workbench .wb-tabs-bar {
      display: flex; gap: 6px; flex-wrap: wrap;
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(255,255,255,0.065);
      border-bottom: 1px solid rgba(255,255,255,0.065);
      border-radius: 13px; padding: 6px; margin-bottom: 2px;
    }
    #outlander-workbench .wb-sub-tab {
      background: transparent; border: 1px solid transparent; border-radius: 9px;
      padding: 9px 16px; font-size: 13px; color: var(--krs-dim);
      display: inline-flex; align-items: center; gap: 6px;
    }
    #outlander-workbench .wb-sub-tab:hover {
      background: rgba(255,255,255,0.06); border-color: transparent; color: #fff;
    }
    #outlander-workbench .wb-sub-tab.active {
      background: linear-gradient(180deg, rgba(201,165,78,0.3), rgba(201,165,78,0.12));
      border-color: rgba(201,165,78,0.55); color: var(--krs-gold);
      box-shadow: 0 2px 10px rgba(201,165,78,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
    }
    #outlander-workbench .wb-sub-tab > span {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 19px; height: 19px; padding: 0 5px; margin-left: 1px;
      border-radius: 999px; font-size: 10.5px; font-weight: 700;
      background: rgba(255,255,255,0.1); color: inherit;
    }
    #outlander-workbench .wb-sub-tab.active > span { background: rgba(201,165,78,0.32); }

    /* ── 卡片 ── */
    #outlander-workbench .wb-card {
      border-radius: 16px; padding: 18px;
      background: linear-gradient(180deg, rgba(24,19,34,0.82) 0%, rgba(13,10,19,0.78) 100%);
      border: 1px solid rgba(255,255,255,0.075);
      box-shadow: 0 12px 32px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.045);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    #outlander-workbench .wb-card-head {
      margin-bottom: 16px; padding-bottom: 11px;
      border-bottom: 1px solid rgba(201,165,78,0.2);
    }
    #outlander-workbench .wb-card-title { font-size: 15px; letter-spacing: 0.04em; }
    #outlander-workbench .wb-card-btn {
      font-size: 12px; padding: 6px 14px; border-radius: 8px;
      background: rgba(201,165,78,0.13); border: 1px solid rgba(201,165,78,0.5);
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    #outlander-workbench .wb-card-btn:hover {
      background: var(--krs-gold); color: #16121e; border-color: var(--krs-gold);
      box-shadow: 0 4px 14px rgba(201,165,78,0.35);
    }

    /* ── 字段格 ── */
    #outlander-workbench .wb-grid-3 { gap: 14px; }
    #outlander-workbench .wb-grid-3 + .wb-grid-3,
    #outlander-workbench .wb-grid-2 + .wb-grid-3,
    #outlander-workbench .wb-grid-3 + .wb-grid-2 { margin-top: 12px; }
    #outlander-workbench .field-box {
      gap: 7px; padding: 11px 13px; border-radius: 12px;
      background: rgba(255,255,255,0.028);
      border: 1px solid rgba(255,255,255,0.07);
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    }
    #outlander-workbench .field-box:hover {
      border-color: rgba(201,165,78,0.32); background: rgba(255,255,255,0.045);
    }
    #outlander-workbench .field-box:focus-within {
      border-color: rgba(201,165,78,0.6); background: rgba(201,165,78,0.06);
      box-shadow: 0 0 0 3px rgba(201,165,78,0.1);
    }
    #outlander-workbench .field-label {
      font-size: 11.5px; letter-spacing: 0.05em; gap: 6px;
      transition: color 0.2s;
    }
    #outlander-workbench .field-label[title] { cursor: help; }
    #outlander-workbench .field-box:focus-within .field-label { color: var(--krs-gold-hover); }

    /* ── 输入控件（只在工作台内生效）── */
    #outlander-workbench input[type=text],
    #outlander-workbench input[type=number],
    #outlander-workbench textarea {
      border-radius: 9px; font-size: 14px; padding: 9px 12px;
      background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.08);
    }
    #outlander-workbench input[type=text]:focus,
    #outlander-workbench input[type=number]:focus,
    #outlander-workbench textarea:focus {
      background: rgba(0,0,0,0.5); box-shadow: 0 0 0 3px rgba(201,165,78,0.12);
    }
    #outlander-workbench ::placeholder { color: rgba(153,145,166,0.6); font-size: 13px; }

    /* ── 选项胶囊 ── */
    #outlander-workbench .btn-chip {
      border-radius: 9px; padding: 8px 17px; font-size: 13.5px;
      background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.09);
      transition: all 0.18s ease;
    }
    #outlander-workbench .btn-chip:hover { border-color: rgba(201,165,78,0.5); background: rgba(201,165,78,0.09); }
    #outlander-workbench .btn-chip.selected {
      background: linear-gradient(180deg, var(--krs-gold), #b08f3c);
      border-color: var(--krs-gold); color: #17131f; font-weight: 700;
      box-shadow: 0 3px 12px rgba(201,165,78,0.32);
    }

    /* ── 滑轨与详情 ── */
    #outlander-workbench .wb-slider-bar { gap: 9px; padding-bottom: 10px; }
    #outlander-workbench .wb-slider-bar::-webkit-scrollbar { height: 6px; }
    #outlander-workbench .wb-slider-bar::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 999px; }
    #outlander-workbench .wb-slider-bar::-webkit-scrollbar-thumb { background: rgba(201,165,78,0.35); border-radius: 999px; }
    #outlander-workbench .wb-stage-detail {
      border-radius: 12px; padding: 16px; gap: 12px;
      background: linear-gradient(180deg, rgba(18,14,26,0.75) 0%, rgba(11,9,17,0.7) 100%);
      border-color: rgba(255,255,255,0.07);
    }

    /* ── 小屏 ── */
    @media (max-width: 780px) {
      #view-cards-container .view-card-btn.active::after { display: none; }
      #outlander-workbench .wb-card { padding: 14px; }
      #outlander-workbench .wb-sub-tab { padding: 8px 12px; font-size: 12.5px; }
    }

    /* ── 支线角色卡片：同尺寸但弱化边框，与核心角色区分 ── */
    .destiny-btn--branch .destiny-avatar { border-color: rgba(255,255,255,0.12); filter: saturate(0.75); }
    .destiny-btn--branch .destiny-name { color: var(--krs-dim); }
    .destiny-btn--branch.selected .destiny-name { color: var(--krs-gold); }

    /* ── 出生地地图：缩放 / 平移 ── */
    .birth-map-viewport { overflow: hidden; cursor: grab; touch-action: none; position: relative; }
    .birth-map-viewport.dragging { cursor: grabbing; }
    .birth-map-zoombar {
      position: absolute; top: 8px; right: 8px; z-index: 6;
      display: flex; flex-direction: column; gap: 4px; align-items: center;
    }
    .birth-zoom-btn {
      width: 26px; height: 26px; padding: 0; line-height: 1;
      display: flex; align-items: center; justify-content: center;
      font-family: inherit; font-size: 14px; cursor: pointer;
      color: var(--krs-gold); background: rgba(12,10,18,0.82);
      border: 1px solid rgba(201,165,78,0.45); border-radius: 7px;
      transition: all 0.16s ease; user-select: none;
    }
    .birth-zoom-btn:hover { background: rgba(201,165,78,0.22); border-color: var(--krs-gold); color: #fff; }
    .birth-zoom-btn:active { transform: scale(0.92); }
    .birth-zoom-label {
      font-size: 10px; letter-spacing: 0.04em; color: var(--krs-dim);
      background: rgba(12,10,18,0.82); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px; padding: 1px 5px; white-space: nowrap;
    }

    /* ══════════════════════════════════════════════════════════════
     * 自由开局预设：左侧「世界 · 地点」分类栏 + 右侧卡片列表
     * ══════════════════════════════════════════════════════════════ */
    .free-menu-shell { display: flex; gap: 14px; align-items: flex-start; }
    .free-menu-rail {
      flex: 0 0 152px; display: flex; flex-direction: column; gap: 6px;
      max-height: 432px; overflow-y: auto; padding-right: 4px;
    }
    .free-menu-rail::-webkit-scrollbar { width: 6px; }
    .free-menu-rail::-webkit-scrollbar-thumb { background: rgba(201,165,78,0.3); border-radius: 999px; }
    .free-rail-btn {
      position: relative; width: 100%; text-align: left; font-family: inherit;
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
      padding: 10px 12px; border-radius: 9px; cursor: pointer;
      font-size: 12.5px; letter-spacing: 0.02em;
      color: var(--krs-dim); background: rgba(255,255,255,0.035);
      border: 1px solid rgba(255,255,255,0.07);
      transition: all 0.18s ease;
    }
    .free-rail-btn:hover { border-color: rgba(201,165,78,0.4); color: #fff; background: rgba(255,255,255,0.06); }
    .free-rail-btn.active {
      background: linear-gradient(180deg, var(--krs-gold), #b08f3c);
      border-color: var(--krs-gold); color: #17131f; font-weight: 700;
      box-shadow: 0 3px 14px rgba(201,165,78,0.3);
    }
    .free-rail-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .free-rail-count {
      flex: 0 0 auto; min-width: 17px; height: 17px; padding: 0 4px;
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: 999px; font-size: 10px; font-weight: 700;
      background: rgba(255,255,255,0.1); color: inherit;
    }
    .free-rail-btn.active .free-rail-count { background: rgba(23,19,31,0.22); }
    .free-rail-btn.has-pick::after {
      content: ""; position: absolute; left: -3px; top: 50%; transform: translateY(-50%);
      width: 3px; height: 18px; border-radius: 2px; background: var(--krs-gold);
      box-shadow: 0 0 8px rgba(201,165,78,0.8);
    }
    .free-menu-list { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
    .free-menu-head {
      font-size: 12px; letter-spacing: 0.16em; color: var(--krs-gold2);
      border-bottom: 1px dashed var(--krs-line); padding-bottom: 7px;
    }
    .free-menu-list .chapters-grid { max-height: 400px; }
    @media (max-width: 780px) {
      .free-menu-shell { flex-direction: column; }
      .free-menu-rail { flex: 0 0 auto; width: 100%; flex-direction: row; flex-wrap: wrap; max-height: none; }
      .free-rail-btn { width: auto; }
      .free-menu-list .chapters-grid { max-height: 320px; }
    }

    /* ── 出生地地图：节点旁的地区常驻角色头像 ── */
    .birth-chip {
      position: absolute; transform: translate(-50%, -50%); z-index: 2;
      width: 20px; height: 20px; border-radius: 50%; overflow: hidden;
      background: rgba(12,10,18,0.9); border: 1px solid rgba(255,255,255,0.18);
      box-shadow: 0 2px 6px rgba(0,0,0,0.55); pointer-events: auto;
      transition: transform 0.16s ease, border-color 0.16s ease;
    }
    .birth-chip img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .birth-chip:hover { transform: translate(-50%, -50%) scale(1.25); border-color: var(--krs-gold); z-index: 4; }
    .birth-chip--more {
      display: flex; align-items: center; justify-content: center;
      font-size: 9.5px; font-weight: 700; color: var(--krs-gold);
      background: rgba(12,10,18,0.94); border-color: rgba(201,165,78,0.5);
    }
    .birth-map-viewport .birth-node { z-index: 3; }

    /* ── BS箱庭按钮与网状图覆盖层 ── */
    .birth-bs-btn {
      position: absolute; top: 8px; right: 40px; z-index: 6;
      font-family: inherit; font-size: 11.5px; letter-spacing: 0.06em;
      padding: 5px 11px; cursor: pointer; white-space: nowrap;
      color: var(--krs-gold); background: rgba(12,10,18,0.85);
      border: 1px solid rgba(201,165,78,0.45); border-radius: 7px;
      transition: all 0.16s ease;
    }
    .birth-bs-btn:hover { background: rgba(201,165,78,0.22); border-color: var(--krs-gold); color: #fff; }
    .bs-garden-overlay {
      position: absolute; inset: 0; z-index: 20;
      background: radial-gradient(ellipse at 50% 45%, rgba(24,18,36,0.97), rgba(8,6,14,0.99));
      display: flex; flex-direction: column; padding: 8px 10px 10px;
    }
    .bs-garden-head { display: flex; align-items: center; justify-content: space-between; padding-bottom: 6px; }
    .bs-garden-title { font-size: 11.5px; letter-spacing: 0.18em; color: var(--krs-gold2); }
    .bs-garden-close {
      width: 22px; height: 22px; padding: 0; cursor: pointer; font-family: inherit;
      color: var(--krs-dim); background: rgba(255,255,255,0.05);
      border: 1px solid var(--krs-line); border-radius: 6px; transition: all 0.15s ease;
    }
    .bs-garden-close:hover { color: #fff; border-color: var(--krs-red); background: rgba(186,67,75,0.22); }
    .bs-garden-stage { position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; }
    .bs-garden-svg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; }
    .bs-garden-line { stroke: rgba(201,165,78,0.28); stroke-width: 1.2; }
    .bs-garden-line--hub { stroke: rgba(201,165,78,0.45); stroke-width: 1.6; stroke-dasharray: 4 4; }
    .bs-garden-nodes { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
    .bs-garden-hub {
      position: absolute; transform: translate(-50%, -50%);
      display: flex; align-items: center; gap: 5px; padding: 5px 10px;
      background: rgba(20,15,30,0.95); border: 1px solid rgba(201,165,78,0.5);
      border-radius: 999px; font-size: 11px; color: var(--krs-gold); white-space: nowrap;
      box-shadow: 0 3px 12px rgba(0,0,0,0.5);
    }
    .bs-garden-ball {
      position: absolute; transform: translate(-50%, -50%);
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      background: none; border: 0; padding: 0; cursor: pointer; font-family: inherit;
    }
    .bs-garden-ball img {
      width: 34px; height: 34px; border-radius: 50%; object-fit: cover; display: block;
      border: 1px solid rgba(255,255,255,0.2); background: #14101e;
      box-shadow: 0 3px 10px rgba(0,0,0,0.55); transition: all 0.18s ease;
    }
    .bs-garden-ball span { font-size: 9.5px; color: var(--krs-dim); white-space: nowrap; text-shadow: 0 1px 3px #000; }
    .bs-garden-ball:hover img { border-color: var(--krs-gold); transform: scale(1.18); box-shadow: 0 0 14px rgba(201,165,78,0.6); }
    .bs-garden-ball:hover span { color: #fff; }
    .bs-garden-ball--plain img { filter: saturate(0.5) brightness(0.8); }
    .bs-garden-ball--plain:hover img { filter: none; }
    .bs-garden-tip {
      position: absolute; left: 50%; bottom: 2px; transform: translateX(-50%);
      font-size: 10px; color: var(--krs-dim); opacity: 0.75; white-space: nowrap;
    }
    @media (max-width: 780px) {
      .birth-bs-btn { font-size: 10.5px; padding: 4px 8px; right: 38px; }
    }

    /* ── 地图与箱庭：指针/触摸拖拽 + 箱庭自己的缩放控件 ── */
    .birth-map-viewport { touch-action: none; -webkit-user-select: none; user-select: none; }
    .bs-garden-canvas { position: absolute; left: 0; top: 0; width: 100%; height: 100%; transform-origin: 0 0; }
    .bs-garden-stage { touch-action: none; cursor: grab; -webkit-user-select: none; user-select: none; }
    .bs-garden-stage.dragging { cursor: grabbing; }
    .bs-garden-zoombar {
      position: absolute; top: 6px; right: 40px; z-index: 22;
      display: flex; align-items: center; gap: 4px;
    }
    .bs-zoom-btn {
      width: 24px; height: 24px; padding: 0; line-height: 1;
      display: flex; align-items: center; justify-content: center;
      font-family: inherit; font-size: 13px; cursor: pointer;
      color: var(--krs-gold); background: rgba(12,10,18,0.85);
      border: 1px solid rgba(201,165,78,0.45); border-radius: 6px; transition: all 0.16s ease;
    }
    .bs-zoom-btn:hover { background: rgba(201,165,78,0.22); border-color: var(--krs-gold); color: #fff; }
    .bs-zoom-btn:active { transform: scale(0.92); }
    .bs-zoom-label {
      font-size: 10px; color: var(--krs-dim); background: rgba(12,10,18,0.85);
      border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 1px 5px; white-space: nowrap;
    }
    .bs-garden-ball img { pointer-events: none; }
    @media (max-width: 780px) {
      .bs-garden-zoombar { right: 34px; }
      .bs-garden-ball img { width: 28px; height: 28px; }
      .bs-garden-hub { font-size: 10px; padding: 4px 8px; }
      .birth-bs-btn { font-size: 10px; padding: 4px 7px; }
    }

    /* 篇章未启用时不亮的箱庭圆球 */
    .bs-garden-ball--gated img { filter: grayscale(1) brightness(0.5); }
    .bs-garden-ball--gated:hover img { filter: grayscale(0.4) brightness(0.75); }

    /* 箱庭打开时把右侧信息栏让出来；球与枢纽放大一号 */
    .birth-map-shell.bs-open .birth-side { display: none; }
    .bs-garden-hub { padding: 6px 12px; font-size: 12.5px; }
    .bs-garden-ball img { width: 38px; height: 38px; }
    .bs-garden-ball span { font-size: 10.5px; }

    /* ── 自定义开局编辑器 ── */
    .free-rail-btn--custom { border-style: dashed; border-color: rgba(201,165,78,0.35); color: var(--krs-gold2); }
    .free-rail-btn--custom:hover { color: var(--krs-gold); }
    .free-custom-wrap { display: flex; flex-direction: column; gap: 10px; }
    .free-custom-hint { margin: 0; font-size: 12px; line-height: 1.85; color: var(--krs-dim); }
    .free-custom-hint b { color: var(--krs-gold); font-weight: 600; }
    .free-custom-text {
      width: 100%; min-height: 190px; resize: vertical; font-family: inherit;
      font-size: 13.5px; line-height: 1.8; color: var(--krs-text);
      background: rgba(0,0,0,0.42); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px; padding: 12px 14px; outline: none; transition: all 0.18s ease;
    }
    .free-custom-text:focus { border-color: rgba(201,165,78,0.6); background: rgba(0,0,0,0.55); box-shadow: 0 0 0 3px rgba(201,165,78,0.1); }
    .free-custom-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .free-custom-btn {
      font-family: inherit; font-size: 12.5px; cursor: pointer;
      padding: 7px 15px; border-radius: 8px; color: var(--krs-dim);
      background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.09);
      transition: all 0.18s ease;
    }
    .free-custom-btn:hover { border-color: rgba(201,165,78,0.5); color: #fff; }
    .free-custom-btn.primary {
      color: #17131f; font-weight: 700;
      background: linear-gradient(180deg, var(--krs-gold), #b08f3c);
      border-color: var(--krs-gold); box-shadow: 0 3px 12px rgba(201,165,78,0.3);
    }
    .free-custom-state { font-size: 12px; color: var(--krs-gold); margin-left: 4px; }

    /* ── 特性/家产/技能的预设面板 ── */
    .wb-head-actions { display: flex; gap: 6px; align-items: center; flex-shrink: 0; }
    .wb-preset-open { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.14); color: var(--krs-dim); }
    .wb-preset-open:hover { background: rgba(201,165,78,0.2); color: var(--krs-gold); border-color: var(--krs-gold); }
    .wb-preset-panel {
      margin: 2px 0 14px; padding: 12px; border-radius: 12px;
      background: rgba(10,8,16,0.55); border: 1px solid rgba(201,165,78,0.22);
      display: flex; flex-direction: column; gap: 8px;
      max-height: 340px; overflow-y: auto;
    }
    .wb-preset-tip { font-size: 11.5px; color: var(--krs-dim); margin-bottom: 2px; line-height: 1.7; }
    .wb-preset-card {
      position: relative; text-align: left; font-family: inherit; cursor: pointer;
      padding: 11px 13px; border-radius: 10px; width: 100%;
      background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08);
      transition: all 0.16s ease;
    }
    .wb-preset-card:hover { border-color: rgba(201,165,78,0.55); background: rgba(201,165,78,0.07); }
    .wb-preset-head { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; flex-wrap: wrap; }
    .wb-preset-head b { font-size: 13.5px; color: var(--krs-gold); }
    .wb-preset-tag {
      font-size: 10.5px; color: var(--krs-dim); padding: 1px 7px; border-radius: 999px;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    }
    .wb-preset-desc { font-size: 12px; line-height: 1.75; color: var(--krs-text); opacity: 0.85; }
    .wb-preset-add {
      position: absolute; right: 12px; bottom: 10px; font-size: 11px;
      color: var(--krs-gold2); opacity: 0; transition: opacity 0.16s ease;
    }
    .wb-preset-card:hover .wb-preset-add { opacity: 1; }

    /* ── 自定义开局：填满整行 + 预设库 ── */
    .free-custom-wrap { grid-column: 1 / -1; width: 100%; display: flex; flex-direction: column; gap: 10px; }
    .free-custom-lib {
      display: flex; flex-direction: column; gap: 8px; padding: 10px 12px; border-radius: 12px;
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    }
    .free-custom-lib-head { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--krs-dim); }
    .free-custom-lib-head > span { flex: 1 1 auto; }
    .free-custom-mini {
      font-family: inherit; font-size: 11.5px; cursor: pointer; padding: 4px 10px; border-radius: 7px;
      color: var(--krs-gold); background: rgba(201,165,78,0.12);
      border: 1px solid rgba(201,165,78,0.45); transition: all 0.16s ease;
    }
    .free-custom-mini:hover { background: var(--krs-gold); color: #17131f; }
    .free-custom-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .free-custom-chip {
      font-family: inherit; font-size: 12px; cursor: pointer; padding: 5px 12px; border-radius: 999px;
      color: var(--krs-dim); background: rgba(255,255,255,0.045);
      border: 1px solid rgba(255,255,255,0.09); transition: all 0.16s ease;
    }
    .free-custom-chip:hover { border-color: rgba(201,165,78,0.5); color: #fff; }
    .free-custom-chip.active { background: linear-gradient(180deg, rgba(201,165,78,0.85), rgba(201,165,78,0.55)); color: #17131f; font-weight: 700; border-color: var(--krs-gold); }
    .free-custom-empty { font-size: 11.5px; color: var(--krs-dim); opacity: 0.75; }
    .free-custom-namerow { display: flex; gap: 8px; align-items: center; }
    .free-custom-name {
      flex: 1 1 auto; font-family: inherit; font-size: 13px; color: var(--krs-text);
      background: rgba(0,0,0,0.42); border: 1px solid rgba(201,165,78,0.45);
      border-radius: 8px; padding: 8px 12px; outline: none;
    }

    /* ── 世界风云前端 ── */
    .wc-ctl-top { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
    .wc-switch {
      font-family: inherit; font-size: 13px; cursor: pointer; align-self: flex-start;
      padding: 8px 16px; border-radius: 9px; color: var(--krs-dim);
      background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.18s ease;
    }
    .wc-switch:hover { border-color: rgba(194,84,63,0.6); color: #fff; }
    .wc-switch.on {
      color: #ffe6de; font-weight: 700;
      background: linear-gradient(180deg, rgba(194,84,63,0.55), rgba(140,48,32,0.5));
      border-color: #c2543f; box-shadow: 0 3px 14px rgba(194,84,63,0.35);
    }
    .wc-presets { display: flex; gap: 8px; flex-wrap: wrap; }
    .wc-fields { display: flex; flex-direction: column; gap: 10px; transition: opacity 0.2s ease; }
    .wc-fields .wb-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .wc-fields .wc-wide { width: 100%; }
    .wc-select {
      width: 100%; font-family: inherit; font-size: 13px; color: var(--krs-text);
      background: rgba(0,0,0,0.42); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 9px; padding: 9px 12px; outline: none;
    }
    .wc-hint { margin: 2px 0 0; font-size: 12px; line-height: 1.85; color: var(--krs-dim); }
    .wc-hint b { color: #e88a75; }
    @media (max-width: 780px) { .wc-fields .wb-grid-2 { grid-template-columns: 1fr; } }

    /* ── 世界风云独立页 ── */
    .wc-page { display: flex; flex-direction: column; gap: 12px; }
    .wc-remind { font-size: 12px; color: var(--krs-gold); opacity: 0.9; letter-spacing: 0.02em; }
    .wc-off-hint { padding: 26px 18px; text-align: center; font-size: 12.5px; line-height: 2; color: var(--krs-dim); background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; }
    .wc-preset-block { display: flex; flex-direction: column; gap: 9px; }
    .wc-preset-head { font-size: 12px; color: var(--krs-dim); }
    .wc-preset-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 9px; }
    .wc-preset-card {
      text-align: left; font-family: inherit; cursor: pointer; padding: 11px 13px; border-radius: 11px;
      background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08); transition: all 0.16s ease;
    }
    .wc-preset-card:hover { border-color: rgba(194,84,63,0.6); background: rgba(194,84,63,0.08); }
    .wc-preset-card.active { border-color: #c2543f; background: rgba(194,84,63,0.14); box-shadow: 0 0 0 1px rgba(194,84,63,0.35) inset; }
    .wc-preset-top { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; flex-wrap: wrap; }
    .wc-preset-top b { font-size: 13px; color: var(--krs-gold); }
    .wc-preset-tag { font-size: 10.5px; color: var(--krs-dim); padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); }
    .wc-preset-desc { font-size: 11.5px; line-height: 1.7; color: var(--krs-text); opacity: 0.82; }
    .wc-actions { display: flex; gap: 8px; }

    /* ── 顶部分步条：防止标题溢出压到相邻一项 ── */
    .step-bar, .step-item-bar { min-width: 0; }
    .step-item { min-width: 0; overflow: hidden; }
    .step-item-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
    @media (max-width: 900px) { .step-item-title { font-size: 11px; } }
`;

  const KRS_WORKS = [
    {
      key: '克蕾雅篇',
      label: '克蕾雅篇',
      desc: '恶役千金卢克蕾齐雅的主线条目：人设、语料、主线细纲与败北支线。',
      avatar: CLAIRE_SPRITE,
      test: (c) => c.indexOf('[クレア]') >= 0
    },
    {
      key: '迷宫都市篇',
      label: '迷宫都市篇',
      desc: '伊莉丝与迷宫都市侧条目：灭魔圣女的独立篇章与恶堕支线。',
      avatar: IRIS_SPRITE,
      test: (c) => c.indexOf('[迷宫]') >= 0
    },
  ];

  function krsEntryLabel(entry) { return String((entry && (entry.comment || entry.name)) || '').trim(); }

  /* ─────────────────────────────────────────────────────────────
   * 学院模式 · 排他白名单
   * 学院模式下只允许四类条目存在：
   *   ① 基础规则（[RULE] / [mvu_update] / 对白美化 / [正文] / [联动模式] / 角色速览 / 扶她化）
   *   ② 克蕾雅本篇（[クレア] 交给原有分支做细粒度判定）
   *   ③ [学院模式] 自身条目
   *   ④ 已置籍角色的角色卡（人设／语料／档案，且不带「世界观／主线大纲／地图／自由模式／势力／
   *      战力对标／命运主线／国家表／角色索引／剧情细纲／支线／融合世界观」这类外部世界标签）
   * 其余一切在学院模式下一律强制关闭。原因：脚本原有的联动分支优先级最高，
   * linkMode 打开时王逝／医术师／祈愿诗篇的常驻条目会全部保留；而这些条目的关键词
   * （南境、温伯格、安纳托尔、各角色名）又会被正文与开局设定命中，把整片外部世界
   * 拉进首轮提示词，首轮直接膨胀到 9 万 token。
   * ───────────────────────────────────────────────────────────── */
  const KRS_ACA_CAST = /克蕾雅|凯埃尔|莉莉娅|梅拉妮|拉姆内|露娜|桑尼|萨菲亚|千金三人组|艾尔希|柯萝特|丽塔|盖欧露易丝|古伊奈|伊莉丝|夏洛特|雫|响木天音|小忆|芙洛瑞丝|布娜|加莉泰娅|芙萝|斯提亚拉|芙洛蒂|艾妮希雅|托莉娜|奇诺米|蒂莎|雷克西斯|欧迪|帕特里琪娅|卡莲|狄娜|菲娅娜|幽妮娅|阿黛拉|艾拉|五月雨/;
  const KRS_ACA_DROP = /世界观|主线大纲|地图|自由模式|势力|战力对标|命运主线|国家表|角色索引|剧情细纲|支线|坏结局|恶神|邪神/;
  const KRS_ACA_BASE = /^\[RULE\]|^\[mvu_update\]|^\[中文-对白美化\]|^\[日文-对白美化\]|^\[对白美化\]|^\[正文\]|^\[联动模式\]|^---角色速览---|扶她/;

  function krsAcademyKeep(label) {
    /* 命运主线规则在学院模式下由 [学院模式]23 的精简版取代，原条目强制关闭；
       变量更新规则保持原样常驻（玩家要求不精简变量系统）。 */
    if (/^\[RULE\]命运主线\[mvu_update\]/.test(label)) return false;
    if (label.indexOf('学院模式') >= 0) return true;
    if (KRS_ACA_BASE.test(label)) return true;
    if (label.indexOf('[クレア]') >= 0) return true;
    if (KRS_ACA_CAST.test(label) && !KRS_ACA_DROP.test(label)) return true;
    return false;
  }

  /* 只切换 [mvu_update]世界风云 这一条的开关，不碰其它条目（避免覆盖玩家在 ST 里手动改过的状态） */
  async function krsSyncCrisis() {
    const update = fn('updateWorldbookWith');
    if (typeof update !== 'function') return { ok: false, errors: ['没有 updateWorldbookWith 接口'] };
    const bookName = await krsLocateBook();
    if (!bookName) return { ok: false, errors: ['没能定位到本卡绑定的世界书'] };
    let changed = 0;
    try {
      await update(bookName, (entries) => (Array.isArray(entries) ? entries : []).map((e) => {
        if (krsEntryLabel(e).indexOf('世界风云') < 0) return e;
        const want = !!state.worldCrisis.on;
        if (!!e.enabled === want) return e;
        changed += 1;
        return Object.assign({}, e, { enabled: want });
      }));
    } catch (err) {
      console.warn('[命运之书] 世界风云世界书条目开关失败', err);
      return { ok: false, errors: [String(err && err.message || err)] };
    }
    return { ok: true, book: bookName, changed: changed };
  }

  async function krsLocateBook() {
    const getCharWorldbookNames = fn('getCharWorldbookNames');
    const getWorldbookNames = fn('getWorldbookNames');
    let bookName = '';
    try {
      if (typeof getCharWorldbookNames === 'function') {
        const names = await Promise.resolve(getCharWorldbookNames('current'));
        bookName = String((names && (names.primary || names.name)) || '');
      }
    } catch (_) {}
    if (!bookName && typeof getWorldbookNames === 'function') {
      try {
        const all = await Promise.resolve(getWorldbookNames());
        if (Array.isArray(all)) bookName = String(all.find((n) => /克蕾雅|克蕾娅|挣扎/.test(String(n))) || all[0] || '');
      } catch (_) {}
    }
    return bookName;
  }

  function krsEntryKind(label) {
    if (/人设|语料|速览/.test(label)) return '角色';
    if (/支线|坏结局/.test(label)) return '支线';
    if (/剧情细纲/.test(label)) return '主线章';
    if (/命运主线/.test(label)) return '命运';
    return '世界';
  }

  async function krsSyncWorks(flags) {
    const update = fn('updateWorldbookWith');
    const getWorldbook = fn('getWorldbook');
    if (typeof update !== 'function' || typeof getWorldbook !== 'function') {
      return { ok: false, errors: ['这个环境没有 updateWorldbookWith / getWorldbook 接口'], book: '', changed: 0, matched: 0 };
    }
    const bookName = await krsLocateBook();
    if (!bookName) return { ok: false, errors: ['没能定位到本卡绑定的世界书'], book: '', changed: 0, matched: 0 };
    const f = flags || {};
    let changed = 0, matched = 0;
    const errors = [];
    await update(bookName, (entries) => {
      const list = Array.isArray(entries) ? entries : [];
      return list.map((entry) => {
        const label = krsEntryLabel(entry);
        const content = String(entry.content || '');

        /* 【世界风云】总开关：只有开局前端「世界风云」页打开时，这条变量规则才注入
           —— 放在最前面，优先于学院模式白名单，否则学院模式下会被一律关掉 */
        if (label.indexOf('世界风云') >= 0) {
          const wcWant = !!state.worldCrisis.on;
          if (!!entry.enabled === wcWant) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: wcWant });
        }

        // 【学院模式 · 排他白名单】学院模式下一律先关掉白名单以外的条目，再做后续分支判定
        if (state.mode === '学院模式' && !krsAcademyKeep(label)) {
          if (entry.enabled) {
            changed += 1;
            return Object.assign({}, entry, { enabled: false });
          }
          return entry;
        }

        // 【新增】优先处理联动角色条目（只严格匹配标题/备注，不扫正文）
        let linkedCharName = null;
        for (const [charName, data] of Object.entries(LINKED_CONFIG)) {
          if (data.tags.some(tag => label.includes(tag))) {
            linkedCharName = charName;
            break;
          }
        }
        if (linkedCharName) {
          const shouldEnable = !!f.link && !!f.linkChars && !!f.linkChars[linkedCharName];
          if (!!entry.enabled !== shouldEnable) {
            changed++;
            return Object.assign({}, entry, { enabled: shouldEnable });
          }
          return entry;
        }

        // 【医术师】总控：细纲由「医术师篇」控制；地图／世界观／人设等常驻条目由第一幕「医术师-温伯格篇」控制
        // 注意：[医术师] 前缀的常驻条目已被上面的 LINKED_CONFIG 分支接管，这里主要处理 [温伯格] 前缀的细纲
        if (label.indexOf('[温伯格]') >= 0 || label.indexOf('[医术师]') >= 0) {
          const ijLinkOn = !!(f.link && f.linkChars && f.linkChars['医术师-温伯格篇']);
          const ijIsChapter = label.indexOf('[剧情细纲]') >= 0;
          const ijWant = ijIsChapter ? !!(f.医术师剧情 && ijLinkOn) : ijLinkOn;
          if (!!entry.enabled === ijWant) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: ijWant });
        }

        // 【祈愿诗篇】总控：细纲由「祈愿诗篇剧情」控制；地图／世界观／人设等常驻条目由第一幕「祈愿诗篇-安纳托尔岛篇」控制
        // 注意：[祈愿诗篇] 前缀的常驻条目已被上面的 LINKED_CONFIG 分支接管，这里主要处理 [安纳托尔] 前缀的细纲
        if (label.indexOf('[安纳托尔]') >= 0 || label.indexOf('[祈愿诗篇]') >= 0) {
          const pgLinkOn = !!(f.link && f.linkChars && f.linkChars['祈愿诗篇-安纳托尔岛篇']);
          const pgIsChapter = label.indexOf('[剧情细纲]') >= 0;
          const pgWant = pgIsChapter ? !!(f.祈愿诗篇剧情 && pgLinkOn) : pgLinkOn;
          if (!!entry.enabled === pgWant) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: pgWant });
        }

        // 【王逝】总控：细纲由「王逝剧情篇」控制；后日谈／自由模式等常驻条目只由第一幕「王逝-南境篇」控制
        if (label.indexOf('[王逝]') >= 0) {
          const linkOn = !!(f.link && f.linkChars && f.linkChars['王逝-南境篇']);
          const isChapter = label.indexOf('[剧情细纲]') >= 0;
          const want = isChapter ? !!(f.王逝剧情 && linkOn) : linkOn;
          if (!!entry.enabled === want) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: want });
        }

        // 【学院模式 vs 自由模式】互斥条目控制
        if (label.indexOf('学院模式') >= 0) {
          const wantAcademy = (state.mode === '学院模式');
          if (!!entry.enabled === wantAcademy) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: wantAcademy });
        }

        if (label.indexOf('自由模式反派') >= 0) {
          const wantVillain = (state.mode === '自由模式') && !!f.villain;
          if (!!entry.enabled === wantVillain) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: wantVillain });
        }

        if (label.indexOf('自由模式') >= 0) {
          const wantFree = (state.mode === '自由模式');
          if (!!entry.enabled === wantFree) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: wantFree });
        }

        /* ── 学院模式白名单的复原分支 ──
           以下条目在学院模式下被强制关闭，但它们不属于任何篇章体系，
           原有分支不会重新启用它们。离开学院模式时按本条恢复，
           否则「变量更新规则／命运主线规则」等常驻条目会在切换模式后永久消失。 */
        if (/^\[RULE\]命运主线\[mvu_update\]|^\[剧情细纲\]|^\[人设\]|^\[迷宫主线\]---角色速览---|^---\[联动模式\]联动角色/.test(label)) {
          const wantBack = (state.mode !== '学院模式');
          if (!!entry.enabled === wantBack) return entry;
          changed += 1;
          return Object.assign({}, entry, { enabled: wantBack });
        }

        const work = KRS_WORKS.find((w) => w.test(label));        if (!work) return entry;
        matched += 1;
        const isKl = work.key === '克蕾雅篇';
        const kind = krsEntryKind(label);
        let want;

        if (/自由模式|结局模式/.test(label)) {
          want = true;
        }
        else if (kind === '世界') want = true;
        else if (kind === '角色') want = !!f[isKl ? '克蕾雅' : '迷宫'];
        else if (kind === '支线') want = !!f[isKl ? '克蕾雅支线' : '伊莉丝支线'];
        else if (kind === '命运') want = true;
        else want = !!f[isKl ? '克蕾雅剧情' : '迷宫剧情'];

        if (!!entry.enabled === want) return entry;
        changed += 1;
        return Object.assign({}, entry, { enabled: want });
      });
    }, { render: 'debounced' });
    if (!matched) errors.push('世界书里没有找到任何 [クレア] / [迷宫] 条目');
    return { ok: errors.length === 0, changed, matched, errors, book: bookName };
  }

  /* ─────────────────────────────────────────────────────────
   * 开局变量预注入
   * 世界书的 EJS 门控读的是楼层变量；开局那一轮变量还不存在，
   * 所以细纲要等到 AI 第二轮才生效。这里在创建开局楼层时直接把
   * 剧情.王逝篇 / 王逝篇章 / 世界.日期 等写进该楼层变量，
   * 让第一轮就能读到并注入对应章节。
   * ───────────────────────────────────────────────────────── */
  function krsSetPath(obj, path, value) {
    const keys = String(path).split('.');
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {};
      cur = cur[k];
    }
    cur[keys[keys.length - 1]] = value;
    return obj;
  }

  function krsGrabMvu() {
    try { if (typeof Mvu !== 'undefined' && Mvu) return Mvu; } catch (_) {}
    const list = [HW, window, HW.TavernHelper, window.TavernHelper];
    for (let i = 0; i < list.length; i++) {
      try { if (list[i] && list[i].Mvu) return list[i].Mvu; } catch (_) {}
    }
    return null;
  }

  function krsWaitMvu(maxMs) {
    const limit = maxMs || 4000;
    return new Promise((resolve) => {
      const start = Date.now();
      let done = false;
      const finish = (m) => { if (!done) { done = true; resolve(m); } };
      const attempt = () => {
        const m = krsGrabMvu();
        if (m) return finish(m);
        if (Date.now() - start > limit) return finish(null);
        setTimeout(attempt, 150);
      };
      const waitFn = fn('waitGlobalInitialized');
      if (typeof waitFn === 'function') {
        Promise.resolve(waitFn('Mvu')).then(() => finish(krsGrabMvu())).catch(() => finish(krsGrabMvu()));
        setTimeout(() => finish(krsGrabMvu()), limit);
        return;
      }
      attempt();
    });
  }

  function krsBuildSeed(meta) {
    const st = meta || {};
    const stories = st.stories || {};
    const klOn = !!stories['克蕾雅剧情'];
    const labOn = !!stories['迷宫都市剧情'];
    const keOn = !!stories['王逝剧情'];
    const keCh = keOn ? (st.keChapter || '序章') : '';
    const ijOn = !!stories['医术师剧情'];
    const ijCh = ijOn ? (st.ijChapter || '序章') : '';
    const pgOn = !!stories['祈愿诗篇剧情'];
    const pgCh = pgOn ? (st.pgChapter || '序章') : '';
    /* 篇章：若处于学院模式则注入学院模式；剧情开启为剧情模式，否则自由模式 */
    const plotMode = (st.mode === '结局模式')
      ? '结局模式'
      : (st.mode === '学院模式'
        ? '学院模式'
        : ((klOn || labOn || st.mode === '剧情模式') ? '剧情模式' : '自由模式'));
    const s = {};
    s['剧情.篇章'] = plotMode;
    s['剧情.克蕾雅篇'] = klOn;
    s['剧情.克蕾雅篇章'] = klOn ? (st.chapter || '序章') : '';
    s['剧情.伊莉丝篇'] = labOn;
    s['剧情.伊莉丝篇章'] = labOn ? (st.labChapter || '序章') : '';
    s['剧情.王逝篇'] = keOn;
    s['剧情.王逝篇章'] = keCh;
    s['剧情.王逝进度.当前节点'] = keOn ? ('开局：' + (st.krsChapterLabel || keCh)) : '';
    s['剧情.王逝进度.下一步节点'] = '';
    s['剧情.医术师篇'] = ijOn;
    s['剧情.医术师篇章'] = ijCh;
    s['剧情.医术师进度.当前节点'] = ijOn ? ('开局：' + (st.ijChapterLabel || ijCh)) : '';
    s['剧情.医术师进度.下一步节点'] = '';
    s['剧情.祈愿诗篇篇'] = pgOn;
    s['剧情.祈愿诗篇篇章'] = pgCh;
    s['剧情.祈愿诗篇进度.当前节点'] = pgOn ? ('开局：' + (st.pgChapterLabel || pgCh)) : '';
    s['剧情.祈愿诗篇进度.下一步节点'] = '';
    s['剧情.支线'] = st.route || '';
    if (ijOn && st.ijChapterDate) s['世界.日期'] = st.ijChapterDate;
    /* 王逝与医术师同开时，日期以王逝篇为准（写在后面覆盖） */
    if (pgOn && st.pgChapterDate) s['世界.日期'] = st.pgChapterDate;
    /* 多线同开时，日期按 医术师 → 王逝 的顺序覆盖（王逝最后写，故优先） */
    if (keOn && st.krsChapterDate) s['世界.日期'] = st.krsChapterDate;
    /* ── 学院模式：开局即写入四项常驻事项 ──
       给玩家持续的推力：周班级比试／月度组队历练／月度学业考核／个人成绩提升目标。
       这四项不随场景结束而清退，由 [学院模式]25·常驻活动与成长线 规定其周期维护方式。 */
    if (st.mode === '学院模式') {
      s['世界.事件.周班级比试'] = { 类型: '活动', 内容: '每周六在练兵场举行的班级积分赛；胜 3 分、平 1 分、负 0 分，班级积分累计至学年评定', 相关者: '全院一等生', 期限: '每周六', 状态: '进行中' };
      s['世界.事件.月度组队历练'] = { 类型: '活动', 内容: '每月第三周起、为期一周的结组野外历练，须提交历练报告并计入实技成绩', 相关者: '全院一等生', 期限: '每月第三周起一周', 状态: '进行中' };
      s['世界.事件.月度学业考核'] = { 类型: '活动', 内容: '每月最后一个周五的全院月考，成绩张贴公告廊并并入学期总评', 相关者: '全院学生', 期限: '每月最后一个周五', 状态: '进行中' };
      s['世界.事件.成绩提升目标'] = { 类型: '任务', 内容: '起步目标：本月月考进入全班中位以上；达成后逐档上调（前十 → 学年前三名 → 守住前三）', 相关者: '本人', 期限: '下一次月考', 状态: '进行中' };
    }
    if (st.view) s['世界.视角'] = st.view;
    if (typeof st.name === 'string' && st.name) s['user.称呼'] = st.name;

    /* ── 外来者专属构建变量首轮硬注 ── */
    if (st.view === '外来者') {
      if (st.userExtra) {
        if (st.userExtra.身份) s['user.身份'] = st.userExtra.身份;
        if (st.userExtra.服装) s['user.服装'] = st.userExtra.服装;
        if (st.userExtra.身体状态) s['user.状态'] = st.userExtra.身体状态;
        if (st.userExtra.风评) s['user.风评'] = st.userExtra.风评;
        if (st.userExtra.身体) s['user.身体'] = st.userExtra.身体;
        if (st.userExtra.契约) s['user.契约'] = st.userExtra.契约;
      }
      if (st.power && !isNaN(Number(st.power))) s['user.战力水平'] = Number(st.power);
      if (st.gold && !isNaN(Number(st.gold))) s['user.金币'] = Number(st.gold);

      // 👥 写入登场的开局同行者到 角色.{姓名}
      if (Array.isArray(st.customCompanions) && st.customCompanions.length) {
        st.customCompanions.filter(c => c.登场 !== false && c.姓名).forEach(c => {
          s[`角色.${c.姓名}`] = {
            在场: true,
            地点: '随行',
            动向: '陪同在主角身边',
            身份: c.身份 || '同行者',
            关系: c.关系 || '无联系',
            羁绊: c.羁绊 || '',
            战力水平: (!isNaN(Number(c.战力水平)) && c.战力水平 !== '') ? Number(c.战力水平) : 1,
            服装: '',
            身体状态: '正常',
            亲密程度: (!isNaN(Number(c.亲密程度)) && c.亲密程度 !== '') ? Number(c.亲密程度) : 0,
            性吸引力: (!isNaN(Number(c.性吸引力)) && c.性吸引力 !== '') ? Number(c.性吸引力) : 0,
            金币: 0,
            futa模式: false,
            技能: {},
            特性: {}
          };

          });
      }

      // 写入 user.技能
      if (Array.isArray(st.userSkills) && st.userSkills.length) {
        st.userSkills.forEach(sk => {
          if (sk.名称) {
            s[`user.技能.${sk.名称}`] = {
              流派: sk.流派 || '其他',
              熟练度: Number(sk.熟练度) || 0,
              介绍: sk.介绍 || '',
              提升方法: sk.提升方法 || ''
            };
          }
        });
      }
      // 写入 user.特性
      if (Array.isArray(st.userTraits) && st.userTraits.length) {
        st.userTraits.forEach(tr => {
          if (tr.名称) {
            s[`user.特性.${tr.名称}`] = {
              分类: tr.分类 || '体质·常驻',
              描述: tr.描述 || ''
            };
          }
        });
      }
      // 写入 user.资产
      if (Array.isArray(st.userAssets) && st.userAssets.length) {
        st.userAssets.forEach(as => {
          if (as.名称) {
            s[`user.资产.${as.名称}`] = {
              类型: as.类型 || '家',
              位置: as.位置 || '',
              规模: Number(as.规模) || 1,
              状态: as.状态 || '',
              产出: as.产出 || ''
            };
          }
        });
      }
    }

    return s;
  }

  function krsSeedStatData(seed) {
    const stat = {};
    Object.keys(seed).forEach((p) => krsSetPath(stat, p, seed[p]));
    return stat;
  }

  function krsPickId(created) {
    try {
      if (typeof created === 'number') return created;
      if (Array.isArray(created) && created.length) {
        for (let i = created.length - 1; i >= 0; i--) {
          const c = created[i];
          if (typeof c === 'number') return c;
          if (c && typeof c === 'object') {
            if (typeof c.message_id === 'number') return c.message_id;
            if (typeof c.id === 'number') return c.id;
          }
        }
      }
    } catch (_) {}
    return null;
  }

  async function krsWriteVariables(messageId, seed) {
    const api = await krsWaitMvu(4000);
    if (api && typeof api.getMvuData === 'function' && typeof api.replaceMvuData === 'function') {
      try {
        let vars = api.getMvuData({ type: 'message', message_id: messageId });
        vars = await Promise.resolve(vars);
        if (!vars || typeof vars !== 'object') vars = {};
        if (!vars.stat_data || typeof vars.stat_data !== 'object') vars.stat_data = {};
        Object.keys(seed).forEach((p) => krsSetPath(vars.stat_data, p, seed[p]));
        await api.replaceMvuData(vars, { type: 'message', message_id: messageId });
        return 'mvu';
      } catch (e) { console.warn('[命运之书] MVU 写入失败，改用助手变量接口：', e); }
    }
    const upd = fn('updateVariablesWith');
    if (typeof upd === 'function') {
      try {
        await upd((vars) => {
          const v = (vars && typeof vars === 'object') ? vars : {};
          if (!v.stat_data || typeof v.stat_data !== 'object') v.stat_data = {};
          Object.keys(seed).forEach((p) => krsSetPath(v.stat_data, p, seed[p]));
          return v;
        }, { type: 'message', message_id: messageId });
        return 'helper';
      } catch (e) { console.warn('[命运之书] 助手变量写入失败：', e); }
    }
    return null;
  }

  function renderFateBook(container, onFinalSubmit) {
    const shadow = container.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>${SHADOW_CSS}</style>
      <div class="book-shell" data-current-page="0">
        <!-- 创世回廊式 顶部全局步骤导航条 -->
        <div class="stepper-nav" id="stepper-nav">
          <button class="step-item active" type="button" data-to-page="0">
            <div class="step-item-bar"></div>
            <div class="step-item-title">01 / 篇章扉页</div>
          </button>
          <button class="step-item" type="button" data-to-page="1">
            <div class="step-item-bar"></div>
            <div class="step-item-title">02 / 联动篇章</div>
          </button>
          <button class="step-item" type="button" data-to-page="2">
            <div class="step-item-bar"></div>
            <div class="step-item-title">03 / 因果之轨</div>
          </button>
          <button class="step-item" type="button" data-to-page="3">
            <div class="step-item-bar"></div>
            <div class="step-item-title">04 / 魂之印记</div>
          </button>
          <button class="step-item" type="button" data-to-page="4">
            <div class="step-item-bar"></div>
            <div class="step-item-title">05 / 纠缠之线</div>
          </button>
          <button class="step-item" type="button" data-to-page="5">
            <div class="step-item-bar"></div>
            <div class="step-item-title">06 / 世界风云</div>
          </button>
          <button class="step-item" type="button" data-to-page="6">
            <div class="step-item-bar"></div>
            <div class="step-item-title">07 / futa设定</div>
          </button>
          <button class="step-item" type="button" data-to-page="7">
            <div class="step-item-bar"></div>
            <div class="step-item-title">08 / 终幕铭刻</div>
          </button>
        </div>

        <div class="border-top"></div>
        <div class="stage">

          <!-- Page 0: 封面 -->
          <div class="page cover-page active" id="p-0">
            <div class="cover-copy">
              <div class="cover-badge">乙女游戏恶役千金转生录</div>
              <div class="cover-title">命 运 之 书</div>
              <div class="cover-sub">克 蕾 雅 的 挣 扎</div>
              <div class="cover-intro">
                「这里是轮回之道。迎来终焉的灵魂，前往下一程的地方。<br>
                只要抓住这只手，你就能保留现在的记忆，获得再一次活下去的机会……」<br><br>
                等待着恶役千金卢克蕾齐雅的，只有处刑或嫁给肥胖贵族的未来。<br>
                翻开书页，裁定最初的因果之轨。
              </div>
              <div class="work-pick">
                <div class="work-pick-title">启 用 篇 章 角 色</div>
                <div class="work-pick-row" id="work-pick-row"></div>
                <div class="work-hint" id="work-hint">可多选。这里只管角色／世界观条目的开关，不影响走哪条剧情。</div>
              </div>
              <button class="cover-start" type="button" id="btn-open-book">翻 开 书 页</button>
            </div>
          </div>

          <!-- Page 1: 联动角色页 -->
          <div class="page" id="p-1">
            <div class="header">
              <div class="h-title">第一幕 · 联 动 之 影</div>
              <div class="h-desc">开启联动篇章，接纳来自异界的旅人与全新大陆</div>
            </div>

            <div class="link-section">
              <button class="link-top-btn" type="button" id="link-master-btn">联 动 角 色：已开启</button>
              
              <div class="section-label">✦ 异 界 旅 人 · 单 人 联 动</div>
              <div class="link-avatars" id="link-avatars-box"></div>
              
              <div class="section-label" style="margin-top: 8px;">✦ 重 大 扩 展 · 完 整 世 界 观 篇 章</div>
              <div class="link-expansions-grid" id="link-expansions-box"></div>
              
              <!-- 底部角色与篇章介绍区 -->
              <div class="link-detail" id="link-detail-box" style="display:none;">
                <div class="link-detail-img">
                  <img id="link-big-img" src="" alt="角色大立绘">
                </div>
                <div class="link-detail-text">
                  <!-- 顶部：角色名（附带关联角色） + 启用切换按钮 -->
                  <div class="link-detail-header">
                    <div style="display: flex; align-items: center;">
                      <h4 id="link-name">名字</h4>
                      <div id="link-subchar-slot"></div>
                    </div>
                    <button id="link-toggle-btn" type="button" class="link-toggle-btn">+ 启用该角色</button>
                  </div>

                  <!-- 内容正文（未启用时会被整体压暗封存） -->
                  <div class="link-detail-body" id="link-detail-body">
                    <p><strong>背景：</strong><span id="link-bg"></span></p>
                    <p><strong>现在的情况：</strong><span id="link-now"></span></p>
                    <p><strong>世界改动：</strong><span id="link-world-change" style="color: #e0be6c;"></span></p>

                    <!-- 原来按钮的位置：变更为【世界书更改】查看区 -->
                    <div class="link-wb-box">
                      <div class="link-wb-label">✦ 影响的世界书条目（启用后自动注入激活）：</div>
                      <div class="link-wb-tags" id="link-wb-tags"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="page" id="p-2">
            <div class="header">
              <div class="h-title">第二幕 · 因 果 之 轨</div>
              <div class="h-desc">决定时间指针落下的舞台，对应章节细纲将精准注入</div>
            </div>
            <div class="section-label">无危机生活 · 自由与终局</div>
            <div class="timeline-row timeline-row--single" id="mode-box" style="display: flex; flex-direction: column; gap: 14px;"></div>

            <div class="section-label secondary" style="margin-top: 16px;">剧情线 · 可多选 · 选了就会自动取消「自由模式」</div>
            <div class="timeline-row" id="story-box"></div>

            <div class="story-hint" id="story-hint"></div>

            <div class="section-label secondary" style="margin-top: 16px;">联动世界剧情 · 可与「自由模式」「克蕾雅篇」同时开启</div>
            <div class="timeline-row" id="linkstory-box"></div>
            <div class="story-hint" id="linkstory-hint"></div>
          </div>

          <!-- Page 3: 魂之印记 -->
          <div class="page" id="p-3">
            <div class="header">
              <div class="h-title">第三幕 · 魂 之 印 记</div>
              <div class="h-desc">视点归属裁定与灵魂构筑（外来者专属深度建卡）</div>
            </div>
            <div class="wb-kicker">▸ 视 点 归 属 · 选 择 你 要 扮 演 的 身 份</div>

            <!-- 🌟 顶置三大视点卡片按钮（加独立ID直连绑定） -->
            <div class="view-cards-row" id="view-cards-container">
              <button type="button" class="view-card-btn active view-card-text-only" id="btn-view-outlander" data-view-btn="外来者">
                <div class="view-card-info">
                  <span class="view-card-title">✦ 外 来 者</span>
                  <span class="view-card-desc">独立灵魂 · 展开专属深度自定义</span>
                </div>
              </button>

              <button type="button" class="view-card-btn" id="btn-view-claire" data-view-btn="克蕾雅">
                <div class="view-card-avatar">
                  <img src="${CLAIRE_SPRITE}" alt="克蕾雅">
                </div>
                <div class="view-card-info">
                  <span class="view-card-title">克 蕾 雅</span>
                  <span class="view-card-desc">公爵千金 · 转生主角（原著设定）</span>
                </div>
              </button>

              <button type="button" class="view-card-btn" id="btn-view-iris" data-view-btn="伊莉丝">
                <div class="view-card-avatar">
                  <img src="${IRIS_SPRITE}" alt="伊莉丝">
                </div>
                <div class="view-card-info">
                  <span class="view-card-title">伊 莉 丝</span>
                  <span class="view-card-desc">灭魔圣女 · 迷宫都市篇主角</span>
                </div>
              </button>
            </div>

            <!-- A. 原著主角极简展台（选择克蕾雅/伊莉丝时展示，收起复杂建卡，仅留前世性别） -->
            <div id="canon-protagonist-panel" style="display:none;">
              <div class="canon-simple-card">
                <div class="canon-notice-banner" id="canon-notice-text">
                  <span>✦ 你将作为原著主角推进命运：克蕾雅</span>
                </div>
                
                <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
                  <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 12px;">
                    <div class="form-row">
                      <label style="width: 80px;">前世性别</label>
                      <div class="chips-box" id="gender-chips-canon"></div>
                    </div>
                    
                    <p style="font-size: 12.5px; color: var(--krs-dim); line-height: 1.8; margin-top: 4px;" id="canon-protagonist-desc">
                      您已选择作为原著主角推进故事。角色的技能、特性、资产与战力将完全沿用原作设定，已为您隐藏繁琐的自定义分配面板。
                    </p>
                  </div>

                  <aside class="claire-sprite" id="claire-sprite" style="padding-top: 0;">
                    <img src="${CLAIRE_SPRITE}" alt="立绘" style="max-width: 180px;">
                    <div class="sprite-name">克 蕾 雅</div>
                    <div class="sprite-note">你就是她 · 转生者本人</div>
                  </aside>
                </div>
              </div>
            </div>

            <!-- B. 外来者专属：高度集成且可视化的 TRPG 式建卡工作台（对标状态栏家产） -->
            <div class="outlander-workbench" id="outlander-workbench">
              <p class="wb-lead">✦ 五个分区都可以留空 —— 填得越多，开局越贴近你想要的 <b>&lt;user&gt;</b>；切换页签不会丢失已填内容。悬停字段名可看填写说明。</p>
              <div class="wb-tabs-bar">
                <button type="button" class="wb-sub-tab active" data-subpane="base">👤 基础档案</button>
                <button type="button" class="wb-sub-tab" data-subpane="companion">👥 开局同伴名册 (<span id="outlander-comp-count">0</span>)</button>
                <button type="button" class="wb-sub-tab" data-subpane="skills">⚔️ 初始技能 (<span id="outlander-sk-count">0</span>)</button>
                <button type="button" class="wb-sub-tab" data-subpane="traits">✨ 特性特质 (<span id="outlander-tr-count">0</span>)</button>
                <button type="button" class="wb-sub-tab" data-subpane="assets">🏛️ 家产领地 (<span id="outlander-as-count">0</span>)</button>
              </div>

              <!-- 1. 基础身份档案 (微质感可视输入栏) -->
              <div class="wb-sub-pane active" id="pane-wb-base">
                <div class="wb-card">
                  <div class="wb-card-head">
                    <span class="wb-card-title">✦ 核心与世系属性 （可全不填由AI根据人设补完、默认看笑脸）</span>
                  </div>
                  
                  <div class="wb-grid-3">
                    <div class="field-box">
                      <div class="field-label" title="你希望别人怎么称呼你。会写进状态栏的自称字段；留空则用「你」。">🏷️ 自称姓名</div>
                      <input type="text" id="outlander-name" placeholder="输入称呼...">
                    </div>
                    <div class="field-box">
                      <div class="field-label" title="穿越前的性别。选「无」表示不设定，也不会写进提示词。">⚧ 前世性别</div>
                      <div class="chips-box" id="gender-chips"></div>
                    </div>
                    <div class="field-box">
                      <div class="field-label" title="开局时外界对你的认知，如：没落骑士、行商、转学生。会写进变量与状态栏。">📜 身份头衔</div>
                      <input type="text" id="outlander-identity" placeholder="如：没落骑士、行商、转学生...">
                    </div>
                  </div>

                  <div class="wb-grid-3" style="margin-top: 8px;">
                    <div class="field-box">
                      <div class="field-label" title="0 为普通人，8 为接近神域。留空则由 AI 按身份头衔与人设合理裁定。">⚔️ 战力水平 (0~8阶)</div>
                      <input type="number" id="outlander-power" min="0" max="8" placeholder="0~8（留空自动）">
                    </div>
                    <div class="field-box">
                      <div class="field-label" title="可填数额（如 300 G）或文字描述（如 身无分文）。留空则由 AI 裁定。">💰 初始金币</div>
                      <input type="text" id="outlander-gold" placeholder="数额或文字描述...">
                    </div>
                    <div class="field-box">
                      <div class="field-label" title="开局时穿在身上的衣物。会出现在状态栏的服装字段。">👘 身着服装</div>
                      <input type="text" id="outlander-outfit" placeholder="当前衣物服饰...">
                    </div>
                  </div>

                  <div class="wb-grid-3" style="margin-top: 8px;">
                    <div class="field-box">
                      <div class="field-label" title="开局时的身体与精神状态，如：健康、重伤未愈、长期失眠。">❤️ 身心状态</div>
                      <input type="text" id="outlander-body-status" placeholder="如：健康、状态完好...">
                    </div>
                    <div class="field-box">
                      <div class="field-label" title="别人眼中的你，如：籍籍无名、引人注目、恶名昭彰。">🗣️ 外界风评</div>
                      <input type="text" id="outlander-reputation" placeholder="如：籍籍无名、引人注目...">
                    </div>
                    <div class="field-box">
                      <div class="field-label" title="你身上带着的契约、烙印或加护。没有就留空。">🔗 契约 / 烙印</div>
                      <input type="text" id="outlander-contract" placeholder="如：无、精灵的同盟...">
                    </div>
                  </div>

                  <div class="field-box" style="margin-top: 10px;">
                    <div class="field-label" title="穿越者的前世记忆与穿越契机。扮演本世界原住民时可留空。">📖 本世来历 / 穿越经历</div>
                    <textarea id="past-input" placeholder="前世记忆、穿越契机、为何来到这片大陆...">${state.past}</textarea>
                  </div>

                  
                </div>
              </div>

              <!-- 👥 开局同伴名册容器 -->
              <div class="wb-sub-pane" id="pane-wb-companion">
                <div class="wb-card">
                  <div class="wb-card-head">
                    <span class="wb-card-title">✦ 开局同行者名册（支持保存到本地，勾选登场）</span>
                    <button type="button" class="wb-card-btn" id="btn-toggle-comp-form">+ 登记新同伴</button>
                  </div>

                  <!-- 登记 / 编辑表单（可折叠） -->
                  <div class="comp-form-box" id="comp-form-box" style="display:none;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:12.5px; font-weight:bold; color:var(--krs-gold);" id="comp-form-title">✦ 登记开局身旁角色</span>
                      <button type="button" class="wb-item-del-btn" id="btn-cancel-comp-form">取消收起</button>
                    </div>

                    <div class="wb-grid-3">
                      <div class="field-box">
                        <div class="field-label">🏷️ 角色姓名 *</div>
                        <input type="text" id="comp-in-name" placeholder="如：凌月 / 艾米莉亚">
                      </div>
                      <div class="field-box">
                        <div class="field-label">🤝 与主角关系</div>
                        <input type="text" id="comp-in-rel" placeholder="如：青梅竹马 / 护卫骑士 / 契约仆从">
                      </div>
                      <div class="field-box">
                        <div class="field-label" title="开局时外界对你的认知，如：没落骑士、行商、转学生。会写进变量与状态栏。">📜 身份头衔</div>
                        <input type="text" id="comp-in-ident" placeholder="如：见习魔导士、游侠、贴身女仆">
                      </div>
                    </div>

                    <div class="wb-grid-3">
                      <div class="field-box">
                        <div class="field-label" title="0 为普通人，8 为接近神域。留空则由 AI 按身份头衔与人设合理裁定。">⚔️ 战力水平 (0~8阶)</div>
                        <input type="text" id="comp-in-power" placeholder="留空则根据人设">
                      </div>
                      <div class="field-box">
                        <div class="field-label">❤️ 初始亲密度 (0~200)</div>
                        <input type="text" id="comp-in-intimacy" placeholder="留空则根据人设">
                      </div>
                      <div class="field-box">
                        <div class="field-label">💋 性吸引力 (0~200)</div>
                        <input type="text" id="comp-in-attr" placeholder="留空则根据人设">
                      </div>
                    </div>

                    <!-- 新增：命运主线选填栏 -->
                    <div class="field-box">
                      <div class="field-label">✦ 命运主线设定（选填，可留空）</div>
                      <input type="text" id="comp-in-destiny" placeholder="如：破除神之诅咒、寻找失散的王族血脉、向教会复仇...">
                    </div>

                    <div class="field-box">
                      <div class="field-label">📖 角色人设与生平</div>
                      <textarea id="comp-in-desc" placeholder="简述角色的外貌、性格、背景、来历" style="min-height:50px;"></textarea>
                    </div>

                    <button type="button" class="wb-card-btn" id="btn-save-comp" style="padding:8px; font-weight:bold; width:100%;">💾 保存加入名册</button>
                  </div>

                  <!-- 角色卡片列表（参考图3排版） -->
                  <div class="comp-roster-list" id="comp-roster-list">
                    <div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:18px;">名册为空，点击右上角登记一名同伴</div>
                  </div>
                </div>
              </div>

              <!-- 2. 初始技能容器 -->
              <div class="wb-sub-pane" id="pane-wb-skills">
                <div class="wb-card">
                  <div class="wb-card-head">
                    <span class="wb-card-title">✦ 初始修行技能</span>
                    <div class="wb-head-actions"><button type="button" class="wb-card-btn wb-preset-open" id="btn-preset-skill">📋 预设</button><button type="button" class="wb-card-btn" id="btn-add-skill">+ 新增技能</button></div>
                  </div>
                  <div class="wb-preset-panel" id="preset-panel-skill" style="display:none;"></div>
                <div class="wb-slider-bar" id="skills-slider-bar"></div>
                  <div class="wb-stage-detail" id="skills-stage-detail">
                    <div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:20px;">点击上方按钮添加一项技能</div>
                  </div>
                </div>
              </div>

              <!-- 3. 特性特质容器 -->
              <div class="wb-sub-pane" id="pane-wb-traits">
                <div class="wb-card">
                  <div class="wb-card-head">
                    <span class="wb-card-title">✦ 固有特性 / 血脉与加护</span>
                    <div class="wb-head-actions"><button type="button" class="wb-card-btn wb-preset-open" id="btn-preset-trait">📋 预设</button><button type="button" class="wb-card-btn" id="btn-add-trait">+ 新增特性</button></div>
                  </div>
                  <div class="wb-preset-panel" id="preset-panel-trait" style="display:none;"></div>
                <div class="wb-slider-bar" id="traits-slider-bar"></div>
                  <div class="wb-stage-detail" id="traits-stage-detail">
                    <div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:20px;">点击上方按钮添加一项特性</div>
                  </div>
                </div>
              </div>

              <!-- 4. 资产领地容器 (完全对标状态栏家产) -->
              <div class="wb-sub-pane" id="pane-wb-assets">
                <div class="wb-card">
                  <div class="wb-card-head">
                    <span class="wb-card-title">✦ 初始名下产业 / 宅邸工坊</span>
                    <div class="wb-head-actions"><button type="button" class="wb-card-btn wb-preset-open" id="btn-preset-asset">📋 预设</button><button type="button" class="wb-card-btn" id="btn-add-asset">+ 购置资产</button></div>
                  </div>
                  <div class="wb-preset-panel" id="preset-panel-asset" style="display:none;"></div>
                <div class="wb-slider-bar" id="assets-slider-bar"></div>
                  <div class="wb-stage-detail" id="assets-stage-detail">
                    <div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:20px;">点击上方按钮添加一项资产</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Page 3: 因果之轨 -->
          <!-- Page 4: 纠缠之线 -->
          <div class="page" id="p-4">
            <div class="header">
              <div class="h-title">第四幕 · 纠 缠 之 线</div>
              <div class="h-desc">点选事件即可生成对应开局，并切换画册专属壁纸</div>
            </div>

            <div class="opening-input-wrap">
              <label>开局设定 · 可自由输入</label>
              <textarea id="opening-input" placeholder="点击下方任意事件即可自动生成对应开局，或在此自由输入。"></textarea>
            </div>

            <!-- 🌟 模式 A：自由模式及剧情模式下的原版内容 🌟 -->
            <div id="normal-route-container"><nav class="open-tabs-bar" id="open-tabs-bar">
              <button type="button" class="open-tab active" data-open-pane="free">✦ 完 全 自 由</button>
              <button type="button" class="open-tab" data-open-pane="destiny">✦ 单人命运主线</button>
              <button type="button" class="open-tab" data-open-pane="chapter">✦ 章 节</button>
              <button type="button" class="open-tab" data-open-pane="badend">✦ 战 败 支 线</button>
            </nav>
            <div class="open-pane active" data-pane="free">
                        <div class="chap-panel" id="chap-panel-free">
                <button class="chap-panel-head" type="button" id="chap-head-free">
                  <span class="chap-panel-title">自由模式开局 · 享受无危机学院生活</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="chap-body-free">
                  <div class="free-menu-shell">
                    <div class="free-menu-rail" id="free-menu-rail"></div>
                    <div class="free-menu-list">
                      <div class="free-menu-head" id="free-menu-head"></div>
                      <div class="chapters-grid" id="free-openings-box"></div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="birth-map-block">
              <div class="section-label">出 生 地 · 点 击 地 图 选 择</div>
              <div class="birth-map-shell" id="birth-map-shell">
                <div class="birth-map-viewport" id="birth-viewport">
                  <div class="birth-map-zoombar">
                    <button type="button" class="birth-zoom-btn" id="birth-zoom-in" title="放大">＋</button>
                    <button type="button" class="birth-zoom-btn" id="birth-zoom-out" title="缩小">－</button>
                    <button type="button" class="birth-zoom-btn" id="birth-zoom-reset" title="复位视图">⟲</button>
                    <span class="birth-zoom-label" id="birth-zoom-label">100%</span>
                  </div>
                  <button type="button" class="birth-bs-btn" id="birth-bs-open" title="打开 BS2 箱庭网状图">🎩 BS箱庭</button>
                  <div class="bs-garden-overlay" id="bs-garden-overlay" style="display:none;">
                    <div class="bs-garden-head">
                      <span class="bs-garden-title">✦ B S 箱 庭 · 点 击 圆 球 进 入</span>
                      <button type="button" class="bs-garden-close" id="bs-garden-close" title="关闭">✕</button>
                    </div>
                    <div class="bs-garden-zoombar">
                      <button type="button" class="bs-zoom-btn" id="bs-zoom-in" title="放大">＋</button>
                      <button type="button" class="bs-zoom-btn" id="bs-zoom-out" title="缩小">－</button>
                      <button type="button" class="bs-zoom-btn" id="bs-zoom-reset" title="复位">⟲</button>
                      <span class="bs-zoom-label" id="bs-zoom-label">100%</span>
                    </div>
                    <div class="bs-garden-stage" id="bs-garden-stage">
                      <div class="bs-garden-canvas" id="bs-garden-canvas">
                        <svg class="bs-garden-svg" id="bs-garden-lines" xmlns="http://www.w3.org/2000/svg"></svg>
                        <div class="bs-garden-nodes" id="bs-garden-nodes"></div>
                      </div>
                    </div>
                  </div>
                  <div style="display:none;">
                  </div>
                  <div class="birth-map-canvas" id="birth-canvas">
                    <div class="birth-region-layer" id="birth-regions"></div>
                    <svg class="birth-map-svg" id="birth-lines" xmlns="http://www.w3.org/2000/svg"></svg>
                    <div class="birth-node-layer" id="birth-nodes"></div>
                  </div>
                </div>
                <div class="birth-side">
                  <div class="birth-side-empty" id="birth-side-empty">尚未选择出生地<br><span>留空则不改写开局提示词</span></div>
                  <div id="birth-side-info" style="display:none;">
                    <div class="birth-info-head">
                      <span class="birth-info-icon" id="birth-info-icon">🏛️</span>
                      <span class="birth-info-name" id="birth-info-name"></span>
                    </div>
                    <div class="birth-info-meta"><span id="birth-info-nation"></span> · <span id="birth-info-cost"></span></div>
                    <div class="birth-info-desc" id="birth-info-desc"></div>
                    <div class="birth-info-sublabel">子地点（可选，再点一次取消）</div>
                    <div class="birth-subs" id="birth-subs"></div>
                  </div>
                  <button type="button" class="birth-clear" id="birth-clear">✕ 清除出生地</button>
                </div>
              </div>
            </div>
            <div class="section-label">主线走向 · 纯净主线</div>
              <div id="pure-route-box" style="margin-bottom: 14px;"></div>

              </div>
            <div class="open-pane" data-pane="destiny"><div class="destiny-section">
                <div class="section-label">命 运 主 线 · 专 属 选 人 导 引</div>
                <div class="destiny-preview-card" id="destiny-preview-card" style="display:none;">
                  <div class="destiny-preview-img"><img id="destiny-p-img" src="" alt="角色立绘"></div>
                  <div class="destiny-preview-info">
                    <div class="destiny-preview-title">
                      <span id="destiny-p-name">角色名</span>
                      <span class="destiny-preview-tag" id="destiny-p-tag">联动角色</span>
                    </div>

                    <!-- 预设剧本胶囊切换行 -->
                    <div class="destiny-presets-row" id="destiny-presets-box"></div>

                    <!-- 3行自定义表单 -->
                    <div class="destiny-form-line">
                      <label id="destiny-label-mainline">【角色名·命运主线】：</label>
                      <textarea class="destiny-form-textarea" id="destiny-field-mainline" placeholder="主线剧情设定描述"></textarea>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <div class="destiny-form-line">
                        <label>你与她的关系：</label>
                        <input type="text" class="destiny-form-input" id="destiny-field-relation" placeholder="例如：哥哥 / 跟班 / 青梅竹马（留空则不写入）">
                      </div>
                      <div class="destiny-form-line">
                        <label>开局场景与情境：</label>
                        <input type="text" class="destiny-form-input" id="destiny-field-extra" placeholder="例如：在远离王都的边境森林（留空则不写入）">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="destiny-group-title">✦ 联动角色（需在第二幕开启该角色）：</div>
                <div class="destiny-row" id="destiny-linked-box"></div>
                <div class="destiny-group-title" style="margin-top: 14px;">✦ 原著角色（点击载入专属预设）：</div>
                <div class="destiny-row" id="destiny-origin-box"></div>
                <div class="destiny-group-title" style="margin-top: 14px;">✦ 支线角色（对白美化中只有单图 · 无表情差分）：</div>
                <div class="destiny-row" id="destiny-branch-box"></div>
              </div>

              </div>
            <div class="open-pane" data-pane="chapter"><div class="chap-panel" id="chap-panel-kl">
                <button class="chap-panel-head" type="button" id="chap-head-kl">
                  <span class="chap-panel-title">克蕾雅章节 · 序章 ～ 第十章</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="chap-body-kl"><div class="chapters-grid" id="chapters-box"></div></div>
              </div>

              <div class="chap-panel" id="chap-panel-lab">
                <button class="chap-panel-head" type="button" id="chap-head-lab">
                  <span class="chap-panel-title">迷宫都市章节 · 序章 ～ 第九章</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="chap-body-lab"><div class="chapters-grid" id="lab-chapter-box2"></div></div>
              </div>

              <div class="chap-panel" id="chap-panel-ke">
                <button class="chap-panel-head" type="button" id="chap-head-ke">
                  <span class="chap-panel-title">🜂 王逝南境章节 · 序章 ～ 最终章</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="chap-body-ke"><div class="chapters-grid" id="ke-chapter-box"></div></div>
              </div>

              <div class="chap-panel" id="chap-panel-ij">
                <button class="chap-panel-head" type="button" id="chap-head-ij">
                  <span class="chap-panel-title">🏥 医术师（温伯格）章节 · 序章 ～ 最终章</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="chap-body-ij"><div class="chapters-grid" id="ij-chapter-box"></div></div>
              </div>

              <div class="chap-panel" id="chap-panel-pg">
                <button class="chap-panel-head" type="button" id="chap-head-pg">
                  <span class="chap-panel-title">🏝️ 祈愿诗篇（安纳托尔岛）章节 · 序章 ～ 完结</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="chap-body-pg"><div class="chapters-grid" id="pg-chapter-box"></div></div>
              </div>

              </div>
            <div class="open-pane" data-pane="badend"><div class="chap-panel side-panel" id="side-panel-kl">
                <button class="chap-panel-head" type="button" id="side-head-kl">
                  <span class="chap-panel-title">◆ 克蕾雅支线 · 快速败北开局</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="side-body-kl" hidden>
                  <div class="side-hint">展开＝启用克蕾雅的全部败北／堕落支线；点选卡片将写入对应支线开局。</div>
                  <div class="featured-routes-grid" id="feat-routes-box"></div>
                  <div class="routes-grid" id="side-routes-box"></div>
                </div>
              </div>

              <div class="chap-panel side-panel" id="side-panel-ir">
                <button class="chap-panel-head" type="button" id="side-head-ir">
                  <span class="chap-panel-title">✝ 伊莉丝支线 · 快速战败／恶堕开局</span>
                  <span class="chap-panel-mark">展开 ▾</span>
                </button>
                <div class="chap-panel-body" id="side-body-ir" hidden>
                  <div class="side-hint">展开＝启用伊莉丝的全部战败／恶堕支线；点选卡片将写入对应支线开局。</div>
                  <div class="routes-grid" id="iris-routes-box"></div>
                </div>
              </div>
            </div>
            </div>

            <!-- 🎓 模式 B：学院模式专属的完全重构内容 🎓 -->
            <div id="academy-route-container" style="display:none;">
              <div class="section-label">潘 多 拉 学 院 · 学 科 区 块 与 入 学 编 成</div>

              <!-- ✏️ 学院模式 · 全自定义开局 -->
              <div class="destiny-preview-card" id="aca-custom-card" style="display:none;">
                <div class="destiny-preview-info">
                  <div class="destiny-preview-title">
                    <span>✏️ 学院模式 · 自定义开局</span>
                    <span class="destiny-preview-tag">全自定义</span>
                  </div>
                  <div class="destiny-form-line">
                    <label>我的身份：</label>
                    <input type="text" class="destiny-form-input" id="aca-custom-identity" placeholder="例如：礼仪科新任教师 / 学院校工 / 转学生 / 教会派驻的见习神官 / 出入校门的行商 / 厨房与女仆班的雇工">
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="destiny-form-line">
                      <label>我与学院的关系：</label>
                      <input type="text" class="destiny-form-input" id="aca-custom-relation" placeholder="例如：受雇 / 教会派遣 / 拖关系进来的（留空则不写入）">
                    </div>
                    <div class="destiny-form-line">
                      <label>开局情境：</label>
                      <input type="text" class="destiny-form-input" id="aca-custom-scene" placeholder="例如：清晨在校门口被门卫拦下（留空则不写入）">
                    </div>
                  </div>
                  <p style="font-size: 12px; color: var(--krs-dim); line-height: 1.6; margin: 0;">
                    身份不限学生：老师、助教、校工、厨娘、门卫、行商、教会派驻、来送弟妹入学的乡下长姐都可以。填完立刻写入上方「开局设定」，不用点区块。
                  </p>
                </div>
              </div>

              <div class="academy-class-grid" id="academy-classes-box"></div>
              <div class="side-hint" style="color: #c9a54e; margin: 14px 0 4px;">
                ✦ 学院模式会启用全部「学院模式」世界书条目（学制、校历、课程考课、社团、委托、比试竞赛、交换生、节庆、商店街、宿舍、教职员名录）。<br>
                ✦ 先选一个区块（A/B/C/D 班、教职员室、学生会），再点具体成员载入她的专属入学互动，或直接点区块大开局。<br>
                ✦ 置籍铁律：<b>年级不看年龄，看实技评级与在籍资历</b>——所以少女期的女主角们统一在一年级，有职业履历的成年人以讲师／职员身份聘入。这些只是在学院模式下追加的位置，不会改动她们原本的人设。
              </div>

            </div>
          </div>

          <!-- Page 5: futa 设定 -->
          <!-- ============ 06: 世界风云 ============ -->
          <div class="page" id="p-5">
            <div class="header">
              <div class="h-title">第 六 幕 · 世 界 风 云</div>
              <div class="h-desc">可选的世界主线。默认关闭——不开启时本局不存在世界级危机</div>
            </div>
            <div class="wc-page">
              <button class="link-top-btn" type="button" id="wc-toggle">世 界 风 云：未开启</button>
              <div class="wc-remind">✦ 出现世界级危机时会更新世界风云</div>
              <div id="wc-stage"></div>
            </div>
          </div>

          <div class="page" id="p-6">
            <div class="header">
              <div class="h-title">第五幕 · futa 设 定</div>
              <div class="h-desc">选择哪些角色带有 futa 设定，也可自由输入</div>
            </div>

            <div class="section-label">角色选择 · 可多选</div>
            <div class="futa-hint">点击卡片切换选中状态，选中后开场白会自动追加一句对应描述。</div>
            <div class="futa-grid" id="futa-box"></div>

            <div class="opening-input-wrap" style="margin-top: 22px;">
              <label>自由输入 · 你希望谁是 futa？</label>
              <textarea id="futa-input" placeholder="例如：我希望皇子凯埃尔是 futa、我希望莉莉娅和梅拉妮都是 futa"></textarea>
            </div>

            <div class="futa-summary empty" id="futa-summary">尚未选择任何角色</div>
          </div>

          <!-- Page 6: 终幕确认 -->
          <div class="page" id="p-7">
            <div class="header">
              <div class="h-title">终 幕 · 命 运 铭 刻</div>
              <div class="h-desc">核验开局推演条件。确认后将由 AI 开启首轮篇章并初始化设定</div>
            </div>
            <table class="confirm-table" id="confirm-table"></table>
            <div style="font-size: 13.5px; color: var(--krs-gold); margin-bottom: 8px; font-weight: 600;">【提交预览单】</div>
            <div class="confirm-preview" id="preview-box"></div>
            <div class="err-tip" id="err-tip"></div>
          </div>

        </div>

        <div class="footer" id="book-footer" style="display: none;">
          <button class="nav-btn" type="button" id="prev-btn">上一页</button>
          <span class="indicator" id="page-indicator">1 / 8</span>
          <div style="display: flex; gap: 8px;">
            <button class="nav-btn primary" type="button" id="next-btn">下一页</button>
            <button class="nav-btn primary" type="button" id="submit-btn" style="display: none;">铭 刻 命 运 · 开 局</button>
          </div>
        </div>
      </div>
    `;

    const shell = shadow.querySelector('.book-shell');
    const spriteBox = shadow.getElementById('claire-sprite');

    let krsSyncing = false, krsSyncQueued = false;
    function krsSetWorkHint(text, isErr) {
      const box = shadow.getElementById('work-hint');
      if (!box) return;
      box.textContent = text || '';
      box.classList.toggle('err', !!isErr);
    }

    async function syncWorks() {
      /* 并发保护改为「排队合并」。
         原来这里直接 return，会把同步进行中发生的开关操作整批丢掉：
         世界书有 357 条，一次同步要等 updateWorldbookWith 返回，
         这期间再点一次开关，那一次就被静默丢弃 —— 表现为
         「先关再开，结果世界书还是关的」。现在改成记一个标记，
         当前这轮跑完立刻按最新的 state 再同步一次，保证最后一次操作一定生效。 */
      if (krsSyncing) { krsSyncQueued = true; return; }
      krsSyncing = true;
      krsSetWorkHint('正在更新世界书…', false);
      try {
        const r = await krsSyncWorks({
          克蕾雅: !!state.works['克蕾雅篇'],
          迷宫: !!state.works['迷宫都市篇'],
          克蕾雅剧情: !!state.stories['克蕾雅剧情'],
          迷宫剧情: !!state.stories['迷宫都市剧情'],
          王逝剧情: !!state.stories['王逝剧情'],
          医术师剧情: !!state.stories['医术师剧情'],
          祈愿诗篇剧情: !!state.stories['祈愿诗篇剧情'],
          克蕾雅支线: !!state.sideOpen['克蕾雅支线'],
          伊莉丝支线: !!state.sideOpen['伊莉丝支线'],
          villain: !!state.villain,
          link: !!state.linkMode,
          linkChars: state.linkChars
        });
        const names = KRS_WORKS.filter((w) => state.works[w.key]).map((w) => w.label).join('、') || '（全部关闭，只剩基础世界观）';
        if (!r.ok) krsSetWorkHint((r.errors && r.errors[0]) || '世界书同步失败', true);
        else {
          const sides = [];
          const isIrisRoute = state.route ? IRIS_ROUTES.some(x => x.key === state.route) : false;
          if (state.sideOpen['克蕾雅支线']) sides.push('克蕾雅支线' + (state.route && !isIrisRoute ? '·' + state.route : ''));
          if (state.sideOpen['伊莉丝支线']) sides.push('伊莉丝支线' + (isIrisRoute ? '·' + state.route : ''));
          krsSetWorkHint('角色：' + names
            + '　剧情：' + (STORIES.filter((s) => state.stories[s.key]).map((s) => s.label).join('、') || '无')
            + '　支线：' + (sides.join('、') || '全关')
            + '　联动：' + (state.linkMode ? Object.keys(state.linkChars).filter(k => state.linkChars[k]).join('、') || '无' : '已关闭')
            + '（世界书改动 ' + r.changed + ' 条）', false);
        }
        persistCurrentState();
      } catch (e) {
        krsSetWorkHint('世界书同步异常：' + (e && e.message), true);
      } finally {
        krsSyncing = false;
        if (krsSyncQueued) { krsSyncQueued = false; syncWorks(); }
      }
    }

    function labOn() { return !!state.works['迷宫都市篇']; }

    function renderWorkPick() {
      const row = shadow.getElementById('work-pick-row');
      if (!row) return;
      row.innerHTML = '';
      KRS_WORKS.forEach((w) => {
        const on = !!state.works[w.key];
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'work-toggle' + (on ? ' on' : '');
        b.dataset.workKey = w.key;
        b.innerHTML =
          '<span class="wt-figure" style="background-image:url(\'' + w.avatar + '\')"></span>'
          + '<span class="wt-body">'
          +   '<span class="wt-head">'
          +     '<strong>' + w.label + '</strong>'
          +     '<span class="wt-state">' + (on ? '已启用' : '点击启用') + '</span>'
          +   '</span>'
          +   '<small>' + w.desc + '</small>'
          + '</span>';
        b.onclick = () => {
          state.works[w.key] = !state.works[w.key];
          if (!state.works[w.key] && state.view === '伊莉丝') { state.view = '克蕾雅'; syncViewChips(); }
          renderWorkPick();
          syncViewChips();
          refreshOpeningText(true);
          updateSummary();
          syncWorks();
        };
        row.appendChild(b);
      });
    }

    function renderModeCards() {
      const box = shadow.getElementById('mode-box');
      if (!box) return;
      box.innerHTML = '';
      SPECIAL_CHAPTERS.forEach((c) => {
        const on = state.mode === c.key;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'mode-card wide' + (on ? ' selected' : '');
        b.dataset.modeKey = c.key;
        b.innerHTML = '<div class="mode-thumb" style="background-image:url(\'' + (c.thumb || DEFAULT_BG) + '\')"></div>'
          + '<div class="mode-body"><div class="mode-head"><b>' + c.key + '</b><i>' + c.era + '</i></div>'
          + (c.key === '自由模式' ? '<div class="story-warn-tip">⚠️ 所有剧情细纲皆为风味同人，推荐单自由模式</div>' : '')
          + (c.key === '学院模式' ? '<div class="story-warn-tip" style="color: #6bccff; background: rgba(107,204,255,0.12); border-color: rgba(107,204,255,0.35);">✦ 锁定潘多拉学院内部日常；外部主线与危机全禁用，改用「学院模式」世界书条目驱动课业／社团／委托／比试／节庆</div>' : '')
          + '<p>' + c.blurb + '</p></div>';
        b.onclick = () => {
          if (state.mode === c.key) {
            state.mode = '';
          } else {
            state.mode = c.key;
            // 无论选哪个模式，都先清掉上一模式残留的手选开局，改由该模式的默认开局接管
            state.lastSelectedPrompt = '';
            state.academyItemKey = '';
            state.academyCharName = '';
            // 无论是自由模式还是学院模式，都清空主线剧情
            state.stories['克蕾雅剧情'] = false;
            state.stories['迷宫都市剧情'] = false;
            state.chapter = '';
            state.labChapter = '';
            state.route = '';
            // 如果是学院模式，强制连同三大联动剧情与支线全部关闭并清空
            if (c.key === '学院模式') {
              state.stories['王逝剧情'] = false;
              state.stories['医术师剧情'] = false;
              state.stories['祈愿诗篇剧情'] = false;
              state.keChapter = '';
              state.ijChapter = '';
              state.pgChapter = '';
              state.sideOpen['克蕾雅支线'] = false;
              state.sideOpen['伊莉丝支线'] = false;
              state.villain = false;
            }
          }
          if (state.mode !== '自由模式') {
            state.sideOpen['克蕾雅支线'] = false;
            state.sideOpen['伊莉丝支线'] = false;
            state.route = '';
            state.villain = false;
          }
          clearChapterSelection();
          renderModeCards(); renderStoryLine(); renderLinkStoryLine(); syncPage4View(); syncChapterPanels(); syncSidePanels(); renderPureRoute();
          refreshOpeningText(true); updateSummary(); syncWorks();
        };
        box.appendChild(b);
      });
    }

    const STORIES = [
      { key: '克蕾雅剧情', label: '克蕾雅篇 · 剧情开启', desc: '开启克蕾雅主线：序章～第十章的细纲按 克蕾雅篇章 逐章注入。' },
      { key: '迷宫都市剧情', label: '迷宫都市篇 · 剧情开启', desc: '开启迷宫都市线：序章～第九章的细纲按 伊莉丝篇章 逐章注入。' },
    ];

    /* 联动世界剧情：调整为 祈愿诗篇 → 医术师 → 王逝 顺序 */
    const LINK_STORIES = [
      { key: '祈愿诗篇剧情', label: '祈愿诗篇 · 剧情开启',
        desc: '开启安纳托尔岛（祈愿诗篇）线：序章～完结共 12 章的细纲按 祈愿诗篇篇章 逐章注入。可与自由模式、克蕾雅篇同时开启。',
        need: '祈愿诗篇-安纳托尔岛篇', needLabel: '祈愿诗篇-安纳托尔岛篇', chapterKey: '祈愿诗篇安纳托尔章节', chapterField: 'pgChapter' },
      { key: '医术师剧情', label: '医术师篇 · 剧情开启',
        desc: '开启温伯格（医术师）线：序章～最终章的细纲按 医术师篇章 逐章注入。可与自由模式、克蕾雅篇同时开启。',
        need: '医术师-温伯格篇', needLabel: '医术师-温伯格篇', chapterKey: '医术师温伯格章节', chapterField: 'ijChapter' },
      { key: '王逝剧情', label: '王逝剧情篇 · 剧情开启',
        desc: '开启王逝（南境）线：序章～最终章的细纲按 王逝篇章 逐章注入。可与自由模式、克蕾雅篇同时开启。',
        need: '王逝-南境篇', needLabel: '王逝-南境篇', chapterKey: '王逝南境章节', chapterField: 'keChapter' },
    ];

    function renderLinkStoryLine() {
      const box = shadow.getElementById('linkstory-box');
      const hint = shadow.getElementById('linkstory-hint');
      if (!box) return;
      box.innerHTML = '';
      LINK_STORIES.forEach((st) => {
        const on = !!state.stories[st.key];
        const gate = !st.need || (!!state.linkMode && !!state.linkChars[st.need]);
        const nm = st.needLabel || st.need;
        const b = document.createElement('button');
        b.type = 'button';
        const isAcademy = (state.mode === '学院模式');
        const canClick = gate && !isAcademy;
        b.className = 'story-card' + (on ? ' on' : '') + (canClick ? '' : ' locked');
        b.dataset.storyKey = st.key;
        b.title = isAcademy ? '当前为学院模式，已锁定校园日常，无法开启剧情' : (gate ? '' : ('需先在第一幕启用「' + nm + '」'));
        b.innerHTML = '<strong>' + (on ? '◆ ' : '◇ ') + st.label + '</strong><small>' + (isAcademy ? '【学院模式下已锁定无法开启】' : st.desc) + '</small>';
        b.onclick = () => {
          if (state.mode === '学院模式') {
            if (hint) hint.textContent = '当前处于「学院模式」，无法开启外部联动剧情。';
            return;
          }
          if (!gate) { if (hint) hint.textContent = '未开启（需先在第一幕启用「' + nm + '」）。'; return; }
          state.stories[st.key] = !state.stories[st.key];
          if (!state.stories[st.key]) state[st.chapterField] = '';
          else { state.openChapters[st.chapterKey] = true; }
          renderLinkStoryLine();
          renderStoryLine();
          syncChapterPanels();
          refreshOpeningText(true);
          updateSummary();
          syncWorks();
        };
        box.appendChild(b);
      });
      if (hint) {
        const parts = [];
        LINK_STORIES.forEach((st) => {
          const gate = !st.need || (!!state.linkMode && !!state.linkChars[st.need]);
          const nm = st.needLabel || st.need;
          if (!gate) parts.push(st.label + '：未开启（需先在第一幕启用「' + nm + '」）');
          else if (!state.stories[st.key]) parts.push(st.label + '：未开启（点上方卡片即可启用，可与「自由模式」「克蕾雅篇」同时选择，互不冲突）');
          else parts.push(st.label + '：已开启，去第四幕挑具体章节；不挑就默认从序章开始'
            + (state[st.chapterField] ? '　【已选】' + state[st.chapterField] : ''));
        });
        hint.textContent = parts.join('　｜　');
      }
    }

    function renderStoryLine() {
      const box = shadow.getElementById('story-box');
      const hint = shadow.getElementById('story-hint');
      if (!box) return;
      box.innerHTML = '';
      STORIES.forEach((st) => {
        const on = !!state.stories[st.key];
        const b = document.createElement('button');
        b.type = 'button';
        const isAcademy = (state.mode === '学院模式');
        b.className = 'story-card' + (on ? ' on' : '') + (isAcademy ? ' locked' : '');
        b.dataset.storyKey = st.key;
        b.title = isAcademy ? '当前为学院模式，已锁定校园日常，无法开启剧情' : '';
        b.innerHTML = '<strong>' + (on ? '◆ ' : '◇ ') + st.label + '</strong><small>' + (isAcademy ? '【学院模式下已锁定无法开启】' : st.desc) + '</small>';
        b.onclick = () => {
          if (state.mode === '学院模式') {
            if (hint) hint.textContent = '当前处于「学院模式」，已彻底锁死外部主线剧情。如需体验剧情请切换为自由模式。';
            return;
          }
          const wasOn = !!state.stories[st.key];
          state.stories[st.key] = !wasOn;
          if (!wasOn) {
            state.mode = '剧情模式';
            state.route = '';
            state.freeCustomKey = '';
            state.openChapters[st.key === '克蕾雅剧情' ? '克蕾雅章节' : '迷宫都市章节'] = true;
            state.sideOpen['克蕾雅支线'] = false;
            state.sideOpen['伊莉丝支线'] = false;
          } else if (!state.stories['克蕾雅剧情'] && !state.stories['迷宫都市剧情']) {
            state.mode = '自由模式';
            state.chapter = '';
          }
          if (!state.stories['克蕾雅剧情']) state.chapter = '';
          if (!state.stories['迷宫都市剧情']) state.labChapter = '';
          clearChapterSelection();
          renderModeCards(); renderStoryLine(); syncChapterPanels(); syncSidePanels(); renderPureRoute();
          refreshOpeningText(true); updateSummary(); syncWorks();
        };
        box.appendChild(b);
      });
      if (hint) {
        const on = STORIES.filter((st) => state.stories[st.key]).map((st) => st.label);
        const picked = [];
        if (state.chapter) picked.push('克蕾雅·' + state.chapter);
        if (state.labChapter) picked.push('迷宫都市·' + state.labChapter);
        if (state.stories['王逝剧情']) picked.push('王逝·' + (state.keChapter || '序章'));
        if (state.stories['医术师剧情']) picked.push('医术师·' + (state.ijChapter || '序章'));
        if (state.stories['祈愿诗篇剧情']) picked.push('祈愿诗篇·' + (state.pgChapter || '序章'));
        if (state.mode === '自由模式' && state.freeCustomKey) picked.push('自由开局·' + state.freeCustomKey);

        hint.textContent = (on.length
          ? '已开启：' + on.join('、') + '。去折叠面板里挑具体章节；不挑就默认从序章开始。'
          : (state.mode === '结局模式'
            ? '当前为结局模式：不注入任何章节细纲，只走结局收束。'
            : (state.mode === '自由模式' ? '当前为自由模式：无危机的学院生活，不注入任何章节细纲。' : '未选择模式。')))
          + (picked.length ? '　【已选】' + picked.join('　') : '');
      }
    }
/* ── 学院模式大卡块与角色开局综合数据 ── */
    const ACADEMY_CLASSES = [
      /* ─────────────────────────────────────────────────────────────
       * 潘多拉学院 · 一年级六区块（按人设重新编成）
       * 置籍铁律：年级不看年龄，看「实技评级 × 在籍资历」。
       * 少女期的联动女主角统一置籍一年级；已有职业履历者聘为讲师与职员。
       * ───────────────────────────────────────────────────────────── */
      {
        id: 'class_a',
        name: '1年A班 · 王立魔导科',
        badge: '名门栋 · 魔导与教养',
        bgCover: ACADEMY_SCENE.noble,
        teachers: '学科主任：巫师（魔导）／马·弗尔贝（教养）',
        desc: '王立魔导科的一年级门面班。公爵千金、当代圣女、兽人王女与受诅咒的咒术千金同处一室，规矩繁复、茶会不断，是全校社交与名誉的修罗场。',
        majorOpenings: [
          {
            title: '1年A班 · 开学首日点名',
            desc: '首席导师宣读学年誓词，名门栋的社交帷幕就此拉开——你被编入哪一桌，决定了这一年的风向。',
            prompt: '【1年A班·开学首日】你穿着新发的深蓝制服走进名门栋三楼的教室，随首席导师点名入座。这一年的同班同学都在这里，故事从认识她们开始。'
          },
          {
            title: '1年A班 · 午后沙龙茶会与分桌',
            desc: '名门栋专用沙龙摆开骨瓷与银茶具，谁坐主桌、谁被排到边桌，一场关于阵营的无声较量。',
            prompt: '【1年A班·午后沙龙】午休的沙龙摆好了骨瓷与茶具，你端着自己的杯子进门，需要找一张桌子坐下——坐哪一桌，就是这学期的阵营。'
          }
        ],
        chars: [
          {
            name: '克蕾雅', role: '公爵千金 · 前排靠窗',
            avatar: 'https://origin.picgo.net/2026/09/16/1409d4e13ab7c1ad7e96924a36bdd9a3482303ab0ef221c1.png',
            prompt: '【1年A班·克蕾雅】你按座位表找到自己的位置，邻座就是那位公爵千金。你落座、和她搭话，从互相自我介绍开始这段同学关系。'
          },
          {
            name: '莉莉娅', role: '当代圣女 · 后排角落',
            avatar: 'https://origin.picgo.net/2026/09/16/1b3aaf46fcec72dd5b23d8ecd9092f3b0f41accba6f103d6.png',
            prompt: '【1年A班·莉莉娅】你走进教室时，后排角落的白发少女正在收拾课本。你在她附近坐下，和她聊起来，故事从这里开始。'
          },
          {
            name: '拉姆内', role: '兽人王女 · 最后一排',
            avatar: 'https://origin.picgo.net/2026/09/16/140a45b97be03162fb8a7e59122a125807d4ba4f42278523.png',
            prompt: '【1年A班·拉姆内】最后一排坐着把腿架在桌上的兽耳少女。你放下书包、和她打招呼，从同班同学开始相处。'
          },
          {
            name: '梅拉妮', role: '受诅咒一族 · 咒术侧座',
            avatar: 'https://origin.picgo.net/2026/09/16/31f3ea8ecb0364f11784be1d0e50200bb3a6ea2667f58b02.png',
            prompt: '【1年A班·梅拉妮】你被安排到咒术科侧座，旁边是用黑刘海遮住脸的少女。你坐下、轻声搭话，让她自己开口。'
          },
          {
            name: '露娜', role: '千金三人组 · 沙龙常客',
            avatar: 'https://origin.picgo.net/2026/09/16/22706d19f51532c81.png',
            prompt: '【1年A班·露娜】斜前方穿黑礼裙的少女隔着刘海看了你一眼。你主动上前自我介绍，看看她想说什么。'
          },
          {
            name: '艾尔希', role: '亚克罗德交换生 · 邻座',
            avatar: PG_FACE.elsie,
            prompt: '【1年A班·艾尔希】邻座是浅蓝色短发的交换生，正摆弄着桌上的魔导导管。你放下课本，和她打招呼。'
          }
        ]
      },
      {
        id: 'class_b',
        name: '1年B班 · 骑士实技科',
        badge: '演武场 · 剑与实战',
        bgCover: ACADEMY_SCENE.knight,
        teachers: '教官：沙沙尔（剑术）／盖欧露易丝（实习）／古伊奈（魂式）',
        desc: '骑士实技科的一年级实战班。皇子首席、狼耳猎兵、前龙骑士团长与魂式天才同场，崇尚的是「说不过就拔剑，拔不过就再练」。',
        majorOpenings: [
          {
            title: '1年B班 · 晨练集结与木剑排位',
            desc: '演武场的晨风、木剑与皮甲的汗味。第一堂课就是排位，谁站第一列谁站最后一列。',
            prompt: '【1年B班·晨练】天刚亮，你换上训练服站进演武场的队列。教官要按对练成绩重排站位，你先把身边的同班同学认一遍。'
          },
          {
            title: '1年B班 · 后山野营与结组考核',
            desc: '把课堂搬到后山。两人一组，没规矩，只有猎刀、地图和身旁那个人。',
            prompt: '【1年B班·后山结组】后山林地边缘，教官宣布双人结组的野外实训开始。周围的同学都开始找搭档，你也要开口了。'
          }
        ],
        chars: [
          {
            name: '凯埃尔', role: '第二皇子 · 骑士科首席',
            avatar: 'https://origin.picgo.net/2026/09/16/02667b3c75d750d735ccf39b458b59e44df3c52454f35dd9.png',
            prompt: '【1年B班·凯埃尔】演武场器材架旁，束着低马尾的少年正在擦练习剑。你走过去自报姓名，从一场对练开始认识他。'
          },
          {
            name: '丽塔', role: '狼耳猎兵 · 二等编入',
            avatar: 'https://origin.picgo.net/2026/09/19/47add4de39d9d3d7f8aeee6228c46f8453aa07b8239428b3.png',
            prompt: '【1年B班·丽塔】墙根阴影里，狼耳少女正在给自己的猎刀缠布。你走近、开口，让她自己决定要不要理你。'
          },
          {
            name: '盖欧露易丝', role: '实习教官 · 四等特别编入',
            avatar: KE_FACE.georgia,
            prompt: '【1年B班·盖欧露易丝】上课前，戴着封轮的女教官把册子发到你手上。你上前报到，先做个自我介绍。'
          },
          {
            name: '古伊奈', role: '魂式助教 · 四等特别编入',
            avatar: KE_FACE.guine,
            prompt: '【1年B班·古伊奈】黑板上画满了运力路线图，留有余伤的助教把粉笔丢到你脚边。你捡起来，和她搭话。'
          }
        ]
      },
      {
        id: 'class_c',
        name: '1年C班 · 咒术神秘科',
        badge: '旧校舍 · 咒术与特异',
        bgCover: ACADEMY_SCENE.curse,
        teachers: '学科主任：菲娅娜（客座·化名）／狄娜（兼课）',
        desc: '藏在旧校舍长廊深处的特异聚落。咒术师、受诅咒者、异界来客与编外特待生都在这里，登记表上的栏目常年填不满。',
        majorOpenings: [
          {
            title: '1年C班 · 旧校舍的第一堂咒术理论',
            desc: '常年在紫雾里的旧长廊，刻满古秘纹的橡木门后，是连校规都写得含糊的一间课室。',
            prompt: '【1年C班·旧校舍】你穿过旧校舍漫长的石廊，推开刻满秘纹的橡木门，在深紫微光的教室里找到自己的座位。'
          },
          {
            title: '1年C班 · 咒物封存与鉴定实习',
            desc: '每学期一次。学科主任亲自过表，把旧校舍各处收拢来的咒物逐一登记、封存。',
            prompt: '【1年C班·封存实习】你按通知下到地下二层的封存室，长桌上摆着登记表与封好的木匣。你入席听讲，开始这学期的第一次实习。'
          }
        ],
        chars: [
          {
            name: '伊莉丝', role: '编外特待生 · 教会疗养转学',
            avatar: IRIS_SPRITE,
            prompt: '【1年C班·伊莉丝】旧校舍窗边，银白长发的少女正在整理转学材料。你在旁边坐下，和她搭话。'
          },
          {
            name: '夏洛特', role: '驱魔专修 · 污秽刻印',
            avatar: 'https://origin.picgo.net/2026/09/25/cfd04c9114e4aa6437c8334891a48cc3fdc86ac377d63ceb.png',
            prompt: '【1年C班·夏洛特】你走进教室，看见靠桌放着圣剑的少女正襟危坐。你放下书包、自我介绍，让她自己开口。'
          },
          {
            name: '响木天音', role: '魔导科交换生 · 编外',
            avatar: 'https://origin.picgo.net/2026/09/25/37006260238a0b0548b3bfa0782220d3008ccef9e096d764.png',
            prompt: '【1年C班·响木天音】趴在桌上打瞌睡的交换生，桌洞里塞着一本古书。你敲了敲她的桌子，从借笔记开始认识她。'
          },
          {
            name: '加莉泰娅', role: '特异存在 · 咒术理论座',
            avatar: IJ_FACE.galatea,
            prompt: '【1年C班·加莉泰娅】戴贝雷帽的少女把厚重的魔法书摆在课桌正中。你在她旁边落座，按照同桌的规矩先打招呼。'
          },
          {
            name: '布娜', role: '亚克罗德交换生',
            avatar: 'https://origin.picgo.net/2026/09/29/b92aa349890498ace7f37b15df6a7b0617cbd18ed4d9ffdc.png',
            prompt: '【1年C班·布娜】最后排的交换生说话总在半途停住。你耐心等她说完，从认识彼此开始。'
          },
          {
            name: '一之濑雫', role: '特异体质观察对象',
            avatar: 'https://origin.picgo.net/2026/10/02/13bcc39120a81f21da53e7602f9fb44be44c3589799d5a5c.png',
            prompt: '【1年C班·一之濑雫】靠门最隐蔽的座位上，少女扶着额头忍耐着什么。你走过去递水、搭话，看看她愿不愿意说。'
          }
        ]
      },
      {
        id: 'class_d',
        name: '1年D班 · 圣务医术科',
        badge: '大圣堂 · 祈祷与治愈',
        bgCover: ACADEMY_SCENE.chapel,
        teachers: '学科主任：马尔塔（教会驻学园代表）／雷克西斯（保健医助手）',
        desc: '大圣堂侧翼的一年级班。修女、见习神官、圣魔法特待生与治愈师同室，早祷比点名还准时，医务室的值班表由未成年助手排。',
        majorOpenings: [
          {
            title: '1年D班 · 晨祷与大圣堂值日',
            desc: '钟声、长椅、白蜡烛。第一次值日排班，就是与谁的班次重合。',
            prompt: '【1年D班·晨祷】大圣堂侧翼的彩窗刚刚透亮，你在长椅上坐进自己班的位置。晨祷之后要排值日表，你从认识同班同学开始。'
          },
          {
            title: '1年D班 · 医务室实习与药草园',
            desc: '保健医助手只有十四岁，但他比谁都清楚「治不了」三个字有多重。',
            prompt: '【1年D班·医务室实习】你按排班表来到医务室，跟着保健医助手学辨识药柜。隔壁小床上还躺着一个初等部的孩子。'
          }
        ],
        chars: [
          {
            name: '芙洛蒂', role: '凯尔维斯岛派遣 · 修女',
            avatar: 'https://origin.picgo.net/2026/09/25/4dc6200820290c3f0850b1ef48e107eec138f9223373b60b.png',
            prompt: '【1年D班·芙洛蒂】你走进教室，白色修女服的少女正抱着一摞药箱。你上前自我介绍，从同班同学开始。'
          },
          {
            name: '艾妮希雅', role: '戴尔王国派遣 · 代理祭司',
            avatar: 'https://origin.picgo.net/2026/09/25/35c2aa1a16d684964cdc8c58bc8438ff4dc4733308eeb8a0.png',
            prompt: '【1年D班·艾妮希雅】少女把教堂名牌别在胸口，一只手按在手腕内侧。你在她旁边坐下，和她搭话。'
          },
          {
            name: '托莉娜', role: '阿斯林顿见习神官',
            avatar: 'https://origin.picgo.net/2026/10/02/baf1073fccd03e0d73215a07dc7621448d075e160cd34497.png',
            prompt: '【1年D班·托莉娜】你走进教室，双手交叠在课本上的见习神官正看着你这边。你在她旁边的位置坐下，和她交流一番、开始自我介绍。'
          },
          {
            name: '斯提亚拉', role: '圣魔法特待生 · 盲眼',
            avatar: KE_FACE.stiara,
            prompt: '【1年D班·斯提亚拉】窗边坐着看不见的圣魔法特待生，正用手指丈量书页。你放轻脚步走过去，从打招呼开始。'
          },
          {
            name: '奇诺米', role: '茨塔尔正教 · 见习治愈师',
            avatar: IJ_FACE.chinomi,
            prompt: '【1年D班·奇诺米】你还没进门就听见她跟科代表争执。等她说完，你上前自报姓名，让她自己决定怎么回应。'
          },
          {
            name: '蒂莎', role: '初等部附属 · 保健室常驻',
            avatar: IJ_FACE.tisha,
            prompt: '【1年D班·蒂莎】你按排班来到保健室，最里面的小床上有个正在拼拼图的幼女。你走近、开口，故事从这里开始。'
          }
        ]
      },
      {
        id: 'staff',
        name: '教职员室 · 讲师与职员',
        badge: '聘任教职 · 履历优先',
        bgCover: ACADEMY_SCENE.staff,
        teachers: '既有教职：沙沙尔（剑术）／巫师（魔导·学院最强）／马·弗尔贝（教养）',
        desc: '学院不以年龄定年级，也不以年龄定教职。在各自领域已有履历的人被以「客座」「外聘」的名义请进来——教职员室里坐着的，一半人比学生大不了几岁。',
        majorOpenings: [
          {
            title: '教职员室 · 外聘讲师报到',
            desc: '聘书、课表、钥匙与一份写着「不要问她的来历」的备注。',
            prompt: '【教职员室·报到】你拿着聘书走进教职员室，屋里的讲师们各自忙着手里的事。你上前报到、自我介绍，接下这学期的课表。'
          },
          {
            title: '教职员室 · 期中考务会议',
            desc: '一周后是期中考。出题、监考、补课名单与「谁的学生又缺勤了」。',
            prompt: '【教职员室·考务会议】期中考试的排考表摊在沙盘桌上，会议记录需要一个人来写。你拉开椅子坐下。'
          }
        ],
        chars: [
          {
            name: '卡莲', role: '魔导科讲师 · 研究所所长',
            avatar: PG_FACE.karen,
            prompt: '【教职员室·卡莲】魔导研究所的工作台前，讲师把一叠编号清单按在桌上。你上前领走自己那份，顺便自我介绍。'
          },
          {
            name: '狄娜', role: '风纪监察官 · 兼实技讲师',
            avatar: PG_FACE.dina,
            prompt: '【教职员室·狄娜】风纪监察官把一副备用执法手铐推到你面前的桌上。你收下、报上姓名，从这学期的巡查搭档关系开始。'
          },
          {
            name: '菲娅娜', role: '客座讲师 · 化名通缉中',
            avatar: 'https://origin.picgo.net/2026/09/19/8bd536a22ff04e798acce03d2331ef5d4a6c08d85dccef06.png',
            prompt: '【教职员室·菲娅娜】客座讲师把腿架在桌角转着粉笔。你在她对面坐下，先说明自己的来意。'
          },
          {
            name: '幽妮娅', role: '购买部主管 · 兼商业科讲师',
            avatar: 'https://origin.picgo.net/2026/09/29/a98c931c39917d2e6805d548362ec83e0416053184ba36d5.png',
            prompt: '【购买部·幽妮娅】购买部的柜台后，主管合上账册看向你。你上前打招呼，从这学期的采购或课程谈起。'
          },
          {
            name: '阿黛拉', role: '女生宿舍舍监 · 公爵家派驻',
            avatar: 'https://origin.picgo.net/2026/09/16/8960482acfee34f1120a7e040e65b7ba8ea28a72c3e3e1c4.png',
            prompt: '【女生宿舍·阿黛拉】宿舍门口，舍监正核对晚归名单。你上前登记入住，和她做第一次照面。'
          },
          {
            name: '雷克西斯', role: '保健医助手 · 三等编入',
            avatar: IJ_FACE.rexis,
            prompt: '【医务室·雷克西斯】十四岁的保健医助手正在重写药柜标签。你走进去、报上姓名，听他交代这间屋子的规矩。'
          }
        ]
      },
      {
        id: 'council',
        name: '学生会 · 执务室',
        badge: '权力枢纽 · 全校预算与风纪',
        bgCover: ACADEMY_SCENE.council,
        teachers: '名誉顾问：艾拉（妖精）／司法监察：帕特里琪娅（司法院派驻）',
        desc: '钟楼顶层的统御中枢。社团预算、风纪执法、特权委任与转学审批都在这张长桌上定案，而学生会长是帝国第二皇子。',
        majorOpenings: [
          {
            title: '学生会 · 干事委任与风纪密令',
            desc: '红毯、长桌、落地窗，以及一份不在任何名册上的密令。',
            prompt: '【学生会·干事报到】你推开钟楼顶层那扇厚重的红木门，长桌边坐着学生会的人。你上前报到，接下第一份委任。'
          },
          {
            title: '学生会 · 社团预算审议',
            desc: '一年一度的社团预算会。剑术部要换护具，魔法研究会要新炉子，园艺部只想要三袋土。',
            prompt: '【学生会·预算审议】议事桌上堆满各社团的申请单，需要有人排出优先级。你拉开椅子坐下。'
          }
        ],
        chars: [
          {
            name: '凯埃尔皇子', role: '学生会长 · 第二皇子',
            avatar: 'https://origin.picgo.net/2026/09/16/02667b3c75d750d735ccf39b458b59e44df3c52454f35dd9.png',
            prompt: '【学生会·凯埃尔】会长签完最后一份文件抬头看你。你上前敬礼、自我介绍，从新干事的第一天开始。'
          },
          {
            name: '帕特里琪娅', role: '学园司法监察官',
            avatar: IJ_FACE.patricia,
            prompt: '【学生会·帕特里琪娅】司法监察官在公文室整理卷宗。你敲门进去、递上自己的档案，接受审核。'
          },
          {
            name: '艾拉', role: '名誉顾问 · 妖精',
            avatar: 'https://origin.picgo.net/2026/09/16/bdf825043d9582bba3d3ec9ae02dafad295f3a856a6c53ab.png',
            prompt: '【学生会·艾拉】红茶杯沿上坐着一只巴掌大的妖精，正笑嘻嘻地看你。你和她搭话，看她要说什么。'
          },
        ]
      }
    ];
    /* ── 学院模式：头像兜底（无立绘时用姓名首字生成字母头像） ── */
    function krsAvatarHtml(url, name) {
      if (url) return '<div class="destiny-avatar"><img src="' + url + '" alt="' + name + '"></div>';
      return '<div class="destiny-avatar krs-letter-avatar" data-initial="' + String(name || '?').slice(0, 1) + '"></div>';
    }

    /* ── 学院模式：按所选区块生成编成默认开局 ── */
    function krsAcademyOpening(cls, ch) {
      const sp = SPECIAL_CHAPTERS.find((s) => s.key === '学院模式') || {};
      const lines = [sp.opening || '生成潘多拉学院新学期的第一天，<user>以在籍学生身份踏入校门的开局'];
      lines.push('【学院编成】' + cls.name + '｜' + cls.badge);
      lines.push('请把<user>的学籍落在这个区块：/user/身份 填「潘多拉学院 ' + cls.name + ' 在籍」，并从这份课表、值日表与左右同桌写起。');
      lines.push('置籍口径：年级不看年龄，只看实技评级与在籍资历；本条编成只在学院模式下生效，不得改动任何角色原本的人设与来历。');
      if (ch) lines.push('本轮对手戏角色：「' + ch.name + '」（' + ch.role + '）——按她原本的人设登场，不要改写她的性格、经历与关系。');
      return lines.join('\n');
    }

    /* 页脚「当前编成」摘要：可单独刷新，打字时不重绘也能实时更新 */
    function krsAcademyFootSummary() {
      const lab = shadow.getElementById('aca-stage-foot-label');
      if (!lab) return;
      const cls = ACADEMY_CLASSES.find((c) => c.id === state.academyClassId) || ACADEMY_CLASSES[0];
      const picked = state.academyItemKey
        ? (state.academyItemKey === 'custom'
          ? '已选：自定义开局'
          : (state.academyCharName ? '已选互动对象：' + state.academyCharName : '已选区块大开局'))
        : '未选具体开局（使用区块默认开局）';
      lab.innerHTML = '当前编成：<b>' + cls.name + '</b>　' + picked;
    }

    /* ── 学院模式：全自定义开局 ── */
    function krsAcademyCustomText() {
      const id = String(state.acaCustomIdentity || '').trim();
      const rel = String(state.acaCustomRelation || '').trim();
      const sc = String(state.acaCustomScene || '').trim();
      if (!id && !rel && !sc) return '';
      let t = '【学院模式 · 自定义开局】';
      t += (id ? ('我进入学院的身份是「' + id + '」。') : '我进入学院的身份，由你按下面的情境安排。');
      if (rel) t += '[我与学院的关系：' + rel + '。]';
      if (sc) t += '[开局情境：' + sc + '。]';
      t += '请只写这个故事的开端：<user>以这个身份进入潘多拉学院、与校内的人发生第一次接触的过程；'
         + '写到需要<user>做出选择的地方就停住。';
      return t;
    }

    function krsAcademyApplyCustom(needRender) {
      const t = krsAcademyCustomText();
      if (!t) return;
      state.academyItemKey = 'custom';
      state.academyCharName = '';
      state.lastSelectedPrompt = t;
      state.openingText = t;
      state.openingTouched = true;
      const input = shadow.getElementById('opening-input');
      if (input) input.value = t;
      if (needRender) renderAcademyClasses();
      krsAcademyFootSummary();
      updateSummary();
    }

    function krsAcademyBindCustom() {
      [['aca-custom-identity', 'acaCustomIdentity'],
       ['aca-custom-relation', 'acaCustomRelation'],
       ['aca-custom-scene', 'acaCustomScene']].forEach((pair) => {
        const el = shadow.getElementById(pair[0]);
        if (!el) return;
        if (el.value !== (state[pair[1]] || '')) el.value = state[pair[1]] || '';
        el.oninput = () => {
          state[pair[1]] = el.value;
          const t = krsAcademyCustomText();
          if (t) {
            krsAcademyApplyCustom(false);
            const foot = shadow.getElementById('aca-custom-card');
            if (foot) { /* 保持卡片展开，避免打字时被重绘 */ }
          } else if (state.academyItemKey === 'custom') {
            /* 三栏都清空 → 退回区块默认开局；此处不重绘，避免输入框失焦 */
            state.academyItemKey = '';
            const cls0 = ACADEMY_CLASSES.find((c) => c.id === state.academyClassId) || ACADEMY_CLASSES[0];
            const t2 = krsAcademyOpening(cls0, null);
            state.lastSelectedPrompt = t2;
            state.openingText = t2;
            state.openingTouched = true;
            const inp = shadow.getElementById('opening-input');
            if (inp) inp.value = t2;
            updateSummary();
          }
        };
      });
    }

    function krsSelectAcademy(itemKey, prompt, charName) {
      state.academyItemKey = itemKey || '';
      state.academyCharName = charName || '';
      state.lastSelectedPrompt = prompt;
      state.openingText = prompt;
      state.openingTouched = true;
      const input = shadow.getElementById('opening-input');
      if (input) input.value = prompt;
      renderAcademyClasses();
      krsAcademyFootSummary();
      updateSummary();
    }

    function renderAcademyClasses() {
      const box = shadow.getElementById('academy-classes-box');
      if (!box) return;
      box.innerHTML = '';
      if (!ACADEMY_CLASSES.some((c) => c.id === state.academyClassId)) {
        state.academyClassId = ACADEMY_CLASSES[0].id;
      }

      /* 1. 顶部：六区块大卡块 */
      const grid = document.createElement('div');
      grid.className = 'academy-quad-grid';
      ACADEMY_CLASSES.forEach((cls) => {
        const isSelected = (state.academyClassId === cls.id);
        const card = document.createElement('div');
        card.className = 'academy-quad-card' + (isSelected ? ' selected' : '');
        card.style.backgroundImage = "url('" + cls.bgCover + "')";

        const subAvatarHtml = cls.chars.map((c) => {
          const inner = c.avatar
            ? '<img src="' + c.avatar + '" alt="' + c.name + '">'
            : '<span class="krs-mini-letter">' + c.name.slice(0, 1) + '</span>';
          return '<div class="academy-mini-avatar" title="' + c.name + ' · ' + c.role + '">' + inner + '</div>';
        }).join('');

        card.innerHTML =
          '<div class="academy-quad-head">'
          +   '<span class="academy-quad-title">' + cls.name + '</span>'
          +   '<span class="academy-quad-badge">' + cls.badge + '</span>'
          + '</div>'
          + '<p class="academy-quad-desc">' + cls.desc + '</p>'
          + '<div class="academy-quad-subchars"><span style="font-size:11px; color:#ccc;">成员：</span>' + subAvatarHtml + '</div>';

        card.onclick = () => {
          state.academyClassId = cls.id;
          const k = state.academyItemKey || '';
          const keepMajor = k.indexOf('major_' + cls.id + '_') === 0;
          const keepChar = k.indexOf('char_') === 0 && cls.chars.some((ch) => ('char_' + ch.name) === k);
          if (!keepMajor && !keepChar) {
            krsSelectAcademy('', krsAcademyOpening(cls, null), '');
          } else {
            renderAcademyClasses();
            updateSummary();
          }
        };
        grid.appendChild(card);
      });
      /* 2. 所选区块的专属展台（稍后与网格一起按新顺序挂载） */
      const curCls = ACADEMY_CLASSES.find((c) => c.id === state.academyClassId) || ACADEMY_CLASSES[0];
      const stage = document.createElement('div');
      stage.className = 'academy-stage';

      const head = document.createElement('div');
      head.className = 'academy-stage-head';
      head.innerHTML = '<b>' + curCls.name + '</b><i>' + curCls.badge + '</i>';
      stage.appendChild(head);

      const desc = document.createElement('p');
      desc.className = 'academy-stage-desc';
      desc.textContent = curCls.desc + (curCls.teachers ? '　｜　' + curCls.teachers : '');
      stage.appendChild(desc);

      /* 2.1 核心成员圆钮 */
      const charTitle = document.createElement('div');
      charTitle.className = 'destiny-group-title';
      charTitle.innerHTML = '✦ 【' + curCls.name + '】核心成员（点击头像载入与她的专属入学互动开局）：';
      stage.appendChild(charTitle);

      const charRow = document.createElement('div');
      charRow.className = 'academy-char-row';
      curCls.chars.forEach((ch) => {
        const itemKey = 'char_' + ch.name;
        const isSelected = (state.academyItemKey === itemKey);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'destiny-btn' + (isSelected ? ' selected' : '');
        btn.title = ch.role;
        btn.innerHTML = krsAvatarHtml(ch.avatar, ch.name) + '<span class="destiny-name">' + ch.name + '</span>';
        btn.onclick = () => krsSelectAcademy(itemKey, ch.prompt, ch.name);
        charRow.appendChild(btn);
      });
      stage.appendChild(charRow);

      /* 2.2 区块大开局 */
      const majorTitle = document.createElement('div');
      majorTitle.className = 'destiny-group-title';
      majorTitle.style.marginTop = '16px';
      majorTitle.innerHTML = '✦ 【' + curCls.name + '】区块大开局（点击载入该区块的班级／职场宏观事件）：';
      stage.appendChild(majorTitle);

      const majorGrid = document.createElement('div');
      majorGrid.className = 'academy-major-openings-grid';
      curCls.majorOpenings.forEach((mo, idx) => {
        const itemKey = 'major_' + curCls.id + '_' + idx;
        const isSelected = (state.academyItemKey === itemKey);
        const majorCard = document.createElement('button');
        majorCard.type = 'button';
        majorCard.className = 'pure-route-btn' + (isSelected ? ' selected' : '');
        majorCard.innerHTML = '<strong>✦ ' + mo.title + '</strong><small>' + mo.desc + '</small>';
        majorCard.onclick = () => krsSelectAcademy(itemKey, mo.prompt, '');
        majorGrid.appendChild(majorCard);
      });
      stage.appendChild(majorGrid);

      /* 2.3 当前编成摘要 + 默认开局复位 */
      const foot = document.createElement('div');
      foot.className = 'academy-stage-foot';
      const label = document.createElement('span');
      label.id = 'aca-stage-foot-label';
      foot.appendChild(label);

      const btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex; gap:8px; flex-wrap:wrap;';

      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'nav-btn slim';
      resetBtn.textContent = '用区块默认开局';
      resetBtn.onclick = () => krsSelectAcademy('', krsAcademyOpening(curCls, null), '');
      btnRow.appendChild(resetBtn);

      const customBtn = document.createElement('button');
      customBtn.type = 'button';
      customBtn.className = 'nav-btn slim' + (state.acaCustomOpen ? ' primary' : '');
      customBtn.textContent = state.acaCustomOpen ? '收起自定义开局 ▴' : '✏️ 自定义开局';
      customBtn.onclick = () => {
        state.acaCustomOpen = !state.acaCustomOpen;
        renderAcademyClasses();
        if (state.acaCustomOpen) {
          const el = shadow.getElementById('aca-custom-identity');
          if (el && typeof el.focus === 'function') el.focus();
        }
      };
      btnRow.appendChild(customBtn);

      foot.appendChild(btnRow);
      stage.appendChild(foot);

      /* 展台排在网格之前：点选核心成员后，上方的「开局设定」文本框仍在视野内，
         不会被挤到屏幕外，能立刻看到编成写进了开局设定。 */
      box.appendChild(stage);
      box.appendChild(grid);

      /* 自定义开局卡片：跟着按钮开合，并把已填内容回填（重绘后不丢字） */
      const customCard = shadow.getElementById('aca-custom-card');
      if (customCard) customCard.style.display = state.acaCustomOpen ? 'flex' : 'none';
      krsAcademyBindCustom();
      krsAcademyFootSummary();
    }

    /* 动态控制第四幕的“自由模式容器”与“学院模式容器”显隐 */
    /* ── 第四幕 · 自由模式：四个开局页签切换 ── */

    /* ═══════════ 特性 / 家产 / 技能 预设（点一条直接加入）═══════════ */
    const TRAIT_PRESETS = [
      { 名称: '预知魔眼', 分类: '血脉',
        描述: '你的右眼是特殊魔眼，能看见2秒后的世界，需要适应' },
      { 名称: '魔法少女', 分类: '血脉 · 加护',
        描述: '与某位上位存在缔结契约后获得的力量。变身状态下体质、敏捷与魔力大幅提升，魔力消耗降至一半。代价是契约方随时能感知你的位置与情绪，且一旦解除契约，全部加成会立刻消失。' },
      { 名称: '抗毒体质', 分类: '体质',
        描述: '大部分毒素、劣化药剂与腐坏食物对你只造成轻微不适。强效毒物仍会让你中毒，但发作更慢、症状更轻，通常能撑到有人来救。' },
      { 名称: '恶魔血脉', 分类: '血脉',
        描述: '血脉中混有恶魔的因子：夜间感知与自愈能力显著更强，对神圣系术式格外脆弱。情绪激动时眼部或皮肤会显出魔族特征，藏不住。' },
      { 名称: '加护 · 幸运', 分类: '加护',
        描述: '命运偶尔偏袒你。骰子、抽签以及纯粹凭运气的场合，结果往往偏向你这边。但真正要命的关头，它一次也不会救你。' },
      { 名称: '诅咒 · 无法说谎', 分类: '诅咒',
        描述: '你无法主动说出谎言。可以沉默、可以岔开话题，但一旦开口，说出的必须是你自己认定为真的话。' },
      { 名称: '魔导工学适性', 分类: '技巧',
        描述: '对机械、构装体与魔导器的理解远超常人。能修理、能改装，也能一眼看出别人做的机关在哪里动过手脚。' },
      { 名称: '痛觉钝化', 分类: '体质',
        描述: '你几乎感觉不到疼痛。受伤时不会因剧痛失去行动力，但也因此容易忽略自己已经伤得有多重。' },
      { 名称: '精灵亲和', 分类: '加护',
        描述: '精类与元素对你的态度明显更友善。在林野中不易迷路，召唤系术式的消耗更低；但你对它们说谎时一定会被察觉。' },
    ];

    const ASSET_PRESETS = [
      { 名称: '魔力太阳能房车', 类型: '家', 规模: '1', 位置: '随身（可移动 · 可环游世界）', 状态: '完好',
        产出: '无稳定产出。车顶可收式魔导集能板白天吸收魔素，储能回路可维持照明、加热、储水、冷藏与小型魔导器充电；不用燃料，跑得比马车快、比马车稳——这就是你的「家」。' },
      { 名称: '王都西区红砖公寓', 类型: '家', 规模: '2', 位置: '王都 · 贵族街区外沿', 状态: '完好',
        产出: '每月 30 G 租金。一间自住，另两间出租。' },
      { 名称: '塞拉丁的荒废宅邸', 类型: '家 · 领地', 规模: '3', 位置: '塞拉丁 · 中心街', 状态: '破损废弃',
        产出: '无产出。修缮后可作据点；地下室还封着上一代主人的东西。' },
      { 名称: '商店街的小工坊', 类型: '工坊', 规模: '1', 位置: '王都 · 商店街', 状态: '完好',
        产出: '每月可产出 1 件简易魔导器，或直接折价 45 G。' },
      { 名称: '一间出租铺面', 类型: '经营', 规模: '1', 位置: '王都 · 平民区', 状态: '完好',
        产出: '每月 20 G。承租人在做什么生意，由你自定。' },
      { 名称: '私人藏书室', 类型: '领地', 规模: '2', 位置: '王都 · 学院区', 状态: '完好',
        产出: '无产出，但研究、查资料与学习类判定有加成。' },
    ];

    const SKILL_PRESETS = [
      { 名称: '基础剑术', 流派: '剑术', 熟练度: '入门',
        介绍: '持剑攻防的基本架势与步伐。面对同级对手不至于落败，面对高手只够撑几个回合。',
        提升方法: '每日挥剑与对练；和比自己强的人交手提升最快。' },
      { 名称: '魔力感知', 流派: '魔术', 熟练度: '熟练',
        介绍: '能感知周围的魔力流动与术式结构，可判断陷阱、结界与隐藏的魔导器。',
        提升方法: '反复观察他人施术；在魔力浓的地方久待也有帮助。' },
      { 名称: '野外生存', 流派: '生存', 熟练度: '熟练',
        介绍: '生火、取水、辨认可食植物、搭简易庇护所。在没有补给的地方也能撑下去。',
        提升方法: '长期在外行走；跟猎人、兽人向导学最快。' },
      { 名称: '简易治愈术', 流派: '神学', 熟练度: '入门',
        介绍: '处理外伤与止血，能缓解疼痛、加快愈合。治不了重病，也接不回断手。',
        提升方法: '在教会或医馆帮忙；多用多练。' },
      { 名称: '谈判与话术', 流派: '社交', 熟练度: '熟练',
        介绍: '读懂对方真正想要什么，并把自己想说的说成对方愿意听的样子。',
        提升方法: '与商队、贵族、掮客打交道；吃几次亏就学会了。' },
      { 名称: '潜行', 流派: '技巧', 熟练度: '入门',
        介绍: '压低气息、放轻脚步，在昏暗环境里不易被察觉。',
        提升方法: '夜里行动、跟盗贼学、多被追几次。' },
      { 名称: '弓术', 流派: '弓术', 熟练度: '入门',
        介绍: '中距离射击。静止目标没问题，移动目标得看运气。',
        提升方法: '每日练习；打猎是最好的训练。' },
      { 名称: '料理', 流派: '生活', 熟练度: '熟练',
        介绍: '把能吃的东西做得让人愿意吃。队伍士气与相处氛围会明显变好。',
        提升方法: '天天做饭；弄到好食材之后练得更快。' },
    ];

    /* 预设面板：点一条直接追加进对应数组 */
    const PRESET_DEFS = {
      skill: { data: function () { return SKILL_PRESETS; }, panel: 'preset-panel-skill',
               push: function (it) { state.userSkills.push(Object.assign({}, it)); activeSkIdx = state.userSkills.length - 1; renderSkillsList(); },
               blank: { 名称: '', 流派: '', 熟练度: '', 介绍: '', 提升方法: '' } },
      trait: { data: function () { return TRAIT_PRESETS; }, panel: 'preset-panel-trait',
               push: function (it) { state.userTraits.push(Object.assign({}, it)); activeTrIdx = state.userTraits.length - 1; renderTraitsList(); },
               blank: { 名称: '', 分类: '', 描述: '' } },
      asset: { data: function () { return ASSET_PRESETS; }, panel: 'preset-panel-asset',
               push: function (it) { state.userAssets.push(Object.assign({}, it)); activeAsIdx = state.userAssets.length - 1; renderAssetsList(); },
               blank: { 名称: '', 类型: '', 规模: '', 位置: '', 状态: '', 产出: '' } },
    };

    function closePresetPanels() {
      Object.keys(PRESET_DEFS).forEach(function (k) {
        const p = shadow.getElementById(PRESET_DEFS[k].panel);
        if (p) p.style.display = 'none';
      });
    }

    function openPresetPanel(kind) {
      const def = PRESET_DEFS[kind];
      if (!def) return;
      const panel = shadow.getElementById(def.panel);
      if (!panel) return;
      const wasOpen = panel.style.display !== 'none';
      closePresetPanels();
      if (wasOpen) return;
      const list = def.data();
      panel.innerHTML = '<div class="wb-preset-tip">点一条直接加入下方列表；也可以用「+ 新增」自己从空白开始填。</div>'
        + list.map(function (it, i) {
            const sub = it.分类 || it.类型 || it.流派 || '';
            const extra = it.描述 || it.介绍 || it.产出 || '';
            const num = kind === 'asset' ? ('阶' + (it.规模 || '1')) : (it.熟练度 || '');
            return '<button type="button" class="wb-preset-card" data-preset-idx="' + i + '">'
              + '<div class="wb-preset-head"><b>' + String(it.名称).replace(/</g, '&lt;') + '</b>'
              + '<span class="wb-preset-tag">' + sub + (num ? ' · ' + num : '') + '</span></div>'
              + '<div class="wb-preset-desc">' + String(extra).replace(/</g, '&lt;') + '</div>'
              + '<span class="wb-preset-add">＋ 加入</span></button>';
          }).join('');
      panel.querySelectorAll('[data-preset-idx]').forEach(function (b) {
        b.onclick = function () {
          const it = def.data()[Number(b.dataset.presetIdx)];
          if (!it) return;
          def.push(it);
          closePresetPanels();
          updateSummary();
          persistCurrentState();
        };
      });
      panel.style.display = 'block';
    }

    function bindOpenTabs() {
      const bar = shadow.getElementById('open-tabs-bar');
      if (!bar || bar.getAttribute('data-bound') === '1') return;
      bar.setAttribute('data-bound', '1');
      bar.addEventListener('click', function (ev) {
        const btn = ev.target && ev.target.closest ? ev.target.closest('.open-tab') : null;
        if (!btn) return;
        const key = btn.getAttribute('data-open-pane');
        state.openTab = key;
        refreshOpeningText(true);
        bar.querySelectorAll('.open-tab').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        shadow.querySelectorAll('.open-pane').forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-pane') === key);
        });
      });
    }

    /* ── 完全自由 · 出生地地图 ── */
    /* ── 出生地地图视图状态（fit 基准比例 + 用户缩放/平移）── */
    let birthBaseK = 1;
    const birthView = { k: 1, tx: 0, ty: 0 };

    function applyBirthView() {
      const cv = shadow.getElementById('birth-canvas');
      const vp = shadow.getElementById('birth-viewport');
      if (!cv || !vp) return;
      const k = birthBaseK * birthView.k;
      cv.style.transformOrigin = '0 0';
      cv.style.transform = 'translate(' + birthView.tx.toFixed(1) + 'px,' + birthView.ty.toFixed(1) + 'px) scale(' + k.toFixed(4) + ')';
      const lbl = shadow.getElementById('birth-zoom-label');
      if (lbl) lbl.textContent = Math.round(birthView.k * 100) + '%';
    }

    function fitBirthMap() {
      const vp = shadow.getElementById('birth-viewport');
      const cv = shadow.getElementById('birth-canvas');
      if (!vp || !cv) return;
      const W = parseFloat(cv.getAttribute('data-w')) || 1180;
      const H = parseFloat(cv.getAttribute('data-h')) || 600;
      const avail = vp.clientWidth - 2;
      birthBaseK = Math.min(1, avail / W);
      /* 首次适配时把视图复位；只有用户主动缩放后才保留 */
      birthView.k = 1; birthView.tx = 0; birthView.ty = 0;
      vp.style.height = Math.round(H * birthBaseK) + 'px';
      applyBirthView();
    }

    /* 以 (cx, cy) 为锚点缩放，保持锚点下的地图内容不动 */
    function birthZoom(factor, cx, cy) {
      const vp = shadow.getElementById('birth-viewport');
      if (!vp) return;
      const nk = Math.max(0.6, Math.min(6, birthView.k * factor));
      if (Math.abs(nk - birthView.k) < 0.001) return;
      if (cx === undefined || cx === null) { cx = vp.clientWidth / 2; cy = vp.clientHeight / 2; }
      const ratio = nk / birthView.k;
      birthView.tx = cx - (cx - birthView.tx) * ratio;
      birthView.ty = cy - (cy - birthView.ty) * ratio;
      birthView.k = nk;
      applyBirthView();
    }

    function resetBirthView() {
      birthView.k = 1; birthView.tx = 0; birthView.ty = 0;
      applyBirthView();
    }

    function renderBirthMap() {
      const cv = shadow.getElementById('birth-canvas');
      const nl = shadow.getElementById('birth-nodes');
      const rl = shadow.getElementById('birth-regions');
      const svg = shadow.getElementById('birth-lines');
      if (!cv || !nl || !rl || !svg) return;
      if (cv.getAttribute('data-ready') === '1') { fitBirthMap(); syncBirthSelection(); return; }

      const nodes = BIRTH_MAP.nodes, facs = BIRTH_MAP.factions, conns = BIRTH_MAP.connections;
      const PAD = 130;
      const xs = nodes.map(function (n) { return n.x; });
      const ys = nodes.map(function (n) { return n.y; });
      const minX = Math.min.apply(null, xs) - PAD, maxX = Math.max.apply(null, xs) + PAD;
      const minY = Math.min.apply(null, ys) - PAD, maxY = Math.max.apply(null, ys) + PAD;
      const W = 1180;
      const H = Math.round(W * (maxY - minY) / (maxX - minX));
      const sx = function (x) { return (x - minX) / (maxX - minX) * W; };
      const sy = function (y) { return (y - minY) / (maxY - minY) * H; };
      cv.setAttribute('data-w', W); cv.setAttribute('data-h', H);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      rl.innerHTML = facs.map(function (f) {
        const w = f.w / (maxX - minX) * W, h = f.h / (maxY - minY) * H;
        return '<div class="birth-region" style="left:' + (sx(f.x) - w / 2).toFixed(1) + 'px;top:' +
          (sy(f.y) - h / 2).toFixed(1) + 'px;width:' + w.toFixed(1) + 'px;height:' + h.toFixed(1) +
          'px;background:' + f.color + ';border-color:' + f.border + ';">' +
          '<span class="birth-region-name">' + f.cn + '</span></div>';
      }).join('');

      const pos = {};
      nodes.forEach(function (n) { pos[n.id] = [sx(n.x), sy(n.y)]; });
      svg.innerHTML = conns.map(function (c) {
        const a = pos[c.from], b = pos[c.to];
        if (!a || !b) return '';
        return '<line class="' + (c.type === 'isolated' ? 'birth-line birth-line-iso' : 'birth-line') +
          '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) +
          '" y2="' + b[1].toFixed(1) + '"/>';
      }).join('');

      /* 节点旁的角色头像扇形（最多 3 个 + 剩余数） */
      function charFanChips(n) {
        const list = (LOC_CHARS && LOC_CHARS[n.id]) || [];
        if (!list.length) return '';
        const shown = list.slice(0, 3);
        const cx = pos[n.id][0], cy = pos[n.id][1];
        let h = '';
        shown.forEach(function (nm, k) {
          const ang = (-90 + (k - (shown.length - 1) / 2) * 34) * Math.PI / 180;
          const R = 27;
          const lx = cx + Math.cos(ang) * R, ly = cy + Math.sin(ang) * R;
          const url = LOC_CHAR_AV[nm] || '';
          h += '<span class="birth-chip" style="left:' + lx.toFixed(1) + 'px;top:' + ly.toFixed(1) + 'px;"'
             + ' title="' + nm + '（常驻此地）">'
             + '<img src="' + url + '" alt="' + nm + '"></span>';
        });
        if (list.length > 3) {
          const ang = (-90 + (shown.length - (shown.length - 1) / 2) * 34) * Math.PI / 180;
          const lx = cx + Math.cos(ang) * 27, ly = cy + Math.sin(ang) * 27;
          h += '<span class="birth-chip birth-chip--more" style="left:' + lx.toFixed(1) + 'px;top:' + ly.toFixed(1) +
               'px;" title="' + list.join('、') + '">+' + (list.length - 3) + '</span>';
        }
        return h;
      }

      nl.innerHTML = nodes.map(function (n) {
        const cls = 'birth-node birth-node--' + n.type + (n.type === 'fog' ? ' is-fog' : '');
        const t = n.type === 'fog' ? n.name + '（特殊地点，不可作为出生地）' : n.name + ' · ' + n.desc;
        return '<button type="button" class="' + cls + '" data-node="' + n.id + '" style="left:' +
          pos[n.id][0].toFixed(1) + 'px;top:' + pos[n.id][1].toFixed(1) + 'px;" title="' + t + '">' +
          '<span class="birth-node-icon">' + n.icon + '</span>' +
          '<span class="birth-node-name">' + n.name.replace(/^迷雾_/, '') + '</span></button>' +
          charFanChips(n);
      }).join('');

      cv.setAttribute('data-ready', '1');
      fitBirthMap();
      syncBirthSelection();
    }

    function syncBirthSelection() {
      if (!window.__nothing) { /* no-op, 保持函数体在闭包内 */ }
      const empty = shadow.getElementById('birth-side-empty');
      const info = shadow.getElementById('birth-side-info');
      const clearBtn = shadow.getElementById('birth-clear');
      shadow.querySelectorAll('.birth-node').forEach(function (b) {
        b.classList.toggle('selected', b.getAttribute('data-node') === state.birthPlace);
      });
      const n = BIRTH_MAP.nodes.find(function (x) { return x.id === state.birthPlace; }) || null;
      if (!n) {
        if (empty) empty.style.display = '';
        if (info) info.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
      }
      if (empty) empty.style.display = 'none';
      if (info) info.style.display = '';
      if (clearBtn) clearBtn.style.display = '';
      shadow.getElementById('birth-info-icon').textContent = n.icon;
      shadow.getElementById('birth-info-name').textContent = n.name;
      shadow.getElementById('birth-info-nation').textContent = n.nation;
      shadow.getElementById('birth-info-cost').textContent = n.cost || '';
      shadow.getElementById('birth-info-desc').textContent = n.desc || '';
      const box = shadow.getElementById('birth-subs');
      const subs = n.subs || [];
      box.innerHTML = subs.length
        ? subs.map(function (s) {
            return '<button type="button" class="birth-sub' + (state.birthSub === s ? ' active' : '') +
              '" data-sub="' + s + '">' + s + '</button>';
          }).join('')
        : '<span style="font-size:11.5px;color:var(--krs-dim);">（该地点没有细分地点）</span>';
    }

    /* ── BS箱庭：网状图渲染与交互 ── */
    function bsGardenOpening(name, gname) {
      const hit = (DESTINY_CONFIG.linked || []).concat(DESTINY_CONFIG.branch || [])
        .filter(function (c) { return c.name === name; })[0];
      if (hit && hit.prompt) return { prompt: hit.prompt, tag: 'BS箱庭 · ' + gname };
      return {
        tag: 'BS箱庭 · ' + gname,
        prompt: '生成<user>进入【' + name + '】的箱庭（' + gname + '）的开局。箱庭是' + name
          + '独自拥有的、自成一体的小世界。请先写<user>推开入口时看到的景象与这个箱庭运转的规则'
          + '（基调由 <user> 自定：温柔／怪诞／危险），再写' + name
          + '如何现身、如何对待这位不请自来的客人；不要急着让箱庭崩塌或指向外部主线。'
      };
    }

    /* ── BS箱庭自己的缩放/平移视图 ── */
    let bsBaseFit = 1;
    const bsView = { k: 1, tx: 0, ty: 0 };
    function applyBsView() {
      const cv = shadow.getElementById('bs-garden-canvas');
      if (!cv) return;
      cv.style.transformOrigin = '0 0';
      cv.style.transform = 'translate(' + bsView.tx.toFixed(1) + 'px,' + bsView.ty.toFixed(1) +
        'px) scale(' + (bsBaseFit * bsView.k).toFixed(4) + ')';
      const l = shadow.getElementById('bs-zoom-label');
      if (l) l.textContent = Math.round(bsView.k * 100) + '%';
    }
    function bsZoom(factor, cx, cy) {
      const st = shadow.getElementById('bs-garden-stage');
      if (!st) return;
      const nk = Math.max(0.5, Math.min(5, bsView.k * factor));
      if (Math.abs(nk - bsView.k) < 0.001) return;
      if (cx === undefined || cx === null) { cx = st.clientWidth / 2; cy = st.clientHeight / 2; }
      const ratio = nk / bsView.k;
      bsView.tx = cx - (cx - bsView.tx) * ratio;
      bsView.ty = cy - (cy - bsView.ty) * ratio;
      bsView.k = nk;
      applyBsView();
    }
    function resetBsView() { bsView.k = 1; bsView.tx = 0; bsView.ty = 0; applyBsView(); }

    function renderBsGarden() {
      const stage = shadow.getElementById('bs-garden-stage');
      const nl = shadow.getElementById('bs-garden-nodes');
      const svg = shadow.getElementById('bs-garden-lines');
      if (!stage || !nl || !svg) return;
      if (nl.getAttribute('data-ready') === '1') return;

      const G = BS_GARDENS || [];
      if (!G.length) return;

      /* 横向铺开的宽画布：舞台本身是宽扁的，横排才不会浪费空间。
         每组半径随人数增长、组间留足间距，再配合缩放/拖动细看。
         排序规则：大组放两端、小组夹中间，避免相邻两组的内容圈互相压到。 */
      const W = 3000, H = 1100;
      const hubY = 660, topY = 120;
      const R2 = function (n) { return 52 + n * 11; };
      const cv0 = shadow.getElementById('bs-garden-canvas');
      if (cv0) { cv0.style.width = W + 'px'; cv0.style.height = H + 'px'; }
      bsBaseFit = Math.min((stage.clientWidth || 640) / W, (stage.clientHeight || 360) / H);

      const bySize = G.slice().sort(function (a, b) { return b.chars.length - a.chars.length; });
      const seq = [];
      bySize.forEach(function (g, i) { if (i % 2 === 0) seq.push(g); else seq.unshift(g); });
      const pad = 300, x0 = pad, x1 = W - pad;
      const cx = W / 2, cy = topY;
      const hubPos = seq.map(function (g, i) {
        const x = seq.length === 1 ? cx : x0 + (x1 - x0) * i / (seq.length - 1);
        return [x, hubY];
      });
      let lines = '';
      seq.forEach(function (g, i) {
        lines += '<line class="bs-garden-line bs-garden-line--hub" x1="' + cx + '" y1="' + cy +
                 '" x2="' + hubPos[i][0].toFixed(1) + '" y2="' + hubPos[i][1].toFixed(1) + '"/>';
        const nx = hubPos[(i + 1) % seq.length];
        lines += '<line class="bs-garden-line bs-garden-line--hub" x1="' + hubPos[i][0].toFixed(1) +
                 '" y1="' + hubPos[i][1].toFixed(1) + '" x2="' + nx[0].toFixed(1) + '" y2="' + nx[1].toFixed(1) + '"/>';
      });
      let nodes = '<div class="bs-garden-hub" style="left:' + cx + 'px;top:' + cy + 'px;">🎩 BS箱庭</div>';

      seq.forEach(function (g, i) {
        const hx = hubPos[i][0], hy = hubPos[i][1];
        nodes += '<div class="bs-garden-hub" style="left:' + hx.toFixed(1) + 'px;top:' + hy.toFixed(1) +
                 'px;">' + g.icon + ' ' + g.name + ' <span style="opacity:.6">' + g.chars.length + '</span></div>';
        const r2 = R2(g.chars.length);
        g.chars.forEach(function (nm, k) {
          const a = (-90 + k * 360 / g.chars.length) * Math.PI / 180;
          const px = hx + Math.cos(a) * r2, py = hy + Math.sin(a) * r2;
          lines += '<line class="bs-garden-line" x1="' + hx.toFixed(1) + '" y1="' + hy.toFixed(1) +
                   '" x2="' + px.toFixed(1) + '" y2="' + py.toFixed(1) + '"/>';
          const url = LOC_CHAR_AV[nm] || '';
          const own = (DESTINY_CONFIG.linked || []).concat(DESTINY_CONFIG.branch || [])
            .filter(function (c) { return c.name === nm; })[0];
          const hasOwn = !!own;
          const gated = !!(own && own.linkKey) && !(!!state.linkMode && !!state.linkChars[own.linkKey]);
          nodes += '<button type="button" class="bs-garden-ball' + (hasOwn ? '' : ' bs-garden-ball--plain') + (gated ? ' bs-garden-ball--gated' : '') +
                   '" data-bs-char="' + nm + '" data-bs-garden="' + g.name + '" style="left:' + px.toFixed(1) +
                   'px;top:' + py.toFixed(1) + 'px;" title="' + nm + (hasOwn ? '（有专属命运主线）' : '（箱庭通用开局）') + '">' +
                   '<img src="' + url + '" alt="' + nm + '"><span>' + nm.replace(/爱丽丝$/, '爱丽丝').slice(0, 6) + '</span></button>';
        });
      });
      nodes += '<div class="bs-garden-tip">点圆球进入该角色的箱庭　·　拖动可平移、滚轮或±缩放　·　灰暗球为无专属表情差分者</div>';
      nl.innerHTML = nodes;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.innerHTML = lines;
      nl.setAttribute('data-ready', '1');
      resetBsView();
    }

    function openBsGarden(on) {
      const ov = shadow.getElementById('bs-garden-overlay');
      if (!ov) return;
      ov.style.display = on ? 'flex' : 'none';
      const shellEl = shadow.getElementById('birth-map-shell');
      const vpEl = shadow.getElementById('birth-viewport');
      if (shellEl) shellEl.classList.toggle('bs-open', !!on);
      if (on) {
        if (vpEl) vpEl.style.height = '560px';
        const nl = shadow.getElementById('bs-garden-nodes');
        if (nl) nl.setAttribute('data-ready', '0');
        resetBsView();
        renderBsGarden();
        /* 默认放大到 1.6x：全览太挤，先给一个能看清球与名字的视野，可拖动查看其余 */
        bsView.k = 1.6;
        applyBsView();
      } else if (vpEl) {
        fitBirthMap();
      }
    }

    function bindBsGarden() {
      const stage = shadow.getElementById('bs-garden-stage');
      if (stage && stage.getAttribute('data-panbound') !== '1') {
        stage.setAttribute('data-panbound', '1');
        const bptr = new Map();
        let bpinch0 = 0, bpinchK0 = 1, bmoved = 0;
        const bdist = function () {
          const a = Array.from(bptr.values());
          return Math.sqrt(Math.pow(a[0].x - a[1].x, 2) + Math.pow(a[0].y - a[1].y, 2));
        };
        const bmid = function () {
          const a = Array.from(bptr.values());
          const r = stage.getBoundingClientRect();
          return { x: (a[0].x + a[1].x) / 2 - r.left, y: (a[0].y + a[1].y) / 2 - r.top };
        };
        stage.addEventListener('pointerdown', function (e) {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          const t = e.target;
          if (t && t.closest && t.closest('.bs-garden-ball')) return;
          bptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
          try { stage.setPointerCapture(e.pointerId); } catch (_) {}
          if (bptr.size === 1) {
            bmoved = 0;
            bsView._sx = e.clientX; bsView._sy = e.clientY;
            bsView._tx = bsView.tx; bsView._ty = bsView.ty;
            stage.classList.add('dragging');
          } else if (bptr.size === 2) { bpinch0 = bdist(); bpinchK0 = bsView.k; }
          e.preventDefault();
        });
        stage.addEventListener('pointermove', function (e) {
          if (!bptr.has(e.pointerId)) return;
          bptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (bptr.size >= 2) {
            if (bpinch0 > 0) { const m = bmid(); bsZoom(bpinchK0 * (bdist() / bpinch0) / bsView.k, m.x, m.y); }
            return;
          }
          const dx = e.clientX - bsView._sx, dy = e.clientY - bsView._sy;
          bmoved = Math.max(bmoved, Math.abs(dx) + Math.abs(dy));
          bsView.tx = bsView._tx + dx; bsView.ty = bsView._ty + dy;
          applyBsView();
        });
        const bEnd = function (e) {
          bptr.delete(e.pointerId);
          try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
          if (bptr.size < 2) bpinch0 = 0;
          if (bptr.size === 0) stage.classList.remove('dragging');
          else if (bptr.size === 1) {
            const p = Array.from(bptr.values())[0];
            bsView._sx = p.x; bsView._sy = p.y; bsView._tx = bsView.tx; bsView._ty = bsView.ty;
          }
        };
        stage.addEventListener('pointerup', bEnd);
        stage.addEventListener('pointercancel', bEnd);
        stage.addEventListener('wheel', function (e) {
          e.preventDefault(); e.stopPropagation();
          const r = stage.getBoundingClientRect();
          bsZoom(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX - r.left, e.clientY - r.top);
        }, { passive: false });
      }
      const bi = shadow.getElementById('bs-zoom-in');
      const bo = shadow.getElementById('bs-zoom-out');
      const br = shadow.getElementById('bs-zoom-reset');
      if (bi && bi.getAttribute('data-zb') !== '1') {
        bi.setAttribute('data-zb', '1'); bo.setAttribute('data-zb', '1'); br.setAttribute('data-zb', '1');
        bi.addEventListener('click', function (e) { e.stopPropagation(); bsZoom(1.25); });
        bo.addEventListener('click', function (e) { e.stopPropagation(); bsZoom(1 / 1.25); });
        br.addEventListener('click', function (e) { e.stopPropagation(); resetBsView(); });
      }
      const openBtn = shadow.getElementById('birth-bs-open');
      const closeBtn = shadow.getElementById('bs-garden-close');
      const ov = shadow.getElementById('bs-garden-overlay');
      if (openBtn && openBtn.getAttribute('data-bound') !== '1') {
        openBtn.setAttribute('data-bound', '1');
        openBtn.addEventListener('click', function (e) { e.stopPropagation(); openBsGarden(true); });
      }
      if (closeBtn && closeBtn.getAttribute('data-bound') !== '1') {
        closeBtn.setAttribute('data-bound', '1');
        closeBtn.addEventListener('click', function (e) { e.stopPropagation(); openBsGarden(false); });
      }
      if (ov && ov.getAttribute('data-bound') !== '1') {
        ov.setAttribute('data-bound', '1');
        ov.addEventListener('click', function (ev) {
          ev.stopPropagation();
          const ball = ev.target && ev.target.closest ? ev.target.closest('.bs-garden-ball') : null;
          if (!ball) return;
          const nm = ball.getAttribute('data-bs-char');
          const gn = ball.getAttribute('data-bs-garden');
          const info = bsGardenOpening(nm, gn);
          setupDestinyCardForChar(nm, LOC_CHAR_AV[nm] || '', info.tag, info.prompt);
          openBsGarden(false);
          renderDestinyMainlines();
          /* 切到「单人命运主线」页签，让玩家看到已载入的箱庭开局 */
          const bar = shadow.getElementById('open-tabs-bar');
          if (bar) {
            const btn = bar.querySelector('.open-tab[data-open-pane="destiny"]');
            if (btn) btn.click();
          }
        });
      }
    }

    function bindBirthMap() {
      let dragMoved = 0;
      const vp = shadow.getElementById('birth-map-shell');
      const clr = shadow.getElementById('birth-clear');
      if (vp && vp.getAttribute('data-bound') !== '1') {
        vp.setAttribute('data-bound', '1');
        vp.addEventListener('click', function (ev) {
          if (dragMoved > 8) { dragMoved = 0; return; }   /* 拖拽结束后不误触发选点 */
          const tgt = ev.target;
          const sub = tgt && tgt.closest ? tgt.closest('.birth-sub') : null;
          if (sub) {
            const v = sub.getAttribute('data-sub');
            state.birthSub = (state.birthSub === v) ? '' : v;
            syncBirthSelection();
            refreshOpeningText(true);
            return;
          }
          if (tgt && tgt.closest && tgt.closest('.birth-zoom-btn')) return;
          const btn = tgt && tgt.closest ? tgt.closest('.birth-node') : null;
          if (!btn) return;
          const n = BIRTH_MAP.nodes.find(function (x) { return x.id === btn.getAttribute('data-node'); });
          if (!n || n.type === 'fog') return;
          if (state.birthPlace === n.name) { state.birthPlace = ''; state.birthSub = ''; }
          else { state.birthPlace = n.name; state.birthSub = ''; }
          syncBirthSelection();
          refreshOpeningText(true);
        });
      }
      const vport = shadow.getElementById('birth-viewport');
      if (vport && vport.getAttribute('data-panbound') !== '1') {
        vport.setAttribute('data-panbound', '1');
        const ptrs = new Map();
        let pinch0 = 0, pinchK0 = 1;
        const dist2 = function () {
          const a = Array.from(ptrs.values());
          return Math.sqrt(Math.pow(a[0].x - a[1].x, 2) + Math.pow(a[0].y - a[1].y, 2));
        };
        const mid2 = function () {
          const a = Array.from(ptrs.values());
          const r = vport.getBoundingClientRect();
          return { x: (a[0].x + a[1].x) / 2 - r.left, y: (a[0].y + a[1].y) / 2 - r.top };
        };
        vport.addEventListener('pointerdown', function (e) {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          const t = e.target;
          if (t && t.closest && (t.closest('.birth-node') || t.closest('.birth-chip') ||
              t.closest('.birth-zoom-btn') || t.closest('.birth-bs-btn') || t.closest('.bs-garden-overlay'))) return;
          ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
          try { vport.setPointerCapture(e.pointerId); } catch (_) {}
          if (ptrs.size === 1) {
            dragMoved = 0;
            birthView._sx = e.clientX; birthView._sy = e.clientY;
            birthView._tx = birthView.tx; birthView._ty = birthView.ty;
            vport.classList.add('dragging');
          } else if (ptrs.size === 2) {
            pinch0 = dist2(); pinchK0 = birthView.k;
          }
          e.preventDefault();
        });
        vport.addEventListener('pointermove', function (e) {
          if (!ptrs.has(e.pointerId)) return;
          ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (ptrs.size >= 2) {
            if (pinch0 > 0) {
              const d = dist2();
              const m = mid2();
              birthZoom(pinchK0 * (d / pinch0) / birthView.k, m.x, m.y);
            }
            return;
          }
          const dx = e.clientX - birthView._sx, dy = e.clientY - birthView._sy;
          dragMoved = Math.max(dragMoved, Math.abs(dx) + Math.abs(dy));
          birthView.tx = birthView._tx + dx;
          birthView.ty = birthView._ty + dy;
          applyBirthView();
        });
        const endPtr = function (e) {
          ptrs.delete(e.pointerId);
          try { vport.releasePointerCapture(e.pointerId); } catch (_) {}
          if (ptrs.size < 2) pinch0 = 0;
          if (ptrs.size === 0) vport.classList.remove('dragging');
          else if (ptrs.size === 1) {
            const p = Array.from(ptrs.values())[0];
            birthView._sx = p.x; birthView._sy = p.y;
            birthView._tx = birthView.tx; birthView._ty = birthView.ty;
          }
        };
        vport.addEventListener('pointerup', endPtr);
        vport.addEventListener('pointercancel', endPtr);
        vport.addEventListener('wheel', function (e) {
          const ov = shadow.getElementById('bs-garden-overlay');
          if (ov && ov.style.display !== 'none') return;   /* 箱庭开着时不缩背后的地图 */
          e.preventDefault();
          const r = vport.getBoundingClientRect();
          birthZoom(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX - r.left, e.clientY - r.top);
        }, { passive: false });
      }
      const zin = shadow.getElementById('birth-zoom-in');
      const zout = shadow.getElementById('birth-zoom-out');
      const zrst = shadow.getElementById('birth-zoom-reset');
      if (zin && zin.getAttribute('data-zb') !== '1') {
        zin.setAttribute('data-zb', '1'); zout.setAttribute('data-zb', '1'); zrst.setAttribute('data-zb', '1');
        zin.addEventListener('click', function (e) { e.stopPropagation(); birthZoom(1.25); });
        zout.addEventListener('click', function (e) { e.stopPropagation(); birthZoom(1 / 1.25); });
        zrst.addEventListener('click', function (e) { e.stopPropagation(); resetBirthView(); });
      }
      if (clr && clr.getAttribute('data-bound') !== '1') {
        clr.setAttribute('data-bound', '1');
        clr.addEventListener('click', function () {
          state.birthPlace = ''; state.birthSub = '';
          syncBirthSelection();
          refreshOpeningText(true);
        });
      }
    }

    bindOpenTabs();
    renderBirthMap();
    bindBirthMap();
    bindBsGarden();

    try {
      if (!shadow.__birthResize) {
        shadow.__birthResize = true;
        HW.addEventListener('resize', function () { fitBirthMap(); resetBirthView(); });
      }
    } catch (_) {}

    function syncPage4View() {
      const normalContainer = shadow.getElementById('normal-route-container');
      const academyContainer = shadow.getElementById('academy-route-container');
      if (!normalContainer || !academyContainer) return;

      const isAcademy = (state.mode === '学院模式');
      normalContainer.style.display = isAcademy ? 'none' : 'block';
      academyContainer.style.display = isAcademy ? 'block' : 'none';

      if (isAcademy) {
        renderAcademyClasses();
      }
    }
    function syncChapterPanels() {
      const freeBody = shadow.getElementById('chap-body-free');
      const freeHead = shadow.getElementById('chap-head-free');
      const freePanel = shadow.getElementById('chap-panel-free');
      const freeMark = freeHead ? freeHead.querySelector('.chap-panel-mark') : null;
      const isFreeUnlocked = (state.mode === '自由模式');
      const isFreeOpen = isFreeUnlocked && !!state.openChapters['自由模式章节'];

      if (freeBody) freeBody.hidden = !isFreeOpen;
      if (freeMark) freeMark.textContent = isFreeUnlocked ? (isFreeOpen ? '收起 ▴' : '展开 ▾') : '未开启（未选自由模式）';
      if (freeHead) { freeHead.classList.toggle('open', isFreeOpen); freeHead.disabled = !isFreeUnlocked; }
      if (freePanel) freePanel.classList.toggle('locked', !isFreeUnlocked);

      [['克蕾雅章节', 'kl', '克蕾雅剧情'], ['迷宫都市章节', 'lab', '迷宫都市剧情']].forEach(([key, tag, storyKey]) => {
        const body = shadow.getElementById('chap-body-' + tag);
        const head = shadow.getElementById('chap-head-' + tag);
        const panel = shadow.getElementById('chap-panel-' + tag);
        const mark = head ? head.querySelector('.chap-panel-mark') : null;
        const unlocked = !!state.stories[storyKey];
        const open = unlocked && !!state.openChapters[key];
        if (body) body.hidden = !open;
        if (mark) mark.textContent = unlocked ? (open ? '收起 ▴' : '展开 ▾') : '未开启（第二幕未勾选）';
        if (head) { head.classList.toggle('open', open); head.disabled = !unlocked; }
        if (panel) panel.classList.toggle('locked', !unlocked);
      });
      {
        const body = shadow.getElementById('chap-body-ke');
        const head = shadow.getElementById('chap-head-ke');
        const panel = shadow.getElementById('chap-panel-ke');
        const mark = head ? head.querySelector('.chap-panel-mark') : null;
        const gateLink = !!state.linkMode && !!state.linkChars['王逝-南境篇'];
        const unlocked = gateLink && !!state.stories['王逝剧情'];
        const open = unlocked && !!state.openChapters['王逝南境章节'];
        if (body) body.hidden = !open;
        if (mark) mark.textContent = unlocked
          ? (open ? '收起 ▴' : '展开 ▾')
          : (gateLink ? '未开启（第二幕未勾选「王逝剧情篇」）' : '未开启（第二幕未启用「王逝-南境篇」）');
        if (head) { head.classList.toggle('open', open); head.disabled = !unlocked; }
        if (panel) panel.classList.toggle('locked', !unlocked);
      }
      {
        const body = shadow.getElementById('chap-body-ij');
        const head = shadow.getElementById('chap-head-ij');
        const panel = shadow.getElementById('chap-panel-ij');
        const mark = head ? head.querySelector('.chap-panel-mark') : null;
        const gateLink = !!state.linkMode && !!state.linkChars['医术师-温伯格篇'];
        const unlocked = gateLink && !!state.stories['医术师剧情'];
        const open = unlocked && !!state.openChapters['医术师温伯格章节'];
        if (body) body.hidden = !open;
        if (mark) mark.textContent = unlocked
          ? (open ? '收起 ▴' : '展开 ▾')
          : (gateLink ? '未开启（第二幕未勾选「医术师篇」）' : '未开启（第二幕未启用「医术师-温伯格篇」）');
        if (head) { head.classList.toggle('open', open); head.disabled = !unlocked; }
        if (panel) panel.classList.toggle('locked', !unlocked);
      }
      {
        const body = shadow.getElementById('chap-body-pg');
        const head = shadow.getElementById('chap-head-pg');
        const panel = shadow.getElementById('chap-panel-pg');
        const mark = head ? head.querySelector('.chap-panel-mark') : null;
        const gateLink = !!state.linkMode && !!state.linkChars['祈愿诗篇-安纳托尔岛篇'];
        const unlocked = gateLink && !!state.stories['祈愿诗篇剧情'];
        const open = unlocked && !!state.openChapters['祈愿诗篇安纳托尔章节'];
        if (body) body.hidden = !open;
        if (mark) mark.textContent = unlocked
          ? (open ? '收起 ▴' : '展开 ▾')
          : (gateLink ? '未开启（第二幕未勾选「祈愿诗篇」）' : '未开启（第二幕未启用「祈愿诗篇-安纳托尔岛篇」）');
        if (head) { head.classList.toggle('open', open); head.disabled = !unlocked; }
        if (panel) panel.classList.toggle('locked', !unlocked);
      }
      if (!state.openingTouched) refreshOpeningText(true);
    }

    function updateShellBackground() {
      if (ROUTE_BGS[state.route]) {
        shell.style.setProperty('--bg-current', `url("${ROUTE_BGS[state.route]}")`);
      } else {
        shell.style.setProperty('--bg-current', `url("${DEFAULT_BG}")`);
      }
    }

    function goTo(target) {
      if (target < 0 || target > state.maxPage) return;
      if (target === 5 && typeof renderWcPanel === 'function') { try { renderWcPanel(); } catch (_) {} }
      state.page = target;
      shell.setAttribute('data-current-page', String(target));
      for (let i = 0; i <= state.maxPage; i++) {
        const p = shadow.getElementById('p-' + i);
        if (p) {
          if (i === target) p.classList.add('active');
          else p.classList.remove('active');
        }
      }

      /* 顶部 Stepper 导航条高亮同步 */
      const stepperNav = shadow.getElementById('stepper-nav');
      if (stepperNav) {
        stepperNav.querySelectorAll('.step-item').forEach((btn, idx) => {
          btn.classList.toggle('active', idx === target);
          btn.classList.toggle('completed', idx < target);
        });
      }

      const footer = shadow.getElementById('book-footer');
      footer.style.display = (target === 0) ? 'none' : 'flex';
      bindOpenTabs();
      renderBirthMap();
      bindBirthMap();
      bindBsGarden();
      syncPage4View(); syncChapterPanels(); syncSidePanels(); renderPureRoute(); renderLinkPage(); renderLinkStoryLine(); renderDestinyMainlines(); syncProtagonistView();

      shadow.getElementById('prev-btn').disabled = (target <= 0);
      shadow.getElementById('page-indicator').textContent = (target + 1) + ' / ' + (state.maxPage + 1);

      const nextBtn = shadow.getElementById('next-btn');
      const submitBtn = shadow.getElementById('submit-btn');
      if (target === state.maxPage) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        updateSummary();
      } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
      }
    }

    function findChapter(key) {
      return SPECIAL_CHAPTERS.find(c => c.key === key)
          || CANON_CHAPTERS.find(c => c.key === key)
          || null;
    }

    function buildFutaText() {
      const list = [...state.futaChars];
      const custom = state.futaCustom.trim();
      if (custom) list.push(custom);
      if (!list.length) return '';
      return 'futa设定：以下角色是 futa —— ' + list.join('、');
    }

    const LAB_CH_INTRO = {
      序章: '迷宫都市·序章开始',
      第一章: '迷宫都市第一章开始',
      第二章: '迷宫都市第二章开始',
      第三章: '迷宫都市第三章开始',
      第四章: '迷宫都市第四章开始',
      第五章: '迷宫都市第五章开始',
      第六章: '迷宫都市第六章开始',
      第七章: '迷宫都市第七章开始',
      第八章: '迷宫都市第八章开始',
      第九章: '迷宫都市第九章开始',
    };

    const KE_CHAPTERS = [
     {
      "key": "序章",
      "label": "序章：铁栏与法庭",
      "date": "1838年5月8日",
      "era": "神月历1838年5月"
     },
     {
      "key": "第一章",
      "label": "第一章：提亚拉与植物博士",
      "date": "1838年6月2日",
      "era": "神月历1838年6月"
     },
     {
      "key": "第二章",
      "label": "第二章：产场",
      "date": "1838年7月1日",
      "era": "神月历1838年7月"
     },
     {
      "key": "第三章",
      "label": "第三章：古伊奈的隐匿处",
      "date": "1838年8月3日",
      "era": "神月历1838年8月"
     },
     {
      "key": "第四章",
      "label": "第四章：超兽与圣魔法",
      "date": "1838年9月2日",
      "era": "神月历1838年9月"
     },
     {
      "key": "第五章",
      "label": "第五章：圣堂与旧友",
      "date": "1838年10月5日",
      "era": "神月历1838年10月"
     },
     {
      "key": "第六章",
      "label": "第六章：狱长、古城与王之纹章",
      "date": "1838年11月4日",
      "era": "神月历1838年11月"
     },
     {
      "key": "第七章",
      "label": "第七章：理想世界",
      "date": "1838年12月3日",
      "era": "神月历1838年12月"
     },
     {
      "key": "第八章",
      "label": "第八章：圣母与过去的自己",
      "date": "1839年1月7日",
      "era": "神月历1839年1月"
     },
     {
      "key": "最终章",
      "label": "最终章：使徒、灭器与大王",
      "date": "1839年2月5日",
      "era": "神月历1839年2-3月"
     }
    ];

    const KE_CH_INTRO = {};
    KE_CHAPTERS.forEach((c) => { KE_CH_INTRO[c.key] = '生成' + c.date + ' ' + c.label + ' 的开局'; });

    const IJ_CHAPTERS = [
     {
      "key": "序章",
      "label": "序章：袭击",
      "date": "1839年3月3日",
      "era": "神月历1839年3月"
     },
     {
      "key": "第一章",
      "label": "第一章：始点",
      "date": "1839年4月7日",
      "era": "神月历1839年4月"
     },
     {
      "key": "第二章",
      "label": "第二章：奥威尔堡的病变",
      "date": "1839年5月6日",
      "era": "神月历1839年5月"
     },
     {
      "key": "第三章",
      "label": "第三章：病变的脓疮",
      "date": "1839年6月5日",
      "era": "神月历1839年6月"
     },
     {
      "key": "第四章",
      "label": "第四章：病灶",
      "date": "1839年7月4日",
      "era": "神月历1839年7月"
     },
     {
      "key": "第五章",
      "label": "第五章：病巢",
      "date": "1839年8月8日",
      "era": "神月历1839年8月"
     },
     {
      "key": "第六章",
      "label": "第六章：尘归尘",
      "date": "1839年10月3日",
      "era": "神月历1839年10月"
     },
     {
      "key": "第七章",
      "label": "第七章：灰归灰",
      "date": "1839年11月7日",
      "era": "神月历1839年11月"
     },
     {
      "key": "第八章",
      "label": "第八章：梦之残骸",
      "date": "1840年1月6日",
      "era": "神月历1840年1月"
     },
     {
      "key": "最终章",
      "label": "最终章：为了明天",
      "date": "1840年2月4日",
      "era": "神月历1840年2-3月"
     }
    ];

    const IJ_CH_INTRO = {};
    IJ_CHAPTERS.forEach((c) => { IJ_CH_INTRO[c.key] = '生成' + c.date + ' ' + c.label + ' 的开局'; });

    const PG_CHAPTERS = [
     {
      "key": "序章",
      "label": "序章：漂流与检查",
      "date": "",
      "era": "第 0 ～ 2 天"
     },
     {
      "key": "第一章",
      "label": "第一章：港口城镇洛博特",
      "date": "",
      "era": "第 3 ～ 9 天"
     },
     {
      "key": "第二章",
      "label": "第二章：古里耶夫森林的幻水晶",
      "date": "",
      "era": "第 5 天日期事件"
     },
     {
      "key": "第三章",
      "label": "第三章：诺耶特树海的霞石",
      "date": "",
      "era": "第 10 天日期事件"
     },
     {
      "key": "第四章",
      "label": "第四章：高帕尔学园的学生会长选举",
      "date": "",
      "era": "第 10 ～ 20 天"
     },
     {
      "key": "第五章",
      "label": "第五章：同调——格力姆的记忆",
      "date": "",
      "era": "第 20 天日期事件"
     },
     {
      "key": "第六章",
      "label": "第六章：格里奇峡谷的翠炎",
      "date": "",
      "era": "中盘"
     },
     {
      "key": "第七章",
      "label": "第七章：通往戈尔修之路",
      "date": "",
      "era": "等级 39 门槛"
     },
     {
      "key": "第八章",
      "label": "第八章：背信者与「第一世代」",
      "date": "",
      "era": "真相线"
     },
     {
      "key": "第九章",
      "label": "第九章：波莫娜教会总部",
      "date": "",
      "era": "第 60 天日期事件 · 最终迷宫"
     },
     {
      "key": "最终章",
      "label": "最终章：祈祷",
      "date": "",
      "era": "第 80 天 · 最终决战"
     },
     {
      "key": "完结",
      "label": "完结：Last story",
      "date": "",
      "era": "END_A 之后 · DLC"
     }
    ];

    const PG_CH_INTRO = {};
    PG_CHAPTERS.forEach((c) => { PG_CH_INTRO[c.key] = '生成' + c.label + '（' + c.era + '）的开局'; });

    function buildOpeningText() {
      const parts = [];
      const hitRoute = state.route ? ALL_ROUTES.find(r => r.key === state.route) : null;

      // ── 核心规则：主开局正文只取单唯一来源，绝不叠加 ──
      let mainIntro = '';

      if (state.freeCustomKey === '✏️ 自定义开局' && state.customOpening) {
        // 0. 自定义开局拥有最高优先权：玩家手写的正文永不被覆盖
        mainIntro = state.customOpening;
      } else if (state.lastSelectedPrompt) {
        // 1. 用户最后点击的按钮（章节卡片、自由模式、命运主线）拥有绝对优先权
        mainIntro = state.lastSelectedPrompt;
      } else if (hitRoute && hitRoute.opening) {
        // 2. 败北支线
        mainIntro = hitRoute.opening;
      } else if (state.pgChapter && PG_CH_INTRO[state.pgChapter]) {
        // 3. 祈愿诗篇单章
        mainIntro = PG_CH_INTRO[state.pgChapter];
      } else if (state.ijChapter && IJ_CH_INTRO[state.ijChapter]) {
        // 4. 医术师单章
        mainIntro = IJ_CH_INTRO[state.ijChapter];
      } else if (state.keChapter && KE_CH_INTRO[state.keChapter]) {
        // 5. 王逝单章
        mainIntro = KE_CH_INTRO[state.keChapter];
      } else if (state.mode === '剧情模式') {
        if (state.chapter) {
          const ch = findChapter(state.chapter);
          if (ch && ch.opening) mainIntro = ch.opening;
        } else if (state.labChapter && LAB_CH_INTRO[state.labChapter]) {
          mainIntro = LAB_CH_INTRO[state.labChapter] + '：生成伊莉丝在迷宫都市推进「' + state.labChapter + '」的开局';
        }
      } else if (state.mode === '自由模式') {
        const freeOp = FREE_OPENINGS.find(o => o.key === state.freeCustomKey) || FREE_OPENINGS[1];
        if (freeOp && freeOp.opening) mainIntro = freeOp.opening;
      } else if (state.mode === '学院模式') {
        /* 6. 学院模式：按所选区块（A/B/C/D、教职员室、学生会）生成编成开局 */
        const acaCls = ACADEMY_CLASSES.find(c => c.id === state.academyClassId) || ACADEMY_CLASSES[0];
        const acaCh = acaCls.chars.find(ch => ('char_' + ch.name) === state.academyItemKey) || null;
        mainIntro = krsAcademyOpening(acaCls, acaCh);
      }

      if (mainIntro) parts.push(mainIntro);
      /* 出生地（地图选择）：选了才追加，且只在【完全自由】页签生效 */
      if (state.birthPlace && state.openTab === 'free') {
        parts.push('【开局地点】' + state.birthPlace + (state.birthSub ? '·' + state.birthSub : ''));
      }

      // futa 设定按需追加在末尾
      const futa = buildFutaText();
      if (futa) parts.push(futa);

      return parts.join('\n\n');
    }

    function refreshOpeningText(force) {
      if (!force && state.openingTouched) return;
      state.openingText = buildOpeningText();
      state.openingTouched = false;
      const input = shadow.getElementById('opening-input');
      if (input) input.value = state.openingText;
    }

    function updateFutaSummary() {
      const box = shadow.getElementById('futa-summary');
      if (!box) return;
      const list = [...state.futaChars];
      const custom = state.futaCustom.trim();
      if (custom) list.push(custom);
      if (!list.length) {
        box.textContent = '尚未选择任何角色';
        box.classList.add('empty');
      } else {
        box.textContent = 'futa设定：以下角色是 futa —— ' + list.join('、');
        box.classList.remove('empty');
      }
    }

    /* ── 学院模式：写进开局设定里的入学编成摘要 ── */
    function krsAcademyBrief() {
      if (state.mode !== '学院模式') return null;
      const cls = ACADEMY_CLASSES.find((c) => c.id === state.academyClassId) || ACADEMY_CLASSES[0];
      const ch = cls.chars.find((x) => ('char_' + x.name) === state.academyItemKey);
      const lines = [
        '',
        '【学院模式 · 入学编成】',
        '分区：' + cls.name + '（' + cls.badge + '）',
        ch ? '本轮重点对手戏：' + ch.name + '（' + ch.role + '）' : null,
        /* 刻意不在这里枚举本区成员、也不列教职配置，并且不在这里重复世界书里的活动／委托机制：
           这些字一旦进正文，就会被世界书的关键词扫描命中，把对应条目一次性拉进首轮提示词。
           名单、教职与卡片机制全部只留在世界书里。 */
        '本区其余成员、教职配置与各自身份，一律以世界书 <学院模式·势力总表与人物置籍> 为准，不要在正文里逐个点名。',
        '学籍口径：{{user}}的学籍落在「潘多拉学院 ' + cls.name + '」；年级与年龄脱钩，只按实技评级与在籍资历裁定。',
        '运行边界：外部主线一律不推进，只作为背景存在；一切课业、社交与校内事务按世界书〈学院模式〉条目照常运行。',
        '这些编成只是在学院模式下追加的位置，任何人原本的人设、经历与关系都不得改写。'
      ];
      return lines.filter((l) => l !== null && l !== undefined).join('\n');
    }

    function composeText() {
      const futaList = [...state.futaChars];
      const custom = state.futaCustom.trim();
      if (custom) futaList.push(custom);

      const goldText = (state.gold && state.gold.trim() !== '' && state.gold !== '根据人设') ? state.gold.trim() : '根据人设背景合理设定';
      const powerText = (state.power && state.power.trim() !== '') ? state.power.trim() : '根据人设背景合理设定';

      const lines = [
        '【开局设定 · 命运之书】',
        '',
        '本局的模式、篇章、具体章节、进度、日期、视角与支线，已由命运之书直接写入你收到的当前状态。',
        '请一律以当前状态里的现值为准：不要根据下面这段文字重新推断这些字段，也不要在正文里复述它们。',
        '',
        '【开局设定】',
        (state.openingText ? state.openingText : '（未填写，请按当前状态里的篇章与日期自行发挥）'),
        '',
        '【设定之外、需要你自行判断的字段】',
        '开局金币：' + goldText,
        '开局战力：' + powerText,
        '自称：' + (state.name || '（未填写）'),
        (state.gender === '无' ? null : '前世性别：' + state.gender),
        '本世来历：' + (state.past || '（非穿越者）'),
        (state.view === '外来者' && state.customCompanions.some(c => c.登场 !== false) ? '开局同行身旁的角色：\n' + state.customCompanions.filter(c => c.登场 !== false && c.姓名).map(c => {
          const powerDesc = (c.战力水平 !== '' && c.战力水平 !== undefined) ? (isNaN(Number(c.战力水平)) ? c.战力水平 : `${c.战力水平}阶`) : '根据人设背景设定';
          const intimacyDesc = (c.亲密程度 !== '' && c.亲密程度 !== undefined) ? c.亲密程度 : '根据人设背景设定';
          const attrDesc = (c.性吸引力 !== '' && c.性吸引力 !== undefined) ? c.性吸引力 : '根据人设背景设定';

          let line = `· 【${c.姓名}】 身份：${c.身份 || '未知'}，与你关系：${c.关系 || '同伴'}，战力：${powerDesc}，初始亲密：${intimacyDesc}，性吸引力：${attrDesc}`;
          if (c.命运主线) line += `；【命运主线】：该角色背负的核心命运为「${c.命运主线}」`;
          if (c.来历) line += `；人设与生平：${c.来历}`;
          return line;
        }).join('\n') : null),
        (state.view === '外来者' && state.userSkills.length ? '掌握技能：' + state.userSkills.filter(s => s.名称).map(s => `${s.名称}(${s.流派},熟练度${s.熟练度})`).join('、') : null),
        (state.view === '外来者' && state.userTraits.length ? '个人特性：' + state.userTraits.filter(t => t.名称).map(t => `${t.名称}[${t.分类}]`).join('、') : null),
        (state.view === '外来者' && state.userAssets.length ? '持有资产：' + state.userAssets.filter(a => a.名称).map(a => `${a.名称}(${a.类型},${a.规模}阶)`).join('、') : null),
        (futaList.length ? 'futa设定：' + futaList.join('、') + ' 是 futa' : null),
        krsAcademyBrief(),
        wcBrief(),
        '',
        '【写作要求】',
        '· 不要复述这张设定表；严格按照<角色对话格式>直接写正文。',
        (state.route ? '· 当前缠绕的支线见当前状态里的 /剧情/支线，请按该支线的「每轮压力」在背后持续施压。' : null),
        (state.view === '克蕾雅'
          ? '· 视点为「克蕾雅」：{{user}}即是克蕾雅本人，按照克蕾雅的性格写她的台词、动作、决定或内心独白；把选择摆到她面前然后停住。'
          : (state.view === '伊莉丝'
            ? '· 视点为「伊莉丝」：{{user}}即是伊莉丝本人，按伊莉丝的性格写她的台词、动作、决定与内心独白；'
            : '· 视点为「外来者」：{{user}}并非任意现有角色，是独立的人；按{{user}}的设定更新用户状态，人称始终绑在{{user}}上')),
        (futaList.length ? '· futa 设定：' + futaList.join('、') + ' 同时具有男性与女性生殖器，请在正文中自然体现这一点。' : null),
        '',
        '【输出格式要求】',
        '只输出纯文本小说正文，直接开始描写场景和对话。',
        '严禁在回复中出现任何设定表、补丁代码、JSON 代码块、系统说明或系统指令。'
      ];
      return lines.filter(l => l !== null && l !== undefined && l !== false).join('\n');
    }

    function updateSummary() {
      const tb = shadow.getElementById('confirm-table');
      if (!tb) return;
      tb.innerHTML = '';
      const opText = state.openingText
        ? (state.openingText.length > 50 ? state.openingText.slice(0, 50) + '…' : state.openingText)
        : '（未填写）';
      const futaList = [...state.futaChars];
      const custom = state.futaCustom.trim();
      if (custom) futaList.push(custom);
      const futaText = futaList.length ? futaList.join('、') : '无';
      const items = [
        ['视点模式', state.view === '克蕾雅' ? '克蕾雅（玩家即主角）' : (state.view === '伊莉丝' ? '伊莉丝（远侧主角）' : '外来者（克蕾雅为 NPC）')],
        ['开局金币', state.gold && state.gold.trim() !== '' && state.gold !== '根据人设' ? state.gold : '根据人设'],
        ['开局战力', state.power && state.power.trim() !== '' ? state.power : '根据人设'],
        ['今生自称', state.name],
        ['前世性别', state.gender === '无' ? '无（不发送）' : state.gender + '性'],
        ['本世来历', state.past || '（未填写，默认为非穿越者）'],
        ['同行角色', state.view === '外来者' ? (state.customCompanions.filter(c => c.登场 !== false && c.姓名).map(c => c.姓名).join('、') || '独自一人') : '原著主角既定配置'],
        ['运行模式', state.mode || '未选择'],
        ['学院编成', state.mode === '学院模式'
          ? (((ACADEMY_CLASSES.find((c) => c.id === state.academyClassId) || ACADEMY_CLASSES[0]).name)
            + (state.academyCharName ? '·' + state.academyCharName : ''))
          : '—'],
        ['开局设定', opText],
        ['缠绕支线', state.route ? (IRIS_ROUTES.some(r => r.key === state.route) ? '伊莉丝·' : '克蕾雅·') + state.route : '无（纯净主线）'],
        ['futa设定', futaText],
        ['联动角色', state.linkMode ? Object.keys(state.linkChars).filter(k => state.linkChars[k]).join('、') || '无' : '已关闭'],
        ['启用篇章角色', KRS_WORKS.filter((w) => state.works[w.key]).map((w) => w.label).join('、')],
        ['剧情线', STORIES.filter((st) => state.stories[st.key]).map((st) => st.label).join('、') || '无'],
        ['联动世界剧情', LINK_STORIES.filter((st) => state.stories[st.key]).map((st) => st.label).join('、') || '无'],
        ['王逝章节', state.stories['王逝剧情'] ? (state.keChapter || '序章') : '—'],
        ['医术师章节', state.stories['医术师剧情'] ? (state.ijChapter || '序章') : '—'],
        ['祈愿诗篇章节', state.stories['祈愿诗篇剧情'] ? (state.pgChapter || '序章') : '—'],
        ['克蕾雅章节', state.mode === '剧情模式' ? (state.chapter || (state.stories['克蕾雅剧情'] ? '序章' : '—')) : '—'],
        ['迷宫都市章节', state.mode === '剧情模式' ? (state.labChapter || (state.stories['迷宫都市剧情'] ? '序章' : '—')) : '—'],
      ];
      items.forEach(([k, v]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td>' + k + '</td><td>' + v + '</td>';
        tb.appendChild(tr);
      });
      shadow.getElementById('preview-box').textContent = composeText();
    }

    

    /* 联动角色页渲染与绑定（上下两级架构） */
    function renderLinkPage() {
      const masterBtn = shadow.getElementById('link-master-btn');
      const avatarBox = shadow.getElementById('link-avatars-box');
      const expBox = shadow.getElementById('link-expansions-box');
      const detailBox = shadow.getElementById('link-detail-box');
      
      if (!masterBtn || !avatarBox || !detailBox) return;

      masterBtn.textContent = state.linkMode ? '联 动 角 色：已开启' : '联 动 角 色：已关闭';
      masterBtn.className = 'link-top-btn' + (state.linkMode ? ' on' : '');

      if (state.linkMode) {
        avatarBox.style.display = 'flex';
        if (expBox) expBox.style.display = 'grid';
        detailBox.style.display = 'flex';
        
        if (!state.currentLinkChar || !LINKED_CONFIG[state.currentLinkChar]) {
          state.currentLinkChar = Object.keys(LINKED_CONFIG)[0];
        }

        // 角色名单分区定义
        const SINGLE_CHARS = ['响木天音', '托莉娜', '芙洛蒂', '艾妮希雅', '夏洛特', '一之濑雫'];
        const EXPANSIONS = ['祈愿诗篇-安纳托尔岛篇', '医术师-温伯格篇', '王逝-南境篇', 'BS2-残片篇', '摇篮-格拉提亚篇'];

        // 1. 渲染上部：单人联动（保持精致圆形）
        avatarBox.innerHTML = '';
        SINGLE_CHARS.forEach(charName => {
          const data = LINKED_CONFIG[charName];
          if (!data) return;
          const isEnabled = !!state.linkChars[charName];
          const isActive = state.currentLinkChar === charName;
          
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'link-avatar-btn' + (isEnabled ? ' on' : '') + (isActive ? ' active' : '');
          btn.innerHTML = `
            <img src="${data.avatar}" alt="${charName}">
            <span class="link-badge">${isEnabled ? '✓ 启用' : '未启用'}</span>
          `;
          btn.onclick = () => {
            state.currentLinkChar = charName;
            renderLinkPage();
          };
          avatarBox.appendChild(btn);
        });

        // 2. 渲染下部：重大扩展（带封面的方形大卡片按钮）
        if (expBox) {
          expBox.innerHTML = '';
          EXPANSIONS.forEach(charName => {
            const data = LINKED_CONFIG[charName];
            if (!data) return;
            const isEnabled = !!state.linkChars[charName];
            const isActive = state.currentLinkChar === charName;

            const card = document.createElement('div');
            card.className = 'link-exp-card' + (isEnabled ? ' on' : '') + (isActive ? ' active' : '');
            card.style.backgroundImage = `url('${data.bigImg || data.avatar}')`;

            const subChars = EXPANSION_SUB_CHARS[charName] || [];
            const subCharHtml = subChars.map(sc => `
              <div class="link-exp-char-avatar" title="${sc.name} · ${sc.title}" data-subchar="${sc.name}">
                <img src="${sc.avatar}" alt="${sc.name}">
              </div>
            `).join('');

            card.innerHTML = `
              <div class="link-exp-body">
                <span class="link-exp-title">${charName}</span>
                <span class="link-exp-badge">${isEnabled ? '✓ 已启用' : '未启用'}</span>
              </div>
              <div class="link-exp-chars">
                <span style="font-size: 11px; color: #bbb; z-index: 1;">核心角色：</span>
                ${subCharHtml}
              </div>
            `;

            // 点击卡片主体切换该篇章宏观介绍
            card.onclick = (e) => {
              const charEl = e.target.closest('.link-exp-char-avatar');
              if (charEl) {
                // 点击了具体角色小头像：在下方展示角色立绘与介绍
                e.stopPropagation();
                const scName = charEl.dataset.subchar;
                const scData = subChars.find(x => x.name === scName);
                if (scData) {
                  card.querySelectorAll('.link-exp-char-avatar').forEach(a => a.classList.toggle('selected', a.dataset.subchar === scName));
                  shadow.getElementById('link-big-img').src = scData.bigImg || scData.avatar;
                  shadow.getElementById('link-name').textContent = scData.name + ' · ' + scData.title;
                  shadow.getElementById('link-bg').textContent = scData.desc;
                  shadow.getElementById('link-now').textContent = '隶属于【' + charName + '】世界观体系。';
                  shadow.getElementById('link-world-change').textContent = data.worldChange || '';
                  return;
                }
              }
              state.currentLinkChar = charName;
              renderLinkPage();
            };
            expBox.appendChild(card);
          });
        }

        // 3. 渲染详情区
        const data = LINKED_CONFIG[state.currentLinkChar];
        const isEnabled = !!state.linkChars[state.currentLinkChar];
        
        shadow.getElementById('link-big-img').src = data.bigImg;
        shadow.getElementById('link-name').textContent = state.currentLinkChar;
        
        // 动态注入随行角色小圆头像（小忆 / 赛蕾姆丝）
        const subSlot = shadow.getElementById('link-subchar-slot');
        if (subSlot) {
          if (data.subChar) {
            subSlot.innerHTML = `
              <div class="link-subchar-pill" title="${data.subChar.label}：${data.subChar.name}">
                <div class="link-subchar-avatar">
                  <img src="${data.subChar.avatar}" alt="${data.subChar.name}">
                </div>
                <span class="link-subchar-text">${data.subChar.label}:<strong>${data.subChar.name}</strong></span>
              </div>
            `;
          } else {
            subSlot.innerHTML = '';
          }
        }

        shadow.getElementById('link-bg').textContent = data.bg;
        shadow.getElementById('link-now').textContent = data.now;
        shadow.getElementById('link-world-change').textContent = data.worldChange || '暂无世界改动。';

        // 渲染世界书更改标签列表
        const tagsBox = shadow.getElementById('link-wb-tags');
        if (tagsBox) {
          const list = Array.isArray(data.wbEntries) ? data.wbEntries : (data.tags || []);
          tagsBox.innerHTML = list.map(t => `<span class="link-wb-tag">${t}</span>`).join('');
        }

        // 控制封存变暗样式
        detailBox.classList.toggle('sealed', !isEnabled);

        // 渲染顶部启用按钮
        const toggleBtn = shadow.getElementById('link-toggle-btn');
        toggleBtn.textContent = isEnabled ? '✓ 已启用（点击取消）' : '+ 启用该角色';
        toggleBtn.style.background = isEnabled ? 'rgba(201,165,78,0.4)' : 'rgba(20,16,28,0.8)';
        toggleBtn.style.border = isEnabled ? '1px solid #ffffff' : '1px dashed #c9a54e';
        toggleBtn.style.color = isEnabled ? '#ffffff' : '#c9a54e';
        toggleBtn.style.boxShadow = isEnabled ? '0 0 12px rgba(201,165,78,0.6)' : 'none';
        
        toggleBtn.onclick = () => {
          state.linkChars[state.currentLinkChar] = !state.linkChars[state.currentLinkChar];
          renderLinkPage();
          renderLinkStoryLine();
          syncChapterPanels();
          renderDestinyMainlines();
          refreshOpeningText(true);
          updateSummary();
          syncWorks();
        };
      } else {
        avatarBox.style.display = 'none';
        if (expBox) expBox.style.display = 'none';
        detailBox.style.display = 'none';
      }
    }

    shadow.getElementById('link-master-btn').onclick = () => {
      state.linkMode = !state.linkMode;
      renderLinkPage();
      renderLinkStoryLine();
      syncChapterPanels();
      renderDestinyMainlines();
      refreshOpeningText(true);
      updateSummary();
      syncWorks();
    };

    shadow.getElementById('btn-open-book').onclick = () => goTo(1);
    // 顶部 Stepper 导航条点击直接自由跳转
    const stepperNav = shadow.getElementById('stepper-nav');
    if (stepperNav) {
      stepperNav.querySelectorAll('.step-item').forEach(btn => {
        btn.onclick = () => {
          const target = Number(btn.dataset.toPage);
          if (!isNaN(target)) goTo(target);
        };
      });
    }
    shadow.getElementById('prev-btn').onclick = () => goTo(state.page - 1);
    shadow.getElementById('next-btn').onclick = () => goTo(state.page + 1);
    const backCoverBtn = shadow.getElementById('back-cover-btn');
    if (backCoverBtn) backCoverBtn.onclick = () => goTo(0);

    shadow.getElementById('chap-head-free').onclick = () => {
      if (state.mode !== '自由模式') return;
      state.openChapters['自由模式章节'] = !state.openChapters['自由模式章节'];
      syncChapterPanels();
    };
    shadow.getElementById('chap-head-kl').onclick = () => {
      if (!state.stories['克蕾雅剧情']) return;
      state.openChapters['克蕾雅章节'] = !state.openChapters['克蕾雅章节'];
      syncChapterPanels();
    };
    shadow.getElementById('chap-head-lab').onclick = () => {
      if (!state.stories['迷宫都市剧情']) return;
      state.openChapters['迷宫都市章节'] = !state.openChapters['迷宫都市章节'];
      syncChapterPanels();
    };
    shadow.getElementById('chap-head-ke').onclick = () => {
      if (!state.stories['王逝剧情']) return;
      state.openChapters['王逝南境章节'] = !state.openChapters['王逝南境章节'];
      syncChapterPanels();
    };
    shadow.getElementById('chap-head-ij').onclick = () => {
      if (!state.stories['医术师剧情']) return;
      state.openChapters['医术师温伯格章节'] = !state.openChapters['医术师温伯格章节'];
      syncChapterPanels();
    };
    shadow.getElementById('chap-head-pg').onclick = () => {
      if (!state.stories['祈愿诗篇剧情']) return;
      state.openChapters['祈愿诗篇安纳托尔章节'] = !state.openChapters['祈愿诗篇安纳托尔章节'];
      syncChapterPanels();
    };

    /* ── 提前定义 syncSprite，加上严格空指针容错 ── */
    function syncSprite() {
      const sp = shadow.getElementById('claire-sprite');
      if (!sp) return;
      const img = sp.querySelector('img');
      const nm = sp.querySelector('.sprite-name');
      const note = sp.querySelector('.sprite-note');
      if (state.view === '伊莉丝') {
        if (img) img.src = IRIS_SPRITE;
        if (nm) nm.textContent = '伊 莉 丝';
        if (note) note.textContent = '你就是她 · 远侧的执行者';
      } else {
        if (img) img.src = CLAIRE_SPRITE;
        if (nm) nm.textContent = '克 蕾 雅';
        if (note) note.textContent = '你就是她 · 转生者本人';
      }
      if (state.view === '外来者') sp.classList.add('hidden');
      else sp.classList.remove('hidden');
    }

    /* ── 视点卡片绑定与切换逻辑（彻底解决穿透与状态同步） ── */
    function viewAllowed(vKey) { 
      if (vKey !== '伊莉丝') return true;
      return !!(state.works && state.works['迷宫都市篇']);
    }

    function switchViewMode(targetView) {
      if (targetView === '伊莉丝' && !viewAllowed('伊莉丝')) {
        alert('「伊莉丝」视点需要先在第一页启用「迷宫都市篇」！');
        return;
      }

      state.view = targetView;
      if (targetView === '克蕾雅') state.name = '克蕾雅';
      else if (targetView === '伊莉丝') state.name = '伊莉丝';
      else if (targetView === '外来者') {
        const outInput = shadow.getElementById('outlander-name');
        state.name = outInput ? outInput.value.trim() : '';
      }

      // 1. 刷新按钮的高亮选中态
      const btnOut = shadow.getElementById('btn-view-outlander');
      const btnClaire = shadow.getElementById('btn-view-claire');
      const btnIris = shadow.getElementById('btn-view-iris');

      if (btnOut) btnOut.classList.toggle('active', state.view === '外来者');
      if (btnClaire) btnClaire.classList.toggle('active', state.view === '克蕾雅');
      if (btnIris) {
        btnIris.classList.toggle('active', state.view === '伊莉丝');
        btnIris.classList.toggle('disabled', !viewAllowed('伊莉丝'));
      }

      // 2. 显隐两套面板
      const canonPanel = shadow.getElementById('canon-protagonist-panel');
      const outlanderPanel = shadow.getElementById('outlander-workbench');
      const noticeText = shadow.getElementById('canon-notice-text');
      const descCanon = shadow.getElementById('canon-protagonist-desc');
      
      const isOutlander = (state.view === '外来者');
      if (outlanderPanel) outlanderPanel.style.setProperty('display', isOutlander ? 'flex' : 'none', 'important');
      if (canonPanel) canonPanel.style.setProperty('display', isOutlander ? 'none' : 'block', 'important');

      if (!isOutlander) {
        if (noticeText) noticeText.innerHTML = `<span>✦ 你就是原著主角本人：${state.view}</span>`;
        if (descCanon) {
          descCanon.textContent = state.view === '克蕾雅'
            ? '你就是恶役千金克蕾雅本人！公爵千金的财富、礼仪修养与王都魔导学籍已由世界书内置设定完整支持，已为你隐藏繁琐的自定义分配面板。'
            : '你就是灭魔圣女伊莉丝本人！背负吸血鬼化诅咒的孤高圣女，教会配给与佩剑战力由世界书内置支持，已为你隐藏繁琐的自定义分配面板。';
        }
      }

      // 3. 立绘与总结联动
      try { syncSprite(); } catch(_) {}
      try { updateSummary(); } catch(_) {}
    }

    function bindViewCards() {
      ['btn-view-outlander', 'btn-view-claire', 'btn-view-iris'].forEach(id => {
        const el = shadow.getElementById(id);
        if (!el) return;
        el.onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          const target = el.getAttribute('data-view-btn');
          if (target) switchViewMode(target);
        };
      });
    }

    function syncProtagonistView() {
      bindViewCards();
      switchViewMode(state.view || '外来者');
    }

    function syncViewChips() {
      bindViewCards();
      switchViewMode(state.view || '外来者');
    }

    /* ── 集成化标签页与滑轨舞台渲染逻辑（同伴/技能/特性/资产） ── */
    let editingCompIdx = -1; // -1 表示新建，>=0 表示编辑

    function renderCompanionsList() {
      const list = shadow.getElementById('comp-roster-list');
      const countEl = shadow.getElementById('outlander-comp-count');
      if (countEl) {
        const activeCount = state.customCompanions.filter(c => c.登场 !== false).length;
        countEl.textContent = `${activeCount}/${state.customCompanions.length}`;
      }
      if (!list) return;

      if (!state.customCompanions || state.customCompanions.length === 0) {
        list.innerHTML = '<div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:18px;">名册为空，点击右上角登记一名同伴</div>';
        return;
      }

      list.innerHTML = state.customCompanions.map((comp, idx) => {
        const isPresent = comp.登场 !== false;
        return `
          <div class="comp-card ${isPresent ? 'active' : ''}">
            <div class="comp-card-main">
              <div class="comp-card-title">
                <span>${comp.姓名 || '无名同行者'}</span>
                <span class="comp-tag">${comp.身份 || '同伴'}</span>
                <span class="comp-tag" style="color:var(--krs-gold);">战力：${comp.战力水平 !== '' && comp.战力水平 !== undefined ? (isNaN(Number(comp.战力水平)) ? comp.战力水平 : comp.战力水平 + '阶') : '根据人设'}</span>
              </div>
              <div class="comp-card-sub">
                关系：${comp.关系 || '同伴'} ｜ 亲密：${comp.亲密程度 !== '' && comp.亲密程度 !== undefined ? comp.亲密程度 : '根据人设'} ｜ 吸引力：${comp.性吸引力 !== '' && comp.性吸引力 !== undefined ? comp.性吸引力 : '根据人设'}
              </div>
            </div>
            <div class="comp-card-actions">
              <button type="button" class="comp-btn-toggle ${isPresent ? 'active' : ''}" data-toggle-comp="${idx}">
                ${isPresent ? '✓ 本次登场' : '✕ 暂不登场'}
              </button>
              <button type="button" class="comp-btn-action" data-edit-comp="${idx}">改</button>
              <button type="button" class="comp-btn-action comp-btn-del" data-del-comp="${idx}">删</button>
            </div>
          </div>
        `;
      }).join('');

      list.querySelectorAll('[data-toggle-comp]').forEach(btn => {
        btn.onclick = () => {
          const idx = Number(btn.dataset.toggleComp);
          state.customCompanions[idx].登场 = !(state.customCompanions[idx].登场 !== false);
          renderCompanionsList();
          updateSummary();
          persistCurrentState();
        };
      });

      list.querySelectorAll('[data-edit-comp]').forEach(btn => {
        btn.onclick = () => {
          const idx = Number(btn.dataset.editComp);
          openCompanionForm(idx);
        };
      });

      list.querySelectorAll('[data-del-comp]').forEach(btn => {
        btn.onclick = () => {
          const idx = Number(btn.dataset.delComp);
          if (confirm(`确定要从名册中删除同伴「${state.customCompanions[idx].姓名}」吗？`)) {
            state.customCompanions.splice(idx, 1);
            renderCompanionsList();
            updateSummary();
            persistCurrentState();
          }
        };
      });
    }

    function openCompanionForm(idx) {
      const formBox = shadow.getElementById('comp-form-box');
      const formTitle = shadow.getElementById('comp-form-title');
      if (!formBox) return;
      editingCompIdx = idx;

      if (idx >= 0) {
        const c = state.customCompanions[idx];
        if (formTitle) formTitle.textContent = `✦ 修改同伴资料：${c.姓名}`;
        shadow.getElementById('comp-in-name').value = c.姓名 || '';
        shadow.getElementById('comp-in-rel').value = c.关系 || '';
        shadow.getElementById('comp-in-ident').value = c.身份 || '';
        shadow.getElementById('comp-in-power').value = c.战力水平 !== undefined ? c.战力水平 : '';
        shadow.getElementById('comp-in-intimacy').value = c.亲密程度 !== undefined ? c.亲密程度 : '';
        shadow.getElementById('comp-in-attr').value = c.性吸引力 !== undefined ? c.性吸引力 : '';
        shadow.getElementById('comp-in-destiny').value = c.命运主线 || '';
        shadow.getElementById('comp-in-desc').value = c.来历 || '';
      } else {
        if (formTitle) formTitle.textContent = '✦ 登记开局身旁角色';
        ['comp-in-name', 'comp-in-rel', 'comp-in-ident', 'comp-in-power', 'comp-in-intimacy', 'comp-in-attr', 'comp-in-destiny', 'comp-in-desc'].forEach(id => {
          const el = shadow.getElementById(id); if (el) el.value = '';
        });
      }
      formBox.style.display = 'flex';
      shadow.getElementById('comp-in-name').focus();
    }

    let activeSkIdx = 0;
    let activeTrIdx = 0;
    let activeAsIdx = 0;

    function renderSkillsList() {
      const slider = shadow.getElementById('skills-slider-bar');
      const stage = shadow.getElementById('skills-stage-detail');
      const count = shadow.getElementById('outlander-sk-count');
      if (count) count.textContent = state.userSkills.length;
      if (!slider || !stage) return;

      if (state.userSkills.length === 0) {
        slider.innerHTML = '';
        stage.innerHTML = '<div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:20px;">暂无修行技能，点击右上角按钮添加。</div>';
        return;
      }
      if (activeSkIdx >= state.userSkills.length) activeSkIdx = 0;

      slider.innerHTML = state.userSkills.map((sk, idx) => `
        <button type="button" class="wb-pill-item ${idx === activeSkIdx ? 'active' : ''}" data-pick-sk="${idx}">
          <span>⚔️</span>
          <b>${sk.名称 || '未命名技能'}</b>
          <span style="font-size:11px; opacity:0.7;">[${sk.流派 || '其他'}]</span>
        </button>
      `).join('');

      slider.querySelectorAll('[data-pick-sk]').forEach(btn => {
        btn.onclick = () => { activeSkIdx = Number(btn.dataset.pickSk); renderSkillsList(); };
      });

      const curSk = state.userSkills[activeSkIdx];
      stage.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="font-size:13px; font-weight:700; color:var(--krs-gold);">配置技能 #${activeSkIdx + 1}</span>
          <button type="button" class="wb-item-del-btn" id="del-cur-sk">删除此技能</button>
        </div>
        <div class="wb-grid-3">
          <div class="form-row stack"><label>技能名称</label><input type="text" id="cur-sk-name" value="${curSk.名称 || ''}" placeholder="如：迅捷突刺"></div>
          <div class="form-row stack"><label>所属流派</label><input type="text" id="cur-sk-style" value="${curSk.流派 || ''}" placeholder="如：剑术、火魔导"></div>
          <div class="form-row stack"><label>熟练度 (0~999)</label><input type="number" id="cur-sk-prof" value="${curSk.熟练度 !== undefined && curSk.熟练度 !== '' ? curSk.熟练度 : ''}" placeholder="如：0~999" min="0" max="999"></div>
        </div>
        <div class="form-row stack"><label>招式效果与介绍</label><input type="text" id="cur-sk-desc" value="${curSk.介绍 || ''}" placeholder="对敌招式与威能详细描述..."></div>
        <div class="form-row stack"><label>提升突破方法</label><input type="text" id="cur-sk-up" value="${curSk.提升方法 || ''}" placeholder="如：经由实战挥剑千次..."></div>
      `;

      shadow.getElementById('cur-sk-name').oninput = (e) => { curSk.名称 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-sk-style').oninput = (e) => { curSk.流派 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-sk-prof').oninput = (e) => { curSk.熟练度 = Number(e.target.value) || 0; updateSummary(); };
      shadow.getElementById('cur-sk-desc').oninput = (e) => { curSk.介绍 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-sk-up').oninput = (e) => { curSk.提升方法 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('del-cur-sk').onclick = () => {
        state.userSkills.splice(activeSkIdx, 1);
        activeSkIdx = 0;
        renderSkillsList();
        updateSummary();
      };
    }

    function renderTraitsList() {
      const slider = shadow.getElementById('traits-slider-bar');
      const stage = shadow.getElementById('traits-stage-detail');
      const count = shadow.getElementById('outlander-tr-count');
      if (count) count.textContent = state.userTraits.length;
      if (!slider || !stage) return;

      if (state.userTraits.length === 0) {
        slider.innerHTML = '';
        stage.innerHTML = '<div style="color:var(--font-dim); font-size:12px; text-align:center; padding:20px;">暂无固有特性，点击右上角按钮添加。</div>';
        return;
      }
      if (activeTrIdx >= state.userTraits.length) activeTrIdx = 0;

      slider.innerHTML = state.userTraits.map((tr, idx) => `
        <button type="button" class="wb-pill-item ${idx === activeTrIdx ? 'active' : ''}" data-pick-tr="${idx}">
          <span>✨</span>
          <b>${tr.名称 || '未命名特性'}</b>
          <span style="font-size:11px; opacity:0.7;">[${tr.分类 || '体质'}]</span>
        </button>
      `).join('');

      slider.querySelectorAll('[data-pick-tr]').forEach(btn => {
        btn.onclick = () => { activeTrIdx = Number(btn.dataset.pickTr); renderTraitsList(); };
      });

      const curTr = state.userTraits[activeTrIdx];
      stage.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="font-size:13px; font-weight:700; color:var(--krs-gold);">配置特性 #${activeTrIdx + 1}</span>
          <button type="button" class="wb-item-del-btn" id="del-cur-tr">删除此特性</button>
        </div>
        <div class="wb-grid-2">
          <div class="form-row stack"><label>特性名称</label><input type="text" id="cur-tr-name" value="${curTr.名称 || ''}" placeholder="如：抗毒体质、恶魔血脉"></div>
          <div class="form-row stack"><label>分类（体质/魔术/技巧/血脉/诅咒/加护）</label><input type="text" id="cur-tr-cat" value="${curTr.分类 || ''}" placeholder="如：体质·常驻 / 魔术"></div>
        </div>
        <div class="form-row stack"><label>详细描述与影响</label><input type="text" id="cur-tr-desc" value="${curTr.描述 || ''}" placeholder="特性效果或背景缘由..."></div>
      `;

      shadow.getElementById('cur-tr-name').oninput = (e) => { curTr.名称 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-tr-cat').oninput = (e) => { curTr.分类 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-tr-desc').oninput = (e) => { curTr.描述 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('del-cur-tr').onclick = () => {
        state.userTraits.splice(activeTrIdx, 1);
        activeTrIdx = 0;
        renderTraitsList();
        updateSummary();
      };
    }

    function renderAssetsList() {
      const slider = shadow.getElementById('assets-slider-bar');
      const stage = shadow.getElementById('assets-stage-detail');
      const count = shadow.getElementById('outlander-as-count');
      if (count) count.textContent = state.userAssets.length;
      if (!slider || !stage) return;

      if (state.userAssets.length === 0) {
        slider.innerHTML = '';
        stage.innerHTML = '<div style="color:var(--krs-dim); font-size:12px; text-align:center; padding:20px;">暂无资产产业，点击右上角购置登记。</div>';
        return;
      }
      if (activeAsIdx >= state.userAssets.length) activeAsIdx = 0;

      slider.innerHTML = state.userAssets.map((as, idx) => `
        <button type="button" class="wb-pill-item ${idx === activeAsIdx ? 'active' : ''}" data-pick-as="${idx}">
          <span>🏛️</span>
          <b>${as.名称 || '未命名资产'}</b>
          <span style="font-size:11px; opacity:0.7;">[${as.类型 || '家'}, 阶${as.规模 || 1}]</span>
        </button>
      `).join('');

      slider.querySelectorAll('[data-pick-as]').forEach(btn => {
        btn.onclick = () => { activeAsIdx = Number(btn.dataset.pickAs); renderAssetsList(); };
      });

      const curAs = state.userAssets[activeAsIdx];
      stage.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="font-size:13px; font-weight:700; color:var(--krs-gold);">配置资产 #${activeAsIdx + 1}</span>
          <button type="button" class="wb-item-del-btn" id="del-cur-as">变卖/移除资产</button>
        </div>
        <div class="wb-grid-3">
          <div class="form-row stack"><label>资产名称</label><input type="text" id="cur-as-name" value="${curAs.名称 || ''}" placeholder="如：西区红砖公寓"></div>
          <div class="form-row stack"><label>类型（家/经营/制造/领地）</label><input type="text" id="cur-as-type" value="${curAs.类型 || ''}" placeholder="如：家 / 经营 / 工坊"></div>
          <div class="form-row stack"><label>规模阶数 (1~8)</label><input type="number" id="cur-as-scale" value="${curAs.规模 !== undefined && curAs.规模 !== '' ? curAs.规模 : ''}" placeholder="1~8阶" min="1" max="8"></div>
        </div>
        <div class="wb-grid-2">
          <div class="form-row stack"><label>坐落位置</label><input type="text" id="cur-as-pos" value="${curAs.位置 || ''}" placeholder="如：王都西区"></div>
          <div class="form-row stack"><label>运转状态</label><input type="text" id="cur-as-status" value="${curAs.状态 || ''}" placeholder="如：完好 / 破损废弃"></div>
        </div>
        <div class="form-row stack"><label>周期产出</label><input type="text" id="cur-as-prod" value="${curAs.产出 || ''}" placeholder="如：无稳定产出 / 每月 50 G"></div>
      `;

      shadow.getElementById('cur-as-name').oninput = (e) => { curAs.名称 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-as-type').oninput = (e) => { curAs.类型 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-as-scale').oninput = (e) => { curAs.规模 = Number(e.target.value) || 1; updateSummary(); };
      shadow.getElementById('cur-as-pos').oninput = (e) => { curAs.位置 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-as-status').oninput = (e) => { curAs.状态 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('cur-as-prod').oninput = (e) => { curAs.产出 = e.target.value.trim(); updateSummary(); };
      shadow.getElementById('del-cur-as').onclick = () => {
        state.userAssets.splice(activeAsIdx, 1);
        activeAsIdx = 0;
        renderAssetsList();
        updateSummary();
      };
    }

    // 绑定子选项卡切换与新增按钮
    function bindOutlanderInputs() {
      // 选项卡切换
      shadow.querySelectorAll('.wb-sub-tab').forEach(tab => {
        tab.onclick = () => {
          const target = tab.dataset.subpane;
          shadow.querySelectorAll('.wb-sub-tab').forEach(t => t.classList.toggle('active', t === tab));
          shadow.querySelectorAll('.wb-sub-pane').forEach(p => p.classList.toggle('active', p.id === `pane-wb-${target}`));
        };
      });

      const bind = (id, fn) => {
        const el = shadow.getElementById(id);
        if (el) el.oninput = (e) => { fn(e.target.value.trim()); updateSummary(); };
      };
      bind('outlander-name', v => { state.name = v; });
      bind('outlander-identity', v => { state.userExtra.身份 = v; });
      bind('outlander-power', v => { state.power = v; });
      bind('outlander-gold', v => { state.gold = v; });
      bind('outlander-outfit', v => { state.userExtra.服装 = v; });
      bind('outlander-body-status', v => { state.userExtra.身体状态 = v; });
      bind('outlander-reputation', v => { state.userExtra.风评 = v; });
      bind('outlander-contract', v => { state.userExtra.契约 = v; });

      // 同伴名册表单开关与保存
      const btnToggleComp = shadow.getElementById('btn-toggle-comp-form');
      if (btnToggleComp) btnToggleComp.onclick = () => openCompanionForm(-1);
      const btnCancelComp = shadow.getElementById('btn-cancel-comp-form');
      if (btnCancelComp) btnCancelComp.onclick = () => {
        const formBox = shadow.getElementById('comp-form-box');
        if (formBox) formBox.style.display = 'none';
      };
      const btnSaveComp = shadow.getElementById('btn-save-comp');
      if (btnSaveComp) btnSaveComp.onclick = () => {
        const name = shadow.getElementById('comp-in-name').value.trim();
        if (!name) { alert('请填写同伴姓名！'); return; }
        const powerVal = shadow.getElementById('comp-in-power').value.trim();
        const intimacyVal = shadow.getElementById('comp-in-intimacy').value.trim();
        const attrVal = shadow.getElementById('comp-in-attr').value.trim();

        const item = {
          姓名: name,
          登场: true,
          关系: shadow.getElementById('comp-in-rel').value.trim(),
          身份: shadow.getElementById('comp-in-ident').value.trim(),
          // 允许保存用户填写的自定义文本（如“高阶法师”），若填的是纯数字则记录纯数字；留空则存空字符串
          战力水平: powerVal,
          亲密程度: intimacyVal,
          性吸引力: attrVal,
          命运主线: shadow.getElementById('comp-in-destiny').value.trim(),
          来历: shadow.getElementById('comp-in-desc').value.trim()
        };
        if (editingCompIdx >= 0) {
          state.customCompanions[editingCompIdx] = Object.assign(state.customCompanions[editingCompIdx], item);
        } else {
          state.customCompanions.push(item);
        }
        const formBox = shadow.getElementById('comp-form-box');
        if (formBox) formBox.style.display = 'none';
        renderCompanionsList();
        updateSummary();
        persistCurrentState();
      };

      ['skill', 'trait', 'asset'].forEach(function (k) {
        const b = shadow.getElementById('btn-preset-' + k);
        if (b && b.getAttribute('data-bound') !== '1') {
          b.setAttribute('data-bound', '1');
          b.onclick = function (e) { e.stopPropagation(); openPresetPanel(k); };
        }
      });
      const btnSkill = shadow.getElementById('btn-add-skill');
      if (btnSkill) btnSkill.onclick = () => {
        state.userSkills.push({ 名称: '', 流派: '', 熟练度: '', 介绍: '', 提升方法: '' });
        activeSkIdx = state.userSkills.length - 1;
        renderSkillsList();
        updateSummary();
      };
      const btnTrait = shadow.getElementById('btn-add-trait');
      if (btnTrait) btnTrait.onclick = () => {
        state.userTraits.push({ 名称: '', 分类: '', 描述: '' });
        activeTrIdx = state.userTraits.length - 1;
        renderTraitsList();
        updateSummary();
      };
      const btnAsset = shadow.getElementById('btn-add-asset');
      if (btnAsset) btnAsset.onclick = () => {
        state.userAssets.push({ 名称: '', 类型: '', 规模: '', 位置: '', 状态: '', 产出: '' });
        activeAsIdx = state.userAssets.length - 1;
        renderAssetsList();
        updateSummary();
      };
    }

    /* 性别（外来者面板与原著主角面板双向同步） */
    function syncGenderChips() {
      ['gender-chips', 'gender-chips-canon'].forEach(id => {
        const box = shadow.getElementById(id);
        if (!box) return;
        box.innerHTML = '';
        ['男', '女', '无'].forEach(g => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'btn-chip' + (state.gender === g ? ' selected' : '');
          b.textContent = g;
          b.onclick = () => {
            state.gender = g;
            syncGenderChips();
            updateSummary();
          };
          box.appendChild(b);
        });
      });
    }
    syncGenderChips();

    

    const pastInput = shadow.getElementById('past-input');
    if (pastInput) {
      pastInput.addEventListener('input', (e) => {
        state.past = e.target.value.trim();
        updateSummary();
      });
    }

    /* 渲染折叠面板 */
    const freeOpeningsBox = shadow.getElementById('free-openings-box');
    const chapBox = shadow.getElementById('chapters-box');
    const labChapBox = shadow.getElementById('lab-chapter-box2');
    const keChapBox = shadow.getElementById('ke-chapter-box');
    const ijChapBox = shadow.getElementById('ij-chapter-box');
    const pgChapBox = shadow.getElementById('pg-chapter-box');

    // 全局同步所有卡片的选中态与显式角标，杜绝暗中注入幽灵变量
    function syncAllChapterCards() {
      if (freeOpeningsBox) {
        freeOpeningsBox.querySelectorAll('.chap-card').forEach(b => {
          b.classList.toggle('selected', state.freeCustomKey === b.dataset.chapKey);
        });
      }
      /* 分类栏上标出「哪个分类里有已选预设」 */
      const railEl = shadow.getElementById('free-menu-rail');
      if (railEl) {
        railEl.querySelectorAll('.free-rail-btn').forEach(b => {
          const g = b.dataset.freeGroup;
          const hit = (g === '✏️ 自定义开局')
            ? state.freeCustomKey === '✏️ 自定义开局'
            : FREE_OPENINGS.some(o => freeGroupOf(o) === g && o.key === state.freeCustomKey);
          b.classList.toggle('has-pick', hit);
        });
      }
      if (chapBox) {
        chapBox.querySelectorAll('.chap-card').forEach(b => {
          b.classList.toggle('selected', state.chapter === b.dataset.chapKey);
        });
      }
      if (labChapBox) {
        labChapBox.querySelectorAll('.chap-card').forEach(b => {
          b.classList.toggle('selected', state.labChapter === b.dataset.chapKey);
        });
      }
      if (keChapBox) {
        keChapBox.querySelectorAll('.chap-card').forEach(b => {
          b.classList.toggle('selected', state.keChapter === b.dataset.chapKey);
        });
      }
      if (ijChapBox) {
        ijChapBox.querySelectorAll('.chap-card').forEach(b => {
          b.classList.toggle('selected', state.ijChapter === b.dataset.chapKey);
        });
      }
      if (pgChapBox) {
        pgChapBox.querySelectorAll('.chap-card').forEach(b => {
          b.classList.toggle('selected', state.pgChapter === b.dataset.chapKey);
        });
      }
    }

    // 补全兼容清理函数，消除点击报错
    function clearChapterSelection() {
      syncAllChapterCards();
    }

    /* ── 自由开局预设：左侧「世界 · 地点」分类栏 + 右侧卡片列表 ── */
    let activeFreeGroup = null;

    const CUSTOM_GROUP = '✏️ 自定义开局';
    let activeCustomIdx = -1;

    function freeGroupOf(op) { return op.group || '其他开局'; }

    /* ⚠ 放在这里而不是 renderFreeOpenings 前面：那一段会被整块替换掉 */
    function freeGroupList() {
      const gs = [];
      FREE_OPENINGS.forEach(op => { const g = freeGroupOf(op); if (gs[gs.length - 1] !== g) gs.push(g); });
      return gs;
    }

    /* 自定义开局：预设库（可存多条）+ 编辑器。正文存本地，点地图只追加【开局地点】，绝不覆盖正文 */
    function renderCustomOpening() {
      const box = freeOpeningsBox;
      if (!box) return;
      box.innerHTML = '';   /* 必须清空：本函数会被直接调用，不清会叠层并重复绑定事件 */
      const using = state.freeCustomKey === CUSTOM_GROUP;
      const lib = state.customOpenings || [];
      if (typeof activeCustomIdx !== 'number' || activeCustomIdx >= lib.length) activeCustomIdx = lib.length ? 0 : -1;

      const wrap = document.createElement('div');
      wrap.className = 'free-custom-wrap';
      wrap.innerHTML =
        '<p class="free-custom-hint">在这里写你自己的开局正文，可以<b>存成多条预设</b>随时切换。'
        + '点「使用这段开局」之后，<b>点地图上任何地点都不会覆盖它</b>，只会在提示词里追加一行「【开局地点】X」。'
        + '预设保存在本地（换浏览器或清缓存会丢）。</p>'
        + '<div class="free-custom-lib">'
        +   '<div class="free-custom-lib-head">'
        +     '<span>我的自定义开局（' + lib.length + '）</span>'
        +     '<button type="button" class="free-custom-mini" id="free-custom-new">＋ 新建</button>'
        +     '<button type="button" class="free-custom-mini" id="free-custom-del">🗑 删除</button>'
        +   '</div>'
        +   '<div class="free-custom-chips" id="free-custom-chips">'
        +     (lib.length
                 ? lib.map(function (it, i2) {
                     return '<button type="button" class="free-custom-chip' + (i2 === activeCustomIdx ? ' active' : '')
                       + '" data-ci="' + i2 + '">' + String(it.name).replace(/</g, '&lt;') + '</button>';
                   }).join('')
                 : '<span class="free-custom-empty">还没有保存的自定义开局，写一段后点「存为新预设」。</span>')
        +   '</div>'
        + '</div>'
        + '<div class="free-custom-namerow" id="free-custom-namerow" style="display:none;">'
        +   '<input type="text" class="free-custom-name" id="free-custom-name" placeholder="给这条开局起个名字，如：房车环游世界">'
        +   '<button type="button" class="free-custom-btn primary" id="free-custom-saveas">保存</button>'
        +   '<button type="button" class="free-custom-btn" id="free-custom-cancelas">取消</button>'
        + '</div>'
        + '<textarea class="free-custom-text" id="free-custom-text" '
        + 'placeholder="例：你在一辆魔力太阳能房车里醒来，车顶集能板还在咔哒作响，窗外是完全陌生的森林……"></textarea>'
        + '<div class="free-custom-actions">'
        +   '<button type="button" class="free-custom-btn primary" id="free-custom-use">✓ 使用这段开局</button>'
        +   '<button type="button" class="free-custom-btn" id="free-custom-save">💾 存为新预设</button>'
        +   '<button type="button" class="free-custom-btn" id="free-custom-clear">✕ 清空编辑区</button>'
        +   '<span class="free-custom-state" id="free-custom-state">' + (using ? '● 当前正在使用自定义开局' : '') + '</span>'
        + '</div>';
      box.appendChild(wrap);

      const ta = shadow.getElementById('free-custom-text');
      const nameInput = shadow.getElementById('free-custom-name');
      const nameRow = shadow.getElementById('free-custom-namerow');
      const say = function (t) { const el = shadow.getElementById('free-custom-state'); if (el) el.textContent = t; };

      if (ta) {
        ta.value = (activeCustomIdx >= 0 && lib[activeCustomIdx]) ? lib[activeCustomIdx].text : (state.customOpening || '');
        ta.addEventListener('input', function () {
          /* 只更新草稿：不改写已有预设。要保存改动请点「使用这段开局」，或切换预设时自动提交 */
          state.customOpening = ta.value;
          if (state.freeCustomKey === CUSTOM_GROUP) refreshOpeningText(true);
        });
      }
      /* 切换预设 */
      (shadow.getElementById('free-custom-chips') || { querySelectorAll: function () { return []; } })
        .querySelectorAll('[data-ci]').forEach(function (b) {
          b.onclick = function () {
            const i2 = Number(b.dataset.ci);
            if (activeCustomIdx >= 0 && lib[activeCustomIdx] && ta) lib[activeCustomIdx].text = ta.value;
            activeCustomIdx = i2;
            persistCurrentState();
            renderCustomOpening();
          };
        });
      const btnNew = shadow.getElementById('free-custom-new');
      if (btnNew) btnNew.onclick = function () {
        activeCustomIdx = -1;
        if (ta) ta.value = '';
        state.customOpening = '';
        renderCustomOpening();
        const t2 = shadow.getElementById('free-custom-text');
        if (t2) t2.focus();
      };
      const btnDel = shadow.getElementById('free-custom-del');
      if (btnDel) btnDel.onclick = function () {
        if (activeCustomIdx < 0 || !lib[activeCustomIdx]) { say('● 当前没有选中任何预设'); return; }
        lib.splice(activeCustomIdx, 1);
        activeCustomIdx = lib.length ? 0 : -1;
        persistCurrentState();
        renderCustomOpening();
      };
      const btnSave = shadow.getElementById('free-custom-save');
      if (btnSave) btnSave.onclick = function () {
        /* 脱离当前选中：存的是「新的一条」，绝不覆盖已有预设 */
        activeCustomIdx = -1;
        persistCurrentState();
        if (nameRow) nameRow.style.display = 'flex';
        if (nameInput) { nameInput.value = (activeCustomIdx >= 0 && lib[activeCustomIdx]) ? lib[activeCustomIdx].name : ''; nameInput.focus(); }
      };
      const btnCancel = shadow.getElementById('free-custom-cancelas');
      if (btnCancel) btnCancel.onclick = function () { if (nameRow) nameRow.style.display = 'none'; };
      const btnSaveAs = shadow.getElementById('free-custom-saveas');
      if (btnSaveAs) btnSaveAs.onclick = function () {
        const txt = ta ? ta.value : '';
        if (!txt.trim()) { say('● 编辑区是空的，先写点内容'); return; }
        const nm = (nameInput && nameInput.value.trim()) || ('自定义开局 ' + (lib.length + 1));
        lib.push({ name: nm, text: txt });
        activeCustomIdx = lib.length - 1;
        state.customOpening = txt;
        persistCurrentState();
        renderCustomOpening();
        say('● 已存为「' + nm + '」');
      };
      const btnUse = shadow.getElementById('free-custom-use');
      if (btnUse) btnUse.onclick = function () {
        const txt = ta ? ta.value : '';
        state.customOpening = txt;
        if (activeCustomIdx >= 0 && lib[activeCustomIdx]) lib[activeCustomIdx].text = txt;
        persistCurrentState();
        state.freeCustomKey = CUSTOM_GROUP;
        state.route = '';
        state.lastSelectedPrompt = txt;
        syncAllChapterCards();
        clearAllRouteSelections();
        renderPureRoute();
        renderBirthMap();
        refreshOpeningText(true);
        updateSummary();
        renderFreeOpenings();
      };
      const btnClr = shadow.getElementById('free-custom-clear');
      if (btnClr) btnClr.onclick = function () {
        if (ta) ta.value = '';
        state.customOpening = '';
        persistCurrentState();
        if (state.freeCustomKey === CUSTOM_GROUP) {
          state.freeCustomKey = '';
          state.lastSelectedPrompt = '';
          refreshOpeningText(true);
        }
        renderFreeOpenings();
      };
    }


    /* ═══════════ 世界风云（可选的世界危机）═══════════ */
    const WC_PHASES = [
      ['Ⅰ', '前兆', '异象初现，只有边地的猎人、矿工与教会巡察提起过。世上多数人还不知道。'],
      ['Ⅱ', '蔓延', '魔物开始进攻边陲村庄。各国把它当成局部的魔物潮，仍未重视。'],
      ['Ⅲ', '边境沦陷', '魔物屠戮所有边境集镇。难民开始向内陆迁徙，商路第一次中断。'],
      ['Ⅳ', '割据', '驿道与海路都不安全，各国自顾不暇。同盟名存实亡，物价开始失控。'],
      ['Ⅴ', '沦城', '第一座中型城市失守。教会宣布神谕失灵，信仰开始崩坏。'],
      ['Ⅵ', '崩解', '两大国之一半境易手。王都开始征召未成年，贵族先一步把家眷送走。'],
      ['Ⅶ', '围城', '首都圈被围。粮价与人心一起崩，城内先死于秩序而不是魔物。'],
      ['Ⅷ', '灭国', '一国彻底覆灭。幸存者组成流亡军，但已经不知道该往哪里去。'],
      ['Ⅸ', '长夜', '最后防线失守，圣遗物封印全线告急。所有谈判与算计都不再有意义。'],
      ['Ⅹ', '终局', '世界生灵涂炭。即便此刻「胜利」，也没有任何意义。'],
    ];

    const WC_PRESETS = [
      { key: 'blank', name: '', blank: true,
        label: '空白 · 自定义', tag: '默认',
        intro: '不套预设，全部字段自己填。' },
      { key: 'kailaniesi', name: '恶神凯拉涅斯正式苏醒', tag: '王都 · 中央帝国',
        intro: '恶神正式苏醒，正在世界各地大范围制造魔物，摧毁世界。',
        goal: '只有前往世界各地重新封印五处圣遗物，才能重新封印恶神凯拉涅斯。',
        progress: '已封印圣遗物 0/5',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 魔物开始进攻边陲村庄。',
        nextPhase: '（倒计时 7 日后）阶段Ⅲ 魔物屠戮所有边境集镇。',
        worldImpact: '温伯格帝国 · 已丢失诸多边境城市；中央帝国 · 诸多难民涌入首都，医疗系统不堪重负。',
        countdown: '倒计时 7 日' },
      { key: 'wangshi', name: '南境 · 王逝的魔物大潮复苏', tag: '南境',
        intro: '南境地下的封印彻底松动，十年前被压下去的魔物大潮重新涌出，旧拉修赫特的绝地开始向外扩张。',
        goal: '重新封住南境地脉上的三处裂口，并把「灭器」从大王手里夺回来。',
        progress: '已封住裂口 0/3',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 魔物大潮冲出绝地，南境边村接连失守，流亡军开始北撤。',
        nextPhase: '（倒计时 10 日后）阶段Ⅲ 魔物潮越过南境山脉，第一座帝国南部城市告急。',
        worldImpact: '南境 · 旧拉修赫特全境沦为绝地，流亡军挤在边境；中央帝国 · 南部三个伯爵领开始征召农奴。',
        countdown: '倒计时 10 日' },
      { key: 'beijing', name: '北境 · 兽化黑泥入侵潮', tag: '北境 · 温伯格',
        intro: '温伯格北端的坠落物开始活跃，被它接触过的活人会缓慢兽化，最终融成黑色泥流，向北境城镇蔓延。',
        goal: '找到坠落物的核心并把它封回地底，同时拦住已经兽化的整条村镇链。',
        progress: '已净化兽化村镇 0/6',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 黑泥沿河谷南下，奥威尔堡外围的矿工村整村兽化。',
        nextPhase: '（倒计时 5 日后）阶段Ⅲ 黑泥抵达奥威尔堡城墙，城内开始清洗「疑似兽化者」。',
        worldImpact: '温伯格帝国 · 北境三座矿镇失联，教会宣布兽化者是「失恩者」拒绝施救；中央帝国 · 紧急关闭北向关隘。',
        countdown: '倒计时 5 日' },
      { key: 'bs2', name: 'BS2 · 箱庭碰撞与世界漏洞', tag: '边陲 · BS2',
        intro: '崩坏的箱庭再次撞上潘多拉，世界之间的「漏洞」被撕开，碎片世界开始主动入侵。',
        goal: '找到并封住正在扩大的三处世界漏洞，阻止碎片世界把潘多拉吞进箱庭。',
        progress: '已封住漏洞 0/3',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 漏洞边缘开始渗出不属于本世界的规则，附近的动植物出现童话化畸变。',
        nextPhase: '（倒计时 7 日后）阶段Ⅲ 第一个碎片世界整体降临，把一整座城镇覆盖成箱庭的一角。',
        worldImpact: '边陲 · 迷宫都市阿萨伊拉姆外围出现无法解释的地形替换；中央帝国 · 元老院宣布漏洞区为禁地并封锁消息。',
        countdown: '倒计时 7 日' },
      { key: 'shengyiwu', name: '中央帝国 · 圣遗物封印崩解', tag: '王都 · 中央帝国',
        intro: '支撑大陆的五处圣遗物封印正在一处接一处崩解，每崩一处，世界本身就更薄一分。',
        goal: '在五处封印全部崩解之前把它们重新加固，代价是需要献上同等的「存在」。',
        progress: '已重新加固 0/5',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 第二处封印出现裂痕，周边地区的魔素浓度翻倍，魔物开始变异。',
        nextPhase: '（倒计时 14 日后）阶段Ⅲ 第二处封印崩解，一整片天空开始出现「空白」。',
        worldImpact: '中央帝国 · 教会封锁了封印地的消息，却开始征收「献祭名册」；各国 · 魔素浓度上升导致农业歉收。',
        countdown: '倒计时 14 日' },
      { key: 'cradle', name: '摇篮 · 纺线者之森的失控', tag: '摇篮地带 · 西陲',
        intro: '纺线者之森里编制命运的纺线断了，被织出来的东西开始自己往下拆，整个西陲的因果都在解线。',
        goal: '找回断掉的那几根主线，重新把西陲的命运织回去。',
        progress: '已接回纺线 0/4',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 恩惠之城格拉提亚周边开始出现「被织掉」的人——存在过，但谁都不记得。',
        nextPhase: '（倒计时 12 日后）阶段Ⅲ 伏沦岭整片山区从记录中被抹去，官道尽头变成空白。',
        worldImpact: '摇篮地带 · 格拉提亚自治议会失效，人们开始主动遗忘以避免被织掉；中央帝国 · 派去的巡察使一去不回。',
        countdown: '倒计时 12 日' },
      { key: 'east', name: '东境 · 灰疫与难民潮', tag: '东境 · 联合王国',
        intro: '联合王国东岸开始流行一种把魔力抽干的灰疫，患者会缓慢石化，疫区正随难民一路向内陆扩散。',
        goal: '找到灰疫的源头并造出解药，同时拦住已经失控的难民潮。',
        progress: '已封锁疫区 0/4',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 灰疫越过国境线，联合王国开始焚烧整座村庄以阻断传播。',
        nextPhase: '（倒计时 6 日后）阶段Ⅲ 灰疫进入中央帝国东部，教会宣布患者为「不洁」并当场净化。',
        worldImpact: '联合王国 · 东岸三座港口城市封港，贸易中断；中央帝国 · 东部边境建起隔离墙，墙外难民以万计。',
        countdown: '倒计时 6 日' },
      { key: 'anatol', name: '安纳托尔孤岛 · 深海之物上浮', tag: '海外 · 安纳托尔',
        intro: '孤岛外海有某种东西正在上浮，它一靠近，岛上的魔法就变得廉价的、失控的、不属于人的。',
        goal: '在它完全浮出水面之前，把岛上的「祭」重新做完。',
        progress: '已完成祭仪 0/5',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 近海渔获开始长出不该有的器官，岛上出生的孩子全都带着同一张脸。',
        nextPhase: '（倒计时 9 日后）阶段Ⅲ 那东西露出海面，整座岛的昼夜开始错乱。',
        worldImpact: '安纳托尔 · 波莫娜教把上浮之物奉为新神，魔法师公会失去对委托的控制；本国 · 彻底切断与孤岛的航线。',
        countdown: '倒计时 9 日' },
      { key: 'asylum', name: '迷宫都市 · 永夜降临', tag: '边陲 · 迷宫都市',
        intro: '迷宫都市上空的「太阳」熄了，整座城陷入永夜，迷宫里的东西开始往地面上走。',
        goal: '下到迷宫最底层，把熄灭的那个东西重新点亮。',
        progress: '已下潜 0 层',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 永夜第三日，地面上的作物停止生长，城内开始有人自愿走进迷宫。',
        nextPhase: '（倒计时 8 日后）阶段Ⅲ 迷宫的东西成群上到地面，城区开始被逐条街吞掉。',
        worldImpact: '边陲 · 迷宫都市与外界彻底断联，逃出的人带出「太阳死了」的消息；中央帝国 · 把边陲划为弃土。',
        countdown: '倒计时 8 日' },
      { key: 'kelvis', name: '凯尔维斯孤岛 · 圣域封锁', tag: '海外 · 凯尔维斯',
        intro: '圣域对外封闭了，圣光不再外流——而潘多拉大陆上所有靠圣光维持的东西，正在一并失效。',
        goal: '打开圣域的封锁，或者找到不依赖圣光的替代。',
        progress: '已重开圣域门 0/3',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 各地的治愈术开始失灵，教会第一次无法解释「神为什么不回应」。',
        nextPhase: '（倒计时 7 日后）阶段Ⅲ 圣光彻底中断，所有神圣系封印同时开始松动。',
        worldImpact: '凯尔维斯 · 圣域封锁岛岸，无人能进；中央帝国 · 教会权威崩塌，各地开始私设神龛。',
        countdown: '倒计时 7 日' },
      { key: 'faction_west', name: '西境 · 戴尔王国的王位空悬', tag: '西境 · 戴尔王国',
        intro: '戴尔王国的王位空悬，美吉斯塔的贵族把王国内战打成了引狼入室，各方开始把魔物当军队用。',
        goal: '在王国被彻底撕碎之前，让王位有一个所有人都能接受的名字。',
        progress: '已取得贵族支持 0/5',
        phase: 'Ⅱ',
        phaseImpact: '阶段Ⅱ 内战双方开始雇魔族佣兵，西境村庄被当成消耗品反复易手。',
        nextPhase: '（倒计时 11 日后）阶段Ⅲ 一支魔族军团被请进王都，美吉斯塔陷落。',
        worldImpact: '戴尔王国 · 全境进入内战，粮道断绝；中央帝国 · 陈兵西境边界，名义上是「维和」。',
        countdown: '倒计时 11 日' },
    ];

    function wcBrief() {
      const w = state.worldCrisis || {};
      /* 未启用就完全不发这一段：正文里不留任何世界风云的痕迹。
         规则本身在世界书 [mvu_update]世界风云 条目里，而那条在未启用时是禁用的。 */
      if (!w.on) return null;
      const ph = (w.phase || 'Ⅰ');
      const nm = (WC_PHASES.find(function (x) { return x[0] === ph; }) || ['', '', ''])[1];
      /* 只给字段值。推进规则、阶段含义、映射速查全在世界书 [mvu_update]世界风云 条目里，
         放到开局提示词里只会让 AI 把这段指导文字当正文复述出来。 */
      return ['', '【世界风云 · 本局启用】',
        '名称：' + (w.name || '（未填写）'),
        '介绍：' + (w.intro || '（未填写）'),
        '解决目标：' + (w.goal || '（未填写）'),
        '我方进展：' + (w.progress || '（未填写）'),
        '当前阶段：' + ph + '（' + nm + '）',
        '阶段影响：' + (w.phaseImpact || '（未填写）'),
        '次阶段：' + (w.nextPhase || '（未填写）'),
        '对世界影响：' + (w.worldImpact || '（未填写）'),
        (w.countdown ? '倒计时：' + w.countdown : null)
      ].filter(function (l) { return l !== null; }).join('\n');
    }

    function renderWcPanel() {
      const stage = shadow.getElementById('wc-stage');
      const master = shadow.getElementById('wc-toggle');
      const w = state.worldCrisis;
      if (master) {
        master.textContent = w.on ? '世 界 风 云：已开启' : '世 界 风 云：未开启';
        master.className = 'link-top-btn' + (w.on ? ' on' : '');
      }
      if (!stage) return;
      if (!w.on) {
        stage.innerHTML = '<div class="wc-off-hint">未开启时，本局不存在世界级危机，'
          + 'AI 也不会自行制造灭国／灭世级别的灾难。<br>'
          + '点上方按钮开启后，可以选一个预设，或者从空白开始自己写。</div>';
        return;
      }
      const phaseOpts = WC_PHASES.map(function (p) {
        return '<option value="' + p[0] + '"' + (w.phase === p[0] ? ' selected' : '') + '>'
          + p[0] + ' · ' + p[1] + '</option>';
      }).join('');
      const cur = WC_PHASES.filter(function (p) { return p[0] === w.phase; })[0] || WC_PHASES[0];
      const curKey = state.wcPresetKey || (w.name ? '' : 'blank');
      stage.innerHTML =
        '<div class="wc-preset-block">'
        + '<div class="wc-preset-head">✦ 风云预设 · 按地区各一套（第一条是空白自定义）</div>'
        + '<div class="wc-preset-grid">'
        + WC_PRESETS.map(function (p) {
            return '<button type="button" class="wc-preset-card' + (curKey === p.key ? ' active' : '')
              + '" data-wc-preset="' + p.key + '">'
              + '<div class="wc-preset-top"><b>' + (p.label || p.name) + '</b>'
              + (p.tag ? '<span class="wc-preset-tag">' + p.tag + '</span>' : '') + '</div>'
              + '<div class="wc-preset-desc">' + (p.intro || '') + '</div></button>';
          }).join('')
        + '</div></div>'
        + '<div class="wc-fields">'
        + '<div class="wb-grid-2">'
        +   '<div class="field-box"><div class="field-label">风云名称</div>'
        +     '<input type="text" id="wc-name" value="' + String(w.name).replace(/"/g, '&quot;') + '" placeholder="如：凯拉涅斯正式苏醒"></div>'
        +   '<div class="field-box"><div class="field-label">当前阶段（Ⅰ～Ⅹ，Ⅹ 为终局）</div>'
        +     '<select id="wc-phase" class="wc-select">' + phaseOpts + '</select></div>'
        + '</div>'
        + '<div class="field-box wc-wide"><div class="field-label">介绍</div>'
        +   '<textarea id="wc-intro" style="min-height:52px;">' + String(w.intro) + '</textarea></div>'
        + '<div class="field-box wc-wide"><div class="field-label">解决风云目标</div>'
        +   '<textarea id="wc-goal" style="min-height:48px;">' + String(w.goal) + '</textarea></div>'
        + '<div class="wb-grid-2">'
        +   '<div class="field-box"><div class="field-label">我方进展</div>'
        +     '<input type="text" id="wc-progress" value="' + String(w.progress).replace(/"/g, '&quot;') + '" placeholder="如：已封印圣遗物 0/5"></div>'
        +   '<div class="field-box"><div class="field-label">倒计时（可留空）</div>'
        +     '<input type="text" id="wc-countdown" value="' + String(w.countdown).replace(/"/g, '&quot;') + '" placeholder="如：倒计时 7 日"></div>'
        + '</div>'
        + '<div class="field-box wc-wide"><div class="field-label">风云阶段影响（当前阶段正在发生什么）</div>'
        +   '<textarea id="wc-impact" style="min-height:48px;">' + String(w.phaseImpact) + '</textarea></div>'
        + '<div class="field-box wc-wide"><div class="field-label">风云次阶段（下一阶段会怎样）</div>'
        +   '<textarea id="wc-next" style="min-height:48px;">' + String(w.nextPhase) + '</textarea></div>'
        + '<div class="field-box wc-wide"><div class="field-label">风云对世界影响（约 100 字）</div>'
        +   '<textarea id="wc-world" style="min-height:60px;">' + String(w.worldImpact) + '</textarea></div>'
        + '</div>'
        + '<p class="wc-hint">当前阶段：<b>' + cur[0] + ' · ' + cur[1] + '</b>　' + cur[2] + '</p>'
        + '<div class="wc-actions"><button type="button" class="wb-card-btn" id="wc-clear">✕ 清空所有字段（保留开启）</button></div>';

      const bindVal = function (id, field) {
        const el = shadow.getElementById(id);
        if (!el) return;
        el.addEventListener('input', function () {
          state.worldCrisis[field] = el.value;
          state.wcPresetKey = '';
          refreshOpeningText(true);
          updateSummary();
        });
      };
      bindVal('wc-name', 'name'); bindVal('wc-intro', 'intro'); bindVal('wc-goal', 'goal');
      bindVal('wc-progress', 'progress'); bindVal('wc-impact', 'phaseImpact');
      bindVal('wc-next', 'nextPhase'); bindVal('wc-world', 'worldImpact'); bindVal('wc-countdown', 'countdown');
      const ph = shadow.getElementById('wc-phase');
      if (ph) ph.addEventListener('change', function () {
        state.worldCrisis.phase = ph.value;
        refreshOpeningText(true);
        updateSummary();
        renderWcPanel();
      });
      stage.querySelectorAll('[data-wc-preset]').forEach(function (b) {
        b.addEventListener('click', function (ev) {
          ev.preventDefault();
          const p = WC_PRESETS.filter(function (x) { return x.key === b.dataset.wcPreset; })[0];
          if (!p) return;
          state.worldCrisis.on = true;
          state.wcPresetKey = p.key;
          if (p.blank) {
            Object.assign(state.worldCrisis, { name: '', intro: '', goal: '', progress: '',
              phase: 'Ⅰ', phaseImpact: '', nextPhase: '', worldImpact: '', countdown: '' });
          } else {
            Object.assign(state.worldCrisis, {
              name: p.name, intro: p.intro, goal: p.goal, progress: p.progress,
              phase: p.phase, phaseImpact: p.phaseImpact, nextPhase: p.nextPhase,
              worldImpact: p.worldImpact, countdown: p.countdown || '',
            });
          }
          persistCurrentState();
          refreshOpeningText(true);
          updateSummary();
          renderWcPanel();
        });
      });
      const cl = shadow.getElementById('wc-clear');
      if (cl) cl.onclick = function () {
        Object.assign(state.worldCrisis, {
          name: '', intro: '', goal: '', progress: '',
          phase: 'Ⅰ', phaseImpact: '', nextPhase: '', worldImpact: '', countdown: '',
        });
        state.wcPresetKey = 'blank';
        persistCurrentState();
        refreshOpeningText(true);
        updateSummary();
        renderWcPanel();
      };
      const tg0 = shadow.getElementById('wc-toggle');
      if (tg0) tg0.onclick = function () {
        state.worldCrisis.on = !state.worldCrisis.on;
        persistCurrentState();
        refreshOpeningText(true);
        updateSummary();
        renderWcPanel();
        if (typeof krsSyncCrisis === 'function') krsSyncCrisis();
      };
    }

    /* 总开关：面板首次渲染时挂一次 */
    (function bindWcMaster() {
      const tg = shadow.getElementById('wc-toggle');
      if (!tg || tg.getAttribute('data-bound') === '1') return;
      tg.setAttribute('data-bound', '1');
      tg.onclick = function () {
        state.worldCrisis.on = !state.worldCrisis.on;
        persistCurrentState();
        refreshOpeningText(true);
        updateSummary();
        renderWcPanel();
        if (typeof krsSyncCrisis === 'function') krsSyncCrisis();
      };
    })();

    /* 首屏渲染一次 */
    renderWcPanel();

    /* 开局前端一进来就把「世界风云」世界书条目按当前开关同步一次 */
    setTimeout(function () { if (typeof krsSyncCrisis === 'function') krsSyncCrisis(); }, 1200);

    function renderFreeOpenings() {
      if (!freeOpeningsBox) return;
      const rail = shadow.getElementById('free-menu-rail');
      const head = shadow.getElementById('free-menu-head');
      const gs = freeGroupList();
      if (!gs.length) return;
      if (!activeFreeGroup || (activeFreeGroup !== CUSTOM_GROUP && gs.indexOf(activeFreeGroup) < 0)) activeFreeGroup = CUSTOM_GROUP;

      /* 左侧分类栏 */
      if (rail) {
        rail.innerHTML = '';
        /* 最前面：自定义开局 */
        const cb = document.createElement('button');
        cb.type = 'button';
        cb.dataset.freeGroup = CUSTOM_GROUP;
        cb.className = 'free-rail-btn free-rail-btn--custom'
          + (activeFreeGroup === CUSTOM_GROUP ? ' active' : '')
          + (state.freeCustomKey === CUSTOM_GROUP ? ' has-pick' : '');
        cb.title = '自己写开局正文，存到本地；点地图任何地点都不会覆盖它';
        cb.innerHTML = '<span class="free-rail-label">' + CUSTOM_GROUP + '</span>'
          + '<span class="free-rail-count">✎</span>';
        cb.onclick = () => { activeFreeGroup = CUSTOM_GROUP; renderFreeOpenings(); };
        rail.appendChild(cb);
        gs.forEach(g => {
          const items = FREE_OPENINGS.filter(o => freeGroupOf(o) === g);
          const hasPick = items.some(o => o.key === state.freeCustomKey);
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'free-rail-btn' + (g === activeFreeGroup ? ' active' : '') + (hasPick ? ' has-pick' : '');
          b.dataset.freeGroup = g;
          b.title = g + '（' + items.length + '）';
          b.innerHTML = '<span class="free-rail-label">' + g + '</span>'
            + '<span class="free-rail-count">' + items.length + '</span>';
          b.onclick = () => { activeFreeGroup = g; renderFreeOpenings(); };
          rail.appendChild(b);
        });
      }
      if (head) head.textContent = '✦ ' + activeFreeGroup;

      /* 右侧内容 */
      freeOpeningsBox.innerHTML = '';
      if (activeFreeGroup === CUSTOM_GROUP) { renderCustomOpening(); return; }
      FREE_OPENINGS.filter(op => freeGroupOf(op) === activeFreeGroup).forEach(op => {
        const b = document.createElement('button');
        b.type = 'button';
        b.dataset.chapKey = op.key;
        b.className = 'chap-card' + (state.freeCustomKey === op.key ? ' selected' : '');
        b.innerHTML = '<div><b>' + op.key + '</b><i>' + op.era + '</i></div><p>' + op.blurb + '</p>'
          + (op.birth ? '<div class="free-birth-hint">📍 建议出生地：' + op.birth + '</div>' : '')
          + '<div class="chap-inject-badge">✓ 注入自由模式开局</div>';
        b.onclick = () => {
          if (state.mode !== '自由模式') return;
          state.freeCustomKey = (state.freeCustomKey === op.key) ? '' : op.key;
          state.route = '';
          state.lastSelectedPrompt = state.freeCustomKey ? op.opening : '';
          /* 选中预设时，把地图出生地一并落到该预设建议的地点；取消则不动 */
          if (state.freeCustomKey && op.birth) {
            state.birthPlace = op.birth;
            state.birthSub = '';
          }
          syncAllChapterCards();
          renderFreeOpenings();
          clearAllRouteSelections();
          renderPureRoute();
          renderBirthMap();
          refreshOpeningText(true);
          updateSummary();
        };
        freeOpeningsBox.appendChild(b);
      });
    }

    renderFreeOpenings();

    CANON_CHAPTERS.forEach(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.chapKey = c.key;
      b.className = 'chap-card' + (state.chapter === c.key ? ' selected' : '');
      b.innerHTML = '<div><b>' + c.key + '</b><i>' + c.era + '</i></div><p>' + c.blurb + '</p>'
        + '<div class="chap-inject-badge">✓ 注入变量：克蕾雅篇章【' + c.key + '】</div>';
      b.onclick = () => {
        if (!state.stories['克蕾雅剧情']) return;
        state.chapter = (state.chapter === c.key) ? '' : c.key;
        state.route = '';
        state.freeCustomKey = '';
        state.stories['克蕾雅剧情'] = !!state.chapter;
        if (state.chapter) {
          state.mode = '剧情模式';
          state.lastSelectedPrompt = c.opening;
        } else {
          state.lastSelectedPrompt = '';
        }
        syncAllChapterCards();
        clearAllRouteSelections();
        renderModeCards(); renderStoryLine(); renderPureRoute(); syncChapterPanels();
        refreshOpeningText(true);
        updateSummary(); syncWorks();
      };
      chapBox.appendChild(b);
    });

    const LAB_CH_KEYS = ['序章', '第一章', '第二章', '第三章', '第四章', '第五章', '第六章', '第七章', '第八章', '第九章'];
    const LAB_CH_LABELS = [
      '序章：调令与那只耳饰', '第一章：执行者降临阿塞勒姆', '第二章：贫民窟的小领主',
      '第三章：第一、二层与「迷魂草」', '第四章：第三层·结界与淫魔', '第五章：第四层·欲望的魔法阵',
      '第六章：第五层·敌对者之馆', '第七章：三处魔法阵与领主宅邸', '第八章：最深处·恶神造物',
      '第九章：灭魔圣女的归处',
    ];
    LAB_CH_KEYS.forEach((k, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.chapKey = k;
      b.className = 'chap-card' + (state.labChapter === k ? ' selected' : '');
      b.innerHTML = '<div><b>' + LAB_CH_LABELS[i] + '</b><i>伊莉丝线</i></div><p>迷宫都市 · ' + k + '</p>'
        + '<div class="chap-inject-badge">✓ 注入变量：伊莉丝篇章【' + k + '】</div>';
      b.onclick = () => {
        if (!state.stories['迷宫都市剧情']) return;
        state.labChapter = (state.labChapter === k) ? '' : k;
        state.stories['迷宫都市剧情'] = !!state.labChapter;
        state.freeCustomKey = '';
        if (state.labChapter) {
          state.mode = '剧情模式';
          state.lastSelectedPrompt = (LAB_CH_INTRO[k] || '') + '：生成伊莉丝在迷宫都市推进「' + k + '」的开局';
        } else {
          state.lastSelectedPrompt = '';
        }
        syncAllChapterCards();
        clearAllRouteSelections();
        renderModeCards(); renderStoryLine(); renderPureRoute(); syncChapterPanels();
        refreshOpeningText(true);
        updateSummary(); syncWorks();
      };
      labChapBox.appendChild(b);
    });

    /* ── 王逝南境章节 ── */
    KE_CHAPTERS.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.chapKey = c.key;
      b.className = 'chap-card' + (state.keChapter === c.key ? ' selected' : '');
      b.innerHTML = '<div><b>' + c.label + '</b><i>' + c.era + '</i></div>'
        + '<p>王逝 · ' + c.key + '</p>'
        + '<div class="chap-inject-badge">✓ 注入变量：王逝篇章【' + c.key + '】+ 日期【' + c.date + '】</div>';
      b.onclick = () => {
        if (!state.stories['王逝剧情']) return;
        state.keChapter = (state.keChapter === c.key) ? '' : c.key;
        state.lastSelectedPrompt = state.keChapter ? KE_CH_INTRO[c.key] : '';
        syncAllChapterCards();
        refreshOpeningText(true);
        updateSummary();
        syncWorks();
      };
      keChapBox.appendChild(b);
    });

    /* ── 医术师温伯格章节 ── */
    IJ_CHAPTERS.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.chapKey = c.key;
      b.className = 'chap-card' + (state.ijChapter === c.key ? ' selected' : '');
      b.innerHTML = '<div><b>' + c.label + '</b><i>' + c.era + '</i></div>'
        + '<p>医术师 · ' + c.key + '</p>'
        + '<div class="chap-inject-badge">✓ 注入变量：医术师篇章【' + c.key + '】+ 日期【' + c.date + '】</div>';
      b.onclick = () => {
        if (!state.stories['医术师剧情']) return;
        state.ijChapter = (state.ijChapter === c.key) ? '' : c.key;
        state.lastSelectedPrompt = state.ijChapter ? IJ_CH_INTRO[c.key] : '';
        syncAllChapterCards();
        refreshOpeningText(true);
        updateSummary();
        syncWorks();
      };
      ijChapBox.appendChild(b);
    });

    /* ── 祈愿诗篇安纳托尔章节 ── */
    PG_CHAPTERS.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.chapKey = c.key;
      b.className = 'chap-card' + (state.pgChapter === c.key ? ' selected' : '');
      b.innerHTML = '<div><b>' + c.label + '</b><i>' + c.era + '</i></div>'
        + '<p>祈愿诗篇 · ' + c.key + '</p>'
        + '<div class="chap-inject-badge">✓ 注入变量：祈愿诗篇篇章【' + c.key + '】</div>';
      b.onclick = () => {
        if (!state.stories['祈愿诗篇剧情']) return;
        state.pgChapter = (state.pgChapter === c.key) ? '' : c.key;
        state.lastSelectedPrompt = state.pgChapter ? PG_CH_INTRO[c.key] : '';
        syncAllChapterCards();
        refreshOpeningText(true);
        updateSummary();
        syncWorks();
      };
      pgChapBox.appendChild(b);
    });

    /* ── 支线与纯净主线 ── */
    const pureRouteBox = shadow.getElementById('pure-route-box');
    const featRouteBox = shadow.getElementById('feat-routes-box');
    const routeBox = shadow.getElementById('side-routes-box');
    const sideBoxKl = shadow.getElementById('side-body-kl');
    const sideBoxIr = shadow.getElementById('side-body-ir');
    const sideHeadKl = shadow.getElementById('side-head-kl');
    const sideHeadIr = shadow.getElementById('side-head-ir');
    const sidePanelKl = shadow.getElementById('side-panel-kl');
    const sidePanelIr = shadow.getElementById('side-panel-ir');

    function syncSidePanels() {
      const unlocked = (state.mode === '自由模式');
      [[sidePanelKl, sideBoxKl, sideHeadKl, '克蕾雅支线'], [sidePanelIr, sideBoxIr, sideHeadIr, '伊莉丝支线']].forEach(([panel, body, head, key]) => {
        if (!panel || !body || !head) return;
        const on = unlocked && !!state.sideOpen[key];
        body.hidden = !on;
        head.classList.toggle('open', on);
        head.disabled = !unlocked;
        panel.classList.toggle('locked', !unlocked);
        const t = head.querySelector('.chap-panel-title');
        if (t && t.dataset.base === undefined) t.dataset.base = t.textContent;
        if (t && t.dataset.base !== undefined) t.textContent = t.dataset.base + (on ? '（已开启支线）' : '');
        const mark = head.querySelector('.chap-panel-mark');
        if (mark) {
          mark.textContent = !unlocked
            ? '未开启（需先选择「自由模式」）'
            : (on ? '☑ 已开启支线 · 收回 ▴' : '展开 ▾');
        }
      });
    }

    function toggleSide(key) {
      if (state.mode !== '自由模式') return;
      state.sideOpen[key] = !state.sideOpen[key];
      if (!state.sideOpen[key] && state.route) {
        const isIris = key === '伊莉丝支线';
        if (IRIS_ROUTES.some(r => r.key === state.route) === isIris) {
          state.route = '';
          refreshOpeningText(true);
        }
      }
      syncSidePanels();
      clearAllRouteSelections();
      renderPureRoute();
      updateSummary();
      syncWorks();
    }
    if (sideHeadKl) sideHeadKl.onclick = () => toggleSide('克蕾雅支线');
    if (sideHeadIr) sideHeadIr.onclick = () => toggleSide('伊莉丝支线');
    syncSidePanels();

    const openingInput = shadow.getElementById('opening-input');

    function clearAllRouteSelections() {
      [pureRouteBox, featRouteBox, routeBox, irisRouteBox].forEach((box) => {
        if (!box || !box.querySelectorAll) return;
        box.querySelectorAll('.pure-route-btn, .feat-route-card, .route-card')
          .forEach((rc) => rc.classList.remove('selected'));
      });
    }

    function selectRoute(routeKey, openingFallback) {
      state.route = routeKey;
      state.freeCustomKey = '';
      if (routeKey) {
        const isIris = IRIS_ROUTES.some(r => r.key === routeKey);
        if (state.mode === '自由模式') {
          state.sideOpen[isIris ? '伊莉丝支线' : '克蕾雅支线'] = true;
        }
        if (isIris) { state.works['迷宫都市篇'] = true; state.works['克蕾雅篇'] = false; }
        else { state.works['克蕾雅篇'] = true; state.works['迷宫都市篇'] = false; }
      }
      syncSidePanels();
      clearAllRouteSelections();
      renderWorkPick();
      renderPureRoute();
      renderModeCards(); renderStoryLine(); syncChapterPanels();
      updateShellBackground();
      refreshOpeningText(true);
      updateSummary();
      syncWorks();
    }



 /* ── 角色多预设剧本数据库 ── */
    const CHAR_CUSTOM_PRESETS = {
      '克蕾雅': [
        { presetName: '高傲大小姐（默认）', mainline: '东塔沙龙的午后，公爵千金摇着折扇把你列进了她的差遣名单。', relation: '差遣对象', extra: '学园东塔贵族沙龙' },
        { presetName: '青梅竹马同盟', mainline: '退婚危机逼近，她在公爵邸后花园卸下伪装，和你一起盘算怎么避开处刑结局。', relation: '青梅竹马', extra: '公爵邸隐秘后花园' },
        { presetName: '塞拉丁的同行者', mainline: '你跟着她回到荒废的塞拉丁领地，替她收编自卫团、查封商会。', relation: '领地随从', extra: '塞拉丁领主馆' },
        { presetName: '默认命运', mainline: '潘多拉学院阳光明媚的东塔沙龙里，金色卷发的大小姐端坐在红丝绒扶手椅上，姿态高傲地轻摇折扇，内心却正疯狂吐槽繁琐贵族礼节。她玫粉色的眼眸瞥见你的到来，眉梢微扬露出小虎牙：“哦～呵呵呵呵！来得正好～本小姐最近手头正缺一个顺眼的差遣对象呢。看你这副呆样，就特别准许你加入本小姐的圈子吧～”', relation: '', extra: '' },
      ],
      '莉莉娅': [
        { presetName: '当代圣女（默认）', mainline: '钟楼天台上，教会出资的圣女藏起面包屑，问你要不要一起吹吹风。', relation: '天台避难搭档', extra: '学园钟楼天台' },
        { presetName: '贫民窟之誓', mainline: '在她成为圣女之前，你们在贫民窟相依为命，她只想为你一人祈福。', relation: '童年玩伴', extra: '王都下层废弃小礼拜堂' },
        { presetName: '教堂的杂役', mainline: '你在教团的教堂打杂，替她分担兼职与孤儿院的活计。', relation: '教堂同事', extra: '王都圣教会附属教堂' },
        { presetName: '默认命运', mainline: '学园静谧的钟楼天台上，清风拂过白发少女的修女短裙。作为教会出资的当代圣女，她并不想享受这份优待，不想成为他人眼中的花瓶而是证明自己......她只希望这笔用在自己身上的钱去帮助更有需要的人。“究竟要怎样才能让大家认可自己呢......？”，莉莉娅听到脚步声，她慌乱地藏起面包屑，琥珀金色的眼眸微红，有些害羞地小声打招呼：“那、那个……午安。如果不介意的话，要一起在天台吹吹风吗？”', relation: '', extra: '' },
      ],
      '梅拉妮': [
        { presetName: '受诅少女（默认）', mainline: '图书馆排架深处，被孤立的咒术千金抱着蓝雾花，求你让她做点什么。', relation: '同班同学', extra: '学园古图书馆排架深处' },
        { presetName: '和哥哥的冒险', mainline: '为了踏上被承认之路，梅拉妮打算和你一起去冒险，用咒术帮别人挽救家族风评。', relation: '哥哥', extra: '两人带上简陋行囊从王都郊外出发' },
        { presetName: '咒术助手契约', mainline: '你把她从黑市买下给她自由，她递上羊皮纸契约，要用暗黑咒术守护你一生。', relation: '主人', extra: '昏暗破败的地下炼金工坊' },
        { presetName: '默认命运', mainline: '昏暗的图书馆角落，厚重黑刘海遮脸的阴郁少女缩在排架深处，冰凉的怀里小心翼翼护着一株荧光蓝雾花。被旁人视为“受诅咒一族”而孤立的她，察觉到你脚步停驻，像惊弓之鸟般发抖，声音细若蚊蝇：“对、对不起……我不是故意挡路的……只要不赶我走，无论多麻烦的咒术作业，我、我都可以替您做……”——渴求被认可的咒术千金在此驻足。', relation: '', extra: '' },
      ],
      '拉姆内': [
        { presetName: '兽人王女（默认）', mainline: '学园橡树上，北方兽人公主啃着苹果，邀你翘课去喝北方果酿。', relation: '损友', extra: '学园庭院橡树' },
        { presetName: '卢娜湖的同乡', mainline: '你是随她北上的旅人，在卢娜湖镇替兽人一族打点与公爵家的往来。', relation: '部族盟友', extra: '北方卢娜湖镇' },
        { presetName: '地下城的搭档', mainline: '她把北部地下城的使用权交到你手上，两人一起往深处走。', relation: '冒险搭档', extra: '北部地下城入口' },
        { presetName: '默认命运', mainline: '学园庭院的高大橡树上，浅棕色长马尾与兽耳轻轻抖动。北方兽人公主拉姆内翘着二郎腿啃着苹果，酒红色的眼眸透着野性与黠慧，晃着毛茸茸的尾巴居高临下吹了声口哨：“哟～！偷懒被你抓到了嘛☆ 下午沙沙尔教官的实技课超无聊的，要不要翘课跟本小姐去喝一杯北方的果酿？我请客哦♪”', relation: '', extra: '' },
      ],
      '丽塔': [
        { presetName: '复仇同行者（默认）', mainline: '暴雨荒野，满身血泥的狼耳少女拽着你的手腕逃进石窟，把猎刀插在你们之间。', relation: '并肩的猎人', extra: '不见天日的荒野石窟' },
        { presetName: '公会的拼桌', mainline: '你们在冒险者公会拼到同一张桌子，接下同一份魔物讨伐委托。', relation: '公会搭档', extra: '边境冒险者公会' },
        { presetName: '猎物与看守', mainline: '你是她奉命盯住的目标，却在一路上成了她唯一肯分口粮的人。', relation: '监视对象', extra: '荒野营地' },
        { presetName: '默认命运', mainline: '故乡村落化作冲天火海，魔物的嘶吼撕碎了童年的一切。满身泥血的狼耳少女死死拽着你的手腕在暴雨中拼命狂奔，直至逃入不见天日的荒野石窟。她剧烈喘息着抹去脸上的血水，金黄兽瞳中翻涌着刻骨的戾气，将沾血的猎刀重重插在两人之间：“听好了……只要咱俩还没死，这笔账老娘迟早千百倍讨回来！从今天起，不管是当刀头舔血的魔物猎人，还是杀进魔窟深处，你都得跟姐们儿并肩活下去，懂了吗？！”——废墟余烬中，独属于你们两人的复仇长征正式启程。', relation: '', extra: '' },
      ],
      '艾拉': [
        { presetName: '支援精灵契约（默认）', mainline: '巴掌大的妖精凭空停在你眼前，脑子里响起她戏谑的心灵通话，问你敢不敢做交易。', relation: '契约者', extra: '灵魂表层' },
        { presetName: '被救的转生者', mainline: '你在轮回之道抓住她伸来的手，保留记忆被投进潘多拉大陆。', relation: '转生者', extra: '轮回之道裂隙' },
        { presetName: '共生的旁听者', mainline: '她成天骑在你肩上出主意，只在夜里露出一点不像精灵的沉默。', relation: '长期同行者', extra: '旅途任意场景' },
        { presetName: '默认命运', mainline: '一阵微弱的空间涟漪荡开，巴掌大小、长着淡紫长发与薄翼的妖精少女凭空悬停在你眼前。她双手叉腰，歪着头打量着你，脑海里突兀地响起了她清脆又戏谑的心灵通话：〈哎呀～抓到一个灵魂波长超级罕见的家伙呢☆！我是上位次元的支援精灵艾拉，我对你超～感兴趣的哦？要不要跟我做个有趣的交易呀～？〉', relation: '', extra: '' },
      ],
      '凯拉涅斯': [
        { presetName: '神的锚点（默认）', mainline: '封印裂隙深处，恶神把脱轨的灵魂拘进神域，赐下神谕与伴生祝福。', relation: '唯一锚点', extra: '封印裂隙神域' },
        { presetName: '被选中的破坏者', mainline: '祂要你走遍世界摧毁五枚圣遗物，每破坏一枚，封印就松一分。', relation: '代行者', extra: '世界各地' },
        { presetName: '抬头的棋子', mainline: '你渐渐发现自己在替谁解封，而祂从不否认。', relation: '反叛的锚点', extra: '某处圣地祭坛前' },
        { presetName: '默认命运', mainline: '远古封印的裂隙深处，恶神凯拉涅斯沉眠千年的意志骤然苏醒。在一片幽紫神圣的虚无界域中，生有纯白羽翼的至高邪神俯瞰着被祂强行拘入神域的你，紫粉色的同心圆眼眸中漾起深邃而玩味的笑意：“脱轨于善神因果之外的异界灵魂……真是绝妙的变数呢。”。祂赋予你前往世界各地摧毁圣遗物让自己解封的"神谕"、赐予你"伴生祝福"，可随时出现在你的脑海或身边，你就是祂在这个世界暂时的唯一锚点……', relation: '', extra: '' },
      ],
      '伊莉丝': [
        { presetName: '同行冒险者（默认）', mainline: '边境公会的委托板前，被夺去圣女之名的银发少女问你愿不愿意结伴。', relation: '结伴冒险者', extra: '边境冒险者公会' },
        { presetName: '教会的监督者', mainline: '教会要她休息，你与她一起作为监督陪她转学进潘多拉学院。', relation: '监督者', extra: '潘多拉学院' },
        { presetName: '教会的旧识', mainline: '你是孤儿院时期的旧识，如今在中央教会任职，负责把她的行踪报上去。', relation: '旧识兼监视者', extra: '阿塞勒姆教会支部' },
        { presetName: '默认命运', mainline: '迷宫都市的硝烟散尽，被剥夺圣女称号的银发少女独自背起行囊，即便圣遗物已被封印消耗，她湛蓝的眸底依然执着：“哪怕希望再渺茫，我也一定要找到彻底解除吸血鬼化、变回人类的方法。”在边境冒险者公会的委托板前，她回头向你温和欠身：“您也是接下这份悬赏的冒险者吗？如果不介意，要与我们结伴同行吗？”', relation: '', extra: '' },
      ],
      '响木天音': [
        { presetName: '异界的目击者（默认）', mainline: '次元裂隙的余波把精疲力竭的魔法少女抛到这片魔法原野，你第一个赶到。', relation: '目击者', extra: '陌生的魔法原野' },
        { presetName: '临时的住处', mainline: '你把无家可归的天音和小忆安置在自己住处，替她们打听回原世界的方法。', relation: '房东兼搭档', extra: '王都近郊民宅' },
        { presetName: '地面支援', mainline: '你在她被魔物围住时替她挡下一击，从此成了她的地面支援。', relation: '地面支援', extra: '魔物出没的野外' },
        { presetName: '默认命运', mainline: '异空间中，天穹法妮雅对凝视者亚玻伦进行必杀一击后，对方爆发出最后的黑暗，恶神凯拉涅斯突然出现并救走了魔神，一阵剧烈的爆炸后，次元裂隙的余波将精疲力竭的少女抛落在这片陌生的魔法原野，小忆从书中起来唤醒天音，她茫然起身看着四周（本轮上半详述战斗过程、下半详述坠落过程）', relation: '', extra: '' },
      ],
      '夏洛特': [
        { presetName: '追击的帮手（默认）', mainline: '从高空坠落的驱魔少女撑着身子起身，你正好在场，成了她在这世界的第一个坐标。', relation: '向导', extra: '坠落点附近' },
        { presetName: '刻印的看护', mainline: '她夜里发作时只有你能按住她，从此你成了唯一知道刻印的人。', relation: '看护者', extra: '旅店房间' },
        { presetName: '教会的线人', mainline: '你替她查上级恶魔的行踪，代价是把柄也交了出去。', relation: '线人', extra: '王都情报屋' },
        { presetName: '默认命运', mainline: '驱魔少女夏洛特在异次元追击上级恶魔赛蕾姆丝，本来爆发到极限的她即将获胜，结果恶神凯拉涅斯出现救走了赛蕾姆丝，夏洛特最后时刻突进传送法阵，从高空向潘多拉大陆坠落，撑着身子起身看向四周（本轮上半详述战斗过程、下半详述坠落过程）', relation: '', extra: '' },
      ],
      '芙洛蒂': [
        { presetName: '岛上的同行者（默认）', mainline: '凯尔维斯岛的旧神殿石阶上，被流放的修女第一次踏足这片土地，你替她拎着行李。', relation: '同行者', extra: '凯尔维斯岛旧神殿' },
        { presetName: '教堂的帮手', mainline: '你在岛上替她传教、分药，也第一次见到那名魔物少女。', relation: '传教帮手', extra: '伊纳克村' },
        { presetName: '被保护的人', mainline: '你是她从旧贵族手里保下来的人，她把你藏在教堂地下室。', relation: '被保护者', extra: '教堂地下室' },
        { presetName: '默认命运', mainline: '凯尔维斯岛的潮声拍打着荒凉的旧神殿石阶。因拒绝旧贵族求婚而惨遭流放的年轻神官芙洛蒂，正带着忐忑与不安的心，第一次踏足这篇岛屿之地。', relation: '', extra: '' },
      ],
      '艾妮希雅': [
        { presetName: '同债的伙伴（默认）', mainline: '美吉斯塔的夜里，代理祭司跪在告解室前，锁骨下的契约纹在发烫。', relation: '同债的伙伴', extra: '圣露米尼亚小教堂' },
        { presetName: '孤儿院的帮工', mainline: '你在孤儿院带孩子、跑腿，看着她一个人扛下整笔地产债。', relation: '孤儿院帮工', extra: '日影大道孤儿院' },
        { presetName: '遗迹探索搭档', mainline: '你和她一起下遗迹，找还债与治黑纹病的线索。', relation: '探索搭档', extra: '戴尔王国遗迹' },
        { presetName: '默认命运', mainline: '戴尔旧都美吉斯塔的夜幕沉重如铁，日影大道的贫民区里唯有圣露米尼亚小教堂的窗户还透着昏黄的烛光。刚刚送孩子们睡下的代理祭司艾妮希雅独自跪在告解室的十字架前，锁骨下方的商会“契约纹”泛着淡淡的刺痛与灼热，提醒着她那笔根本不可能还清的巨额地产债务。', relation: '', extra: '' },
      ],
      '托莉娜': [
        { presetName: '哥哥（默认）', mainline: '阿斯林顿的清晨，见习神官在礼拜堂等你一起出门。', relation: '哥哥', extra: '阿斯林顿礼拜堂' },
        { presetName: '教会的同僚', mainline: '你与她同属阿斯林顿教堂，一起撑着只剩修女与她的教区日常。', relation: '教会同僚', extra: '阿斯林顿教堂' },
        { presetName: '魔血的知情者', mainline: '你是唯一知道她魔血已经觉醒的人，陪她压住那份异样。', relation: '知情者兼看护', extra: '日暮森林神殿' },
        { presetName: '默认命运', mainline: '阿斯林顿的清晨薄雾弥漫，阳光透过礼拜堂的彩绘玻璃洒在长椅上。见习神官托莉娜双手交握胸前闭目祈祷，听到熟悉沉稳的脚步声，少女睫毛微颤睁开眼，转过身露出毫无防备的温柔笑靥：“……哥哥，今天也请让我一起同行吧。”', relation: '', extra: '' },
      ],
      '一之濑雫': [
        { presetName: '异界的目击者（默认）', mainline: '残破废墟里，状态发作的少女撑着石壁，戒备地盯着你。', relation: '目击者', extra: '异变后的废墟' },
        { presetName: '遮掩者', mainline: '她发作时你替她挡人、递水、编借口，成了唯一知道她体质的外人。', relation: '遮掩者', extra: '学园与街市' },
        { presetName: '神社的邻人', mainline: '你住在神社附近，替兼职巫女的她看门、收拾。', relation: '邻人', extra: '城市边缘的小神社' },
        { presetName: '默认命运', mainline: '空气中弥漫着危险而诡谲的气息，残破的废墟阴影中，黑发少女一之濑雫单手撑着潮湿冰冷的石壁，胸口剧烈起伏。体内潜伏的异常状态正在阵阵发作侵蚀神智，她紧咬下唇抬起泛着湿润水光的眼眸，戒备地盯着出现在前方的你：“……别靠近我……！我的身体……现在很奇怪……”', relation: '', extra: '' },
      ],
      '艾尔希': [
        { presetName: '岛上的旅伴（默认）', mainline: '一切都已尘埃落定。封印泽恩与人魔根源之后,曾经漂来的少女决定带着 POWER[Ⅳ] 的力量亲眼看看这个世界。', relation: '旅伴', extra: '弗拉海滩' },
        { presetName: '公会的临时工', mainline: '你替公会的委托跑腿，和艾尔希一起收集合成材料。', relation: '委托搭档', extra: '洛博特魔法师公会' },
        { presetName: '亚克罗德的同期', mainline: '你也是亚克罗德学园被制造出来的学生，和她同源。', relation: '同期生', extra: '亚克罗德学园旧址' },
        { presetName: '默认命运', mainline: '一切都已尘埃落定。封印泽恩与人魔根源之后，世界恢复了平静。那个曾经被定义为「事先就被掠夺的人」的少女，如今带着 POWER[Ⅳ] 的力量，决定亲眼去看看这个世界——不再是为了谁，而是为了她自己。你是她离开安纳托尔后，第一个真正意义上的旅伴。她在码头朝你挥手，笑着说「我会加油的」，然后问你要不要一起走。', relation: '', extra: '' },
      ],
      '狄娜': [
        { presetName: '旅途同行者（默认）', mainline: '利奥回来了，重新用自己的魔核的狄娜打算带他看看世界，你与她同行。', relation: '同行者', extra: '长途旅途' },
        { presetName: '斗技场的对手', mainline: '你在地下斗技场挑战王者位的狄娜，输给她之后被她留了下来。', relation: '手下败将', extra: '地下斗技场' },
        { presetName: '病儿的家属', mainline: '你带着和利奥一样的孩子来找她，她话不多，但会停下来等你。', relation: '求助者', extra: '高帕尔学园外' },
        { presetName: '默认命运', mainline: '利奥回来了。那个被她亲手杀死的弟弟，因为泽恩被封印而假死复活。她不再需要借别人的魔核——这一次，她重新开始用自己的力量。她打算带利奥去看看这个世界，同时也想用自己剩下的时间去治疗那些和利奥一样的孩子。你是她在旅途中遇到的同行者，她话不多，但会在你走错路时停下来等你。', relation: '', extra: '' },
      ],
      '卡莲': [
        { presetName: '店里的帮手（默认）', mainline: '洛博特的道具店里，她一边拨算盘一边说「你道什么歉」。', relation: '帮工', extra: '洛博特道具店' },
        { presetName: '素材承包人', mainline: '你替她跑岛上的合成委托，慢慢摸清了魔法师公会的门道。', relation: '承包人', extra: '安纳托尔岛各处' },
        { presetName: '家族旧识', mainline: '你是她家的旧识，看着她把三大家族的争端一件件处理完。', relation: '旧识', extra: '洛博特商业街' },
        { presetName: '默认命运', mainline: '她嫁给了布雷德，洛博特的三大家族争端也终于平息。道具店还开着，只是她不再像以前那样把什么事都一个人扛。她还是那个最像「可靠的成年人」的人，会一边拨算盘一边说「你道什么歉」。你是她店里新来的帮手，或者是她托付了某件重要东西的人。她递给你一杯咖啡，说「慢慢来就好」。', relation: '', extra: '' },
      ],
      '柯萝特': [
        { presetName: '森林边缘的同行者（默认）', mainline: '古里耶夫森林边缘，继承了双魔核的少女背着竹篓回头问你走不走。', relation: '同行者', extra: '古里耶夫森林边缘' },
        { presetName: '快递站同事', mainline: '你和她一起在快递站打工，顺路接过她父亲留下的最终试炼。', relation: '同事兼试炼同伴', extra: '快递站' },
        { presetName: '研究所的遗孤', mainline: '你也是背信者研究所出身的孩子，和她一起翻父亲的旧笔记。', relation: '同源遗孤', extra: '背信者研究所' },
        { presetName: '默认命运', mainline: '她通过了父亲留下的最终试炼，继承了那颗被施加了保护的魔核，现在是真正的风与光双魔核魔法使。快递站的工作还做着，但她开始计划去更远的地方——像她小时候说的那样，周游世界。你是她在古里耶夫森林边缘遇到的同行者，她背着竹篓，有点羞怯又好奇地回头看你，问要不要一起走。', relation: '', extra: '' },
      ],
      '帕特里琪娅': [
        { presetName: '司法院随行者（默认）', mainline: '司法院的走廊里，佩剑的监视官确认完装备，让你跟上。', relation: '司法院随行者', extra: '帝都司法院走廊' },
        { presetName: '临时下属', mainline: '领主请你归她调遣，做卫兵队的副手。', relation: '下属', extra: '奥威尔堡' },
        { presetName: '被监视者的旧识', mainline: '你比监视令更早认识那名医者，于是成了夹在两人中间的人。', relation: '旧识', extra: '南下旅途' },
        { presetName: '默认命运', mainline: '帝国司法院一纸命令下来——「束缚并监视医者幸存者雷克西斯·格拉曼，同时守护他的安全。」她是司法院第二位，双胞胎骑士之一，被分开放的那一个。命令写在纸上像一份公差，但她自己知道这意味着什么：一个被整个帝国当成异端的身份，配一个被整个帝国当成项圈的监视官，一路南下，往茨塔尔正教势力最强的地方走。出发前她站在司法院的走廊里最后一次确认佩剑，表情平静得像在核对清单。你是司法院派给她的随行者——名义上是协助，实际上是让她分心少一点。她看了你一眼：「我是帝国司法院直属监视官，帕特里琪娅·卡尔斯泰特。本次任务期间，你负责协助我完成监视与护卫。先说清楚，我的判断就是最终判断。」顿了顿，又补一句：「……走吧。我们还得先去找到他。」', relation: '', extra: '' },
      ],
      '奇诺米': [
        { presetName: '临时助手（默认）', mainline: '圣灵教区的桥头，吵得整条街都听见的见习治愈师抓着你去劝一个不肯治病的老人。', relation: '临时助手', extra: '圣灵教区桥头' },
        { presetName: '教会同事', mainline: '你在同一座教堂帮工，看着她从背教义一路背起整座教区。', relation: '教会同事', extra: '圣灵教区教堂' },
        { presetName: '药方的合伙人', mainline: '你替她采药、试方，把药卖给那些不肯收钱的病人。', relation: '合伙人', extra: '圣灵教区外的药田' },
        { presetName: '默认命运', mainline: '圣灵教区的桥头，一个穿治愈师法衣的少女正跟挑担子的老人争执——老人咳得厉害，却不肯收她的药钱，她声音大到整条街都听得见：「我可是清清白白的茨塔尔正教信徒！！不收钱我也得给您治！」她今年十六岁，见习治愈师，塔留姆大人说她「是个聪慧的孩子」，可她自己更在意的是今天有没有帮上别人的忙。她还没听说过「医者」这两个字意味着什么，也没见过火刑柱上刻着的那些名字。你是她旅途路上因为同行而被随手抓来的临时助手与搭档，她转头看见你，眼睛一亮：「啊，你来了！正好快帮我说说这个老人家让他去治病！」', relation: '', extra: '' },
      ],
      '蒂莎': [
        { presetName: '来访者（默认）', mainline: '领主之馆朝东的房间，长年卧床的幼女抬头看向门口。', relation: '来访者', extra: '奥威尔堡领主之馆' },
        { presetName: '家教', mainline: '你是那位遮脸家教的新任接替者，负责教她识字与算术。', relation: '家教', extra: '领主之馆书房' },
        { presetName: '看护', mainline: '你从医学圣地来，第一次替她换掉那些被刮掉标签的药瓶。', relation: '看护', extra: '领主之馆病房' },
        { presetName: '默认命运', mainline: '奥威尔堡领主之馆朝东的房间里，阳光最好的时候，一个长年卧床的幼女正看着门口的动静。她不哭也不闹，只是问了一句：「你好……？」她比谁都清楚自己会死，而今天来了一个不会劝她「安详地前往主的身边」的人，那个人的身影越来越近，少女眯起眼睛，看清了来人的模样。', relation: '', extra: '' },
      ],
      '加莉泰娅': [
        { presetName: '第一位客人（默认）', mainline: '无色之道的白之花田永远停在正午，黑泥造物少女等着一个不该等的人。', relation: '意外来客', extra: '无色之道花田' },
        { presetName: '同窗', mainline: '你在魔法学院和她同班，只当她是个傲娇的优等生。', relation: '同班同学', extra: '魔法学院教室' },
        { presetName: '造物的同行者', mainline: '你是把她从白之花田带出去的人，此后她的形状照着你的记忆生长。', relation: '同行者', extra: '遗迹地带' },
        { presetName: '默认命运', mainline: '无色之道的白之花田永远停在正午。一个以少女之姿出现的黑泥造物在这里等着一个不该等的人——她说这个梦她做过很多次了，梦里那间屋子有灯、有饭、有两副碗筷。不过这次她没有等到那个人，你作为意外来客，成了她第一位客人「在这么冷的天里一直等着的女孩子，你得负责暖热！」', relation: '', extra: '' },
      ],
      '盖欧露易丝': [
        { presetName: '顺路的旅人（默认）', mainline: '终战纪念桥上，卸任的救世主靠着栏杆看地图，问你要不要一起走一段。', relation: '顺路旅人', extra: '拉修赫特终战纪念桥' },
        { presetName: '越狱同伙', mainline: '你也是地下监狱的囚犯，被她从暗道里一把拽了出来。', relation: '狱友', extra: '地下监狱' },
        { presetName: '旧部', mainline: '你是龙骑士团残存的部下，在城下街重新找到她。', relation: '旧部', extra: '拉修赫特城下街' },
        { presetName: '默认命运', mainline: '战争终于结束，重建也上了轨道。那个曾经背负「救世主」之名、在七年里下令过无数残酷决断的龙骑士团团长，如今把该办的事都办完了——领地有人管，名单有人守，碑有人擦。某天早上她收拾出一个不大的行囊，把【封轮】塞进箱底，说了句「这玩意儿退役了」。她这辈子几乎没离开过南境，现在终于可以往北走了。你是她在终战纪念桥上撞见的旅人，她正靠着栏杆看地图，抬头看见你背着行囊，眼睛一亮：「喂，你也是要走的？去哪儿？——顺路的话，一起走一段？」', relation: '', extra: '' },
      ],
      '斯提亚拉': [
        { presetName: '同行者（默认）', mainline: '救济院门口，盲眼少女坐在门槛上，听着你的脚步问你走不走。', relation: '同行者', extra: '救济院门口' },
        { presetName: '她的眼睛', mainline: '她在监狱里替你分过食物，如今换你替她读路上的牌子。', relation: '狱友兼向导', extra: '南境道路' },
        { presetName: '教团的信徒', mainline: '你是被她笑容救过的人之一，后来加入了以她为名的教团。', relation: '教团信徒', extra: '旧产场废墟' },
        { presetName: '默认命运', mainline: '救济院上了轨道，孩子们有人照顾，纳西娅院长也痊愈了。那个曾经在地下监狱里靠着墙壁掰硬币、把食物分给每一个人的盲眼少女，如今把院长的工作交了出去——「我不能一直待在这里，不然就不知道外面的世界长什么样了。」她眼睛看不见，但她想用耳朵、用手、用脚去感受那些书上读过的地方。你是路过救济院门口的旅人，她正坐在门槛上，脚边放着一个小小的行囊，先笑着道歉：「啊···那个不好意思，我眼睛看不见··。」然后问：「你也是要走的吗？我虽然看不见路，但我可以听得很远——要不要一起？我会努力不拖后腿的！」', relation: '', extra: '' },
      ],
      '古伊奈': [
        { presetName: '北上同行者（默认）', mainline: '城门口，教完最后一堂魂式的她叉着腰拦住你，说带她走她不认路但能打。', relation: '同行者', extra: '伯赫洛斯城门口' },
        { presetName: '魂式学徒', mainline: '你在伯赫洛斯跟她学魂式，从握粉笔开始。', relation: '学徒', extra: '伯赫洛斯教室' },
        { presetName: '旧战友', mainline: '你是七年前那场守城的旧人，她认得你手上的老伤。', relation: '旧战友', extra: '伯赫洛斯旧城墙' },
        { presetName: '默认命运', mainline: '旧城墙修好了，魂式也有人接手教了。她以纹章具现的形式留了下来——有身体，能摸到东西，也能被摸到。在伯赫洛斯待了整整七年，又守了一整个重建期，她终于把粉笔一扔：「教完了。该轮到我出去逛逛了。」她这辈子只从书上和逃难的人嘴里听说过外面的世界，现在想去亲眼看看——「就一次也好，想看看海是什么颜色。」你是来南境游历、正打算继续北上的旅人，她在城门口叫住你，叉着腰：「喂，新来的。听说你往北走？——带上我，我不认路，但我能打。」', relation: '', extra: '' },
      ],
    };

    let selectedDestinyChar = '';
    let currentPresetIdx = 0;

    // 🌟 核心函数：根据 3 个输入框实时组装并刷新上方开局输入框 🌟
    function syncDestinyAssemble(isFromManualTyping) {
      if (!selectedDestinyChar) return;
      const mainlineInput = shadow.getElementById('destiny-field-mainline');
      const relationInput = shadow.getElementById('destiny-field-relation');
      const extraInput = shadow.getElementById('destiny-field-extra');
      if (!mainlineInput) return;

      // 智能特性：只要用户在输入框手动改动，自动点亮「✏️ 自定义」按钮
      if (isFromManualTyping) {
        const presetsBox = shadow.getElementById('destiny-presets-box');
        if (presetsBox) {
          const pills = presetsBox.querySelectorAll('.destiny-preset-pill');
          const lastIdx = pills.length - 1;
          if (currentPresetIdx !== lastIdx) {
            currentPresetIdx = lastIdx;
            pills.forEach((el, i) => el.classList.toggle('active', i === lastIdx));
          }
        }
      }

      const mainText = mainlineInput.value.trim();
      const relationText = relationInput ? relationInput.value.trim() : '';
      const extraText = extraInput ? extraInput.value.trim() : '';

      let assembled = `【${selectedDestinyChar}·命运主线】${mainText}`;
      if (relationText) {
        assembled += `[<user>与${selectedDestinyChar}关系：${relationText}。]`;
      }
      if (extraText) {
        assembled += `[开局情境：${extraText}。]`;
      }

      state.lastSelectedPrompt = assembled;
      state.openingText = assembled;
      state.openingTouched = true;

      const topInput = shadow.getElementById('opening-input');
      if (topInput) topInput.value = assembled;
      updateSummary();
    }

    // 刷新展示当前角色的预设与三行输入框
    function setupDestinyCardForChar(charName, defaultAvatar, defaultTag, defaultPrompt) {
      selectedDestinyChar = charName;
      const card = shadow.getElementById('destiny-preview-card');
      if (!card) return;
      card.style.display = 'flex';

      shadow.getElementById('destiny-p-img').src = defaultAvatar;
      shadow.getElementById('destiny-p-name').textContent = charName;
      shadow.getElementById('destiny-p-tag').textContent = defaultTag;
      shadow.getElementById('destiny-label-mainline').textContent = `【${charName}·命运主线】：`;

      // 提取预设列表，并在末尾始终加入专属的「✏️ 自定义」胶囊
      let presets = (CHAR_CUSTOM_PRESETS[charName] || []).map(x => Object.assign({}, x));
      if (!presets.length) {
        presets.push({
          presetName: '默认开局',
          mainline: defaultPrompt.replace(/^【.*?】\s*/, ''),
          relation: '',
          extra: ''
        });
      }
      // 追加自定义按钮
      presets.push({
        presetName: '✏️ 自定义',
        isCustom: true
      });

      // 渲染预设切换小胶囊
      const presetsBox = shadow.getElementById('destiny-presets-box');
      if (presetsBox) {
        presetsBox.innerHTML = '';
        presets.forEach((p, idx) => {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'destiny-preset-pill' + (idx === currentPresetIdx ? ' active' : '') + (p.isCustom ? ' is-custom-pill' : '');
          pill.textContent = p.presetName;
          pill.onclick = () => {
            currentPresetIdx = idx;
            presetsBox.querySelectorAll('.destiny-preset-pill').forEach((el, i) => el.classList.toggle('active', i === idx));
            if (!p.isCustom) {
              loadPresetValues(p);
            }
          };
          presetsBox.appendChild(pill);
        });
      }

      function loadPresetValues(pData) {
        const mainlineInput = shadow.getElementById('destiny-field-mainline');
        const relationInput = shadow.getElementById('destiny-field-relation');
        const extraInput = shadow.getElementById('destiny-field-extra');
        if (mainlineInput) mainlineInput.value = pData.mainline || '';
        if (relationInput) relationInput.value = pData.relation || '';
        if (extraInput) extraInput.value = pData.extra || '';
        syncDestinyAssemble(false);
      }

      currentPresetIdx = 0;
      loadPresetValues(presets[0]);

      // 绑定 3 个输入框的实时 input 监听，传递 manualTyping = true
      ['destiny-field-mainline', 'destiny-field-relation', 'destiny-field-extra'].forEach(id => {
        const el = shadow.getElementById(id);
        if (el) {
          el.oninput = () => syncDestinyAssemble(true);
        }
      });
    }

    function renderDestinyMainlines() {
      const linkedBox = shadow.getElementById('destiny-linked-box');
      const originBox = shadow.getElementById('destiny-origin-box');
      const branchBox = shadow.getElementById('destiny-branch-box');
      if (!linkedBox || !originBox) return;

      // 1. 渲染联动角色
      linkedBox.innerHTML = '';
      DESTINY_CONFIG.linked.forEach(char => {
        const isEnabled = !!state.linkMode && !!state.linkChars[char.linkKey];
        const isSelected = (selectedDestinyChar === char.name);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'destiny-btn' + (isSelected ? ' selected' : '') + (!isEnabled ? ' disabled' : '');
        btn.title = isEnabled ? `点击配置【${char.name}】开局` : `需在第一幕启用【${char.name}】`;
        btn.innerHTML = `
          <div class="destiny-avatar">
            <img src="${char.avatar}" alt="${char.name}">
          </div>
          <span class="destiny-name">${char.name}</span>
        `;

        btn.onclick = () => {
          if (!isEnabled) return;
          setupDestinyCardForChar(char.name, char.avatar, '联动 · ' + char.linkKey, char.prompt);
          renderDestinyMainlines();
        };
        linkedBox.appendChild(btn);
      });

      // 2. 渲染原著角色
      originBox.innerHTML = '';
      DESTINY_CONFIG.origin.forEach(char => {
        const isSelected = (selectedDestinyChar === char.name);
        const prof = ORIGIN_PROFILES[char.name] || {};

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'destiny-btn' + (isSelected ? ' selected' : '');
        btn.innerHTML = `
          <div class="destiny-avatar">
            <img src="${char.avatar}" alt="${char.name}">
          </div>
          <span class="destiny-name">${char.name}</span>
        `;

        btn.onclick = () => {
          setupDestinyCardForChar(char.name, prof.bigImg || char.avatar, '原著核心', char.prompt);
          renderDestinyMainlines();
        };
        originBox.appendChild(btn);
      });

      // 3. 渲染支线角色（对白美化中只有单图、无立绘差分的角色）
      if (branchBox) {
        branchBox.innerHTML = '';
        (DESTINY_CONFIG.branch || []).forEach(char => {
          const isEnabled = !char.linkKey || (!!state.linkMode && !!state.linkChars[char.linkKey]);
          const isSelected = (selectedDestinyChar === char.name);
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'destiny-btn destiny-btn--branch' + (isSelected ? ' selected' : '') + (!isEnabled ? ' disabled' : '');
          btn.title = isEnabled ? `点击配置【${char.name}】开局` : `需在第一幕启用【${char.linkKey}】`;
          btn.innerHTML = `
            <div class="destiny-avatar">
              <img src="${char.avatar}" alt="${char.name}">
            </div>
            <span class="destiny-name">${char.name}</span>
          `;
          btn.onclick = () => {
            if (!isEnabled) return;
            setupDestinyCardForChar(char.name, char.avatar, '支线角色', char.prompt);
            renderDestinyMainlines();
          };
          branchBox.appendChild(btn);
        });
      }
    }

    /* ── 纯净主线与反派按钮渲染 ── */
    let pureBtnRef = null;
    let villainBtnRef = null;

    function renderPureRoute() {
      if (!pureBtnRef) return;
      const pure = !state.route && (state.mode === '自由模式' || state.mode === '剧情模式');
      pureBtnRef.classList.toggle('selected', pure);

      if (villainBtnRef) {
        if (state.mode === '自由模式') {
          villainBtnRef.style.display = 'block';
          villainBtnRef.classList.toggle('selected', !!state.villain);
          const stText = villainBtnRef.querySelector('.v-state');
          if (stText) stText.textContent = state.villain ? '【已开启】' : '【已关闭】';
        } else {
          villainBtnRef.style.display = 'none';
        }
      }
    }

    if (pureRouteBox) {
      pureRouteBox.innerHTML = '';

      const noneBtn = document.createElement('button');
      noneBtn.type = 'button';
      noneBtn.className = 'pure-route-btn' + (state.route === '' ? ' selected' : '');
      noneBtn.innerHTML = '<strong>✦ 纯净路线（不进入任何败北支线）</strong><small>主线/自由生活照常走。任何败北／堕落支线都不会注入。</small>';
      pureBtnRef = noneBtn;
      noneBtn.onclick = () => {
        clearChapterSelection();
        clearAllRouteSelections();
        selectRoute('', '');
      };
      pureRouteBox.appendChild(noneBtn);

      const villainBtn = document.createElement('button');
      villainBtn.type = 'button';
      villainBtn.className = 'villain-btn' + (state.villain ? ' selected' : '');
      villainBtn.innerHTML = '<strong>⚔ 自由模式反派 <span class="v-state">' + (state.villain ? '【已开启】' : '【已关闭】') + '</span></strong><small>点击开启/关闭世界书「[自由模式反派]」条目，增添校园暗流。</small>';
      villainBtnRef = villainBtn;
      villainBtn.onclick = () => {
        state.villain = !state.villain;
        renderPureRoute();
        updateSummary();
        syncWorks();
      };
      pureRouteBox.appendChild(villainBtn);
    }

    ROUTES.filter(r => r.featured).forEach(r => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'feat-route-card' + (state.route === r.key ? ' selected' : '');
      b.dataset.rkey = r.key;
      b.innerHTML = `
        <div class="feat-route-thumb" style="background-image:url('${r.thumb}');"></div>
        <div class="feat-route-body">
          <strong>${r.key}</strong>
          <small>${r.blurb}</small>
        </div>
      `;
      b.onclick = () => {
        selectRoute(r.key, r.opening);
        b.classList.add('selected');
      };
      featRouteBox.appendChild(b);
    });

    ROUTES.filter(r => !r.featured).forEach(r => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'route-card' + (state.route === r.key ? ' selected' : '');
      b.innerHTML = '<strong>' + r.key + '</strong><small>' + r.blurb + '</small>';
      b.onclick = () => {
        selectRoute(r.key, r.opening);
        b.classList.add('selected');
      };
      routeBox.appendChild(b);
    });

    const irisRouteBox = shadow.getElementById('iris-routes-box');
    IRIS_ROUTES.forEach(r => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'route-card' + (state.route === r.key ? ' selected' : '');
      b.innerHTML = '<strong>' + r.key + '</strong><small>' + r.blurb + '</small>';
      b.onclick = () => {
        selectRoute(r.key, r.opening);
        b.classList.add('selected');
      };
      irisRouteBox.appendChild(b);
    });

    openingInput.addEventListener('input', (e) => {
      state.openingText = e.target.value;
      state.openingTouched = true;
      updateSummary();
    });

    /* 第四页：futa */
    const futaBox = shadow.getElementById('futa-box');
    const futaInput = shadow.getElementById('futa-input');

    FUTA_CHARACTERS.forEach(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'futa-card' + (state.futaChars.includes(c.key) ? ' selected' : '');
      b.dataset.futaKey = c.key;
      const avatarInner = `<img src="${c.avatar}" alt="${c.key}">`;
      b.innerHTML = `
        <span class="check">✓</span>
        <div class="avatar">${avatarInner}</div>
        <div class="name">${c.key}</div>
      `;
      b.onclick = () => {
        const idx = state.futaChars.indexOf(c.key);
        if (idx >= 0) state.futaChars.splice(idx, 1);
        else state.futaChars.push(c.key);
        b.classList.toggle('selected', state.futaChars.includes(c.key));
        updateFutaSummary();
        refreshOpeningText(true);
        updateSummary();
      };
      futaBox.appendChild(b);
    });

    futaInput.addEventListener('input', (e) => {
      state.futaCustom = e.target.value;
      updateFutaSummary();
      refreshOpeningText(true);
      updateSummary();
    });

    try {
      updateFutaSummary();
      renderWorkPick();
      renderModeCards();
      renderStoryLine();
      renderLinkStoryLine();
      syncSidePanels();
      syncChapterPanels();
      renderPureRoute();
      renderLinkPage();
      renderDestinyMainlines();
      bindOutlanderInputs();
      renderCompanionsList();
      renderSkillsList();
      renderTraitsList();
      renderAssetsList();
      syncProtagonistView();
      refreshOpeningText(true);
    } catch (e) {
      console.error('[命运之书] 初始化遇到非致命警告，已自动拦截并安全呈现界面：', e);
    }
    /* ── 刻意不在初始化时同步世界书 ──
       面板 state 每次挂载都会回到默认值（自由模式／剧情全关／学院编成 class_a），
       若在初始化时调用 syncWorks()，刷新页面或切换楼层就会把上一局已经开启的
       「学院模式」22 条条目与各篇章细纲整批关掉。
       因此世界书一律以「面板最后一次写入」为准，只在用户实际操作面板时同步。 */
    krsSetWorkHint('世界书状态：以面板最后一次写入为准。改动任意选项后会自动同步。', false);

    // 🌟 静默预加载所有大立绘，确保点击切换秒开不卡顿
    function preloadAllPortraits() {
      const urls = [
        KE_SPRITE, IJ_SPRITE, PG_SPRITE,
        'https://origin.picgo.net/2026/09/28/94b515d79b47bbd27a34a4b7182512d13936a17a75a1011d.png', // 雷克西斯大立绘
        'https://origin.picgo.net/2026/09/28/25a75db1a013fb416d6ab770e08b6c724ea8266c5e5912d4.png',
        'https://origin.picgo.net/2026/09/28/26681cd9be7ff8260.png',
        'https://origin.picgo.net/2026/09/28/2c6c6c7cf27c5d81571225e875c16eaf61571150c7084731.png',
        'https://origin.picgo.net/2026/09/28/43cdc177a9387cfbf1cac5bea0aa794ac066ff817585f1e8.png',
        'https://origin.picgo.net/2026/09/28/60a7b3c7528787365a0b9641693355be4d6a8795fc0d4d41.png',
        'https://origin.picgo.net/2026/09/28/9d22eb544a59537f2b86e4fa07c4aa1bd16ed95d73ebe063.png',
        'https://origin.picgo.net/2026/09/28/b91c910c9dae7659cce6f8d53fabc402a93a48de03844a13.png',
        'https://origin.picgo.net/2026/09/29/da4a4c8d7ddc8a4e10.png',
        'https://origin.picgo.net/2026/09/29/f762e8ea187a59bd7ff44d653e0cbc73785e9571140b2d72.png',
        'https://origin.picgo.net/2026/09/29/b9b78116e0bfe70bc46b0b4580dbbf038102a23c4e338cc4.png',
        'https://origin.picgo.net/2026/09/29/b23e3b7d67983d6f31df4d11182ac4a9005289b086f6817f.png'
      ];
      // 触发后台无阻塞预取
      setTimeout(() => {
        urls.forEach(u => {
          const img = new Image();
          img.src = u;
        });
      }, 100);
    }
    preloadAllPortraits();

    shadow.getElementById('submit-btn').onclick = async () => {
      const btn = shadow.getElementById('submit-btn');
      const err = shadow.getElementById('err-tip');
      btn.disabled = true;
      btn.textContent = '铭 刻 中...';
      err.textContent = '';
      try {
        const keInfo = (function () {
          const out = { krsChapterDate: '', krsChapterLabel: '', ijChapterDate: '', ijChapterLabel: '', pgChapterDate: '', pgChapterLabel: '' };
          if (state.stories['王逝剧情']) {
            const kc = KE_CHAPTERS.find((x) => x.key === (state.keChapter || '序章')) || KE_CHAPTERS[0];
            out.krsChapterDate = kc.date;
            out.krsChapterLabel = kc.label;
          }
          if (state.stories['医术师剧情']) {
            const ic = IJ_CHAPTERS.find((x) => x.key === (state.ijChapter || '序章')) || IJ_CHAPTERS[0];
            out.ijChapterDate = ic.date;
            out.ijChapterLabel = ic.label;
          }
          if (state.stories['祈愿诗篇剧情']) {
            const pc = PG_CHAPTERS.find((x) => x.key === (state.pgChapter || '序章')) || PG_CHAPTERS[0];
            out.pgChapterDate = pc.date;
            out.pgChapterLabel = pc.label;
          }
          return out;
        })();
        await onFinalSubmit(composeText(), Object.assign({}, state, keInfo));
      } catch (e) {
        err.textContent = '开局失败：' + (e && e.message ? e.message : String(e));
        btn.disabled = false;
        btn.textContent = '铭 刻 命 运 · 开 局';
      }
    };

    updateSummary();
  }

  const activeMounts = new Set();
  const activeListeners = [];

  async function handleSubmit(text, meta, mesId) {
    persistCurrentState();
    const set = fn('setChatMessages');
    const create = fn('createChatMessages');
    const trigger = fn('triggerSlash');

    if (typeof create !== 'function' || typeof trigger !== 'function') {
      throw new Error('未检测到酒馆助手的 createChatMessages / triggerSlash 接口，请确认助手扩展已开启！');
    }

    const mid = (mesId === null || mesId === undefined) ? 0 : mesId;
    if (typeof set === 'function') {
      try {
        await set([{ message_id: mid, message: '*命运之书已合上。*' }], { refresh: 'affected' });
      } catch (_) {
        try { await set([{ message_id: mid, message: '*命运之书已合上。*' }]); } catch (_) {}
      }
    }

    /* 先把开局变量准备好，随新楼层一起写入 */
    const seed = krsBuildSeed(meta);
    const statData = krsSeedStatData(seed);

    let created = null;
    try {
      created = await create([{ role: 'user', message: text, data: Object.assign({ krs_opening: meta }, { stat_data: statData }) }]);
    } catch (e) {
      created = await create([{ role: 'user', message: text, data: { krs_opening: meta } }]);
    }

    let newId = krsPickId(created);
    if (newId === null || newId === undefined) {
      const getLast = fn('getLastMessageId');
      if (typeof getLast === 'function') { try { newId = await Promise.resolve(getLast()); } catch (_) {} }
    }
    if (newId === null || newId === undefined) newId = mid;

    let seedResult = null;
    try { seedResult = await krsWriteVariables(newId, seed); } catch (_) {}
    console.info('[命运之书] 开局变量注入 →', seedResult || '失败（已由开场白内的初始化指令兜底）', seed);

    activeMounts.forEach(m => { try { m.remove(); } catch (_) {} });
    activeMounts.clear();

    await trigger('/trigger');
  }

  function scanAndMount() {
    const doc = getHostDoc();
    const nodes = Array.from(doc.querySelectorAll('#chat .mes, .mes, [mesid]'));
    for (const node of nodes) {
      if (node.querySelector('[data-krs-shadow="1"]')) continue;
      const body = node.querySelector('.mes_text') || node;
      const content = String(body.textContent || '');
      if (content.includes(MARKER)) {
        body.textContent = '';

        const mountPoint = doc.createElement('div');
        mountPoint.dataset.krsShadow = '1';
        mountPoint.style.cssText = 'width:100%; display:block; margin:0; padding:0;';

        const rawId = node.getAttribute('mesid');
        const mesId = (rawId !== null && rawId !== undefined && !isNaN(Number(rawId))) ? Number(rawId) : 0;

        renderFateBook(mountPoint, (text, meta) => handleSubmit(text, meta, mesId));

        body.appendChild(mountPoint);
        activeMounts.add(mountPoint);
        break;
      }
    }
  }

  function destroy() {
    activeListeners.forEach(off => { try { off(); } catch (_) {} });
    activeListeners.length = 0;
    activeMounts.forEach(m => { try { m.remove(); } catch (_) {} });
    activeMounts.clear();
    delete HW[SLOT];
  }

  HW[SLOT] = { destroy, scan: scanAndMount };

  const eventOn = fn('eventOn');
  const eventRemove = fn('eventRemove');
  if (typeof eventOn === 'function') {
    const names = ['CHAT_CHANGED', 'MESSAGE_UPDATED', 'MESSAGE_SWIPED', 'MESSAGE_RECEIVED'];
    for (const n of names) {
      const h = () => setTimeout(scanAndMount, 60);
      eventOn(n.toLowerCase(), h);
      activeListeners.push(() => { try { eventRemove(n.toLowerCase(), h); } catch (_) {} });
    }
  } else {
    const ob = new (HW.MutationObserver || MutationObserver)(() => setTimeout(scanAndMount, 80));
    try {
      ob.observe(HD.getElementById('chat') || HD.body, { childList: true, subtree: true });
      activeListeners.push(() => ob.disconnect());
    } catch (_) {}
  }

  setTimeout(scanAndMount, 50);
  setTimeout(scanAndMount, 500);
})();
