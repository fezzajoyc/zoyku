import type { Locale } from "@/lib/site";

/**
 * emoji-picker 的内置数据集:手工精选的常用 emoji,英文官方名称,
 * 按 Unicode 分类习惯分成 8 组。行格式 "name|emoji",模块加载时解析一次。
 * 不含 ZWJ 序列与肤色变体,全部是单码位字符,复制即用。
 */

export type EmojiItem = { name: string; char: string };
export type EmojiGroup = { key: string; label: Record<string, string>; items: EmojiItem[] };

const GROUPS_RAW: { key: string; label: Record<string, string>; lines: string }[] = [
  {
    key: "smileys",
    label: {
      en: "Smileys & Emotion",
      zh: "表情与情感",
      ja: "顔文字・感情",
      es: "Caras y emociones",
      pt: "Rostos e emoções",
    },
    lines: `
grinning face|😀
grinning face with big eyes|😃
grinning face with smiling eyes|😄
beaming face with smiling eyes|😁
grinning squinting face|😆
grinning face with sweat|😅
rolling on the floor laughing|🤣
face with tears of joy|😂
slightly smiling face|🙂
upside-down face|🙃
melting face|🫠
winking face|😉
smiling face with smiling eyes|😊
smiling face with halo|😇
smiling face with hearts|🥰
smiling face with heart-eyes|😍
face blowing a kiss|😘
kissing face|😗
smiling face|☺️
kissing face with closed eyes|😚
face savoring food|😋
face with tongue|😛
winking face with tongue|😜
zany face|🤪
squinting face with tongue|😝
money-mouth face|🤑
smiling face with open hands|🤗
face with hand over mouth|🤭
face with open eyes and hand over mouth|🫢
shushing face|🤫
thinking face|🤔
saluting face|🫡
zipper-mouth face|🤐
face with raised eyebrow|🤨
neutral face|😐
expressionless face|😑
face without mouth|😶
dotted line face|🫥
smirking face|😏
unamused face|😒
face with rolling eyes|🙄
grimacing face|😬
lying face|🤥
relieved face|😌
pensive face|😔
sleepy face|😪
drooling face|🤤
sleeping face|😴
face with medical mask|😷
face with thermometer|🤒
face with head bandage|🤕
nauseated face|🤢
face vomiting|🤮
sneezing face|🤧
hot face|🥵
cold face|🥶
woozy face|🥴
face with crossed-out eyes|😵
exploding head|🤯
cowboy hat face|🤠
partying face|🥳
disguised face|🥸
smiling face with sunglasses|😎
nerd face|🤓
face with monocle|🧐
confused face|😕
face with diagonal mouth|🫤
worried face|😟
slightly frowning face|🙁
frowning face|☹️
face with open mouth|😮
hushed face|😯
astonished face|😲
flushed face|😳
pleading face|🥺
face holding back tears|🥹
frowning face with open mouth|😦
anguished face|😧
fearful face|😨
anxious face with sweat|😰
sad but relieved face|😥
crying face|😢
loudly crying face|😭
face screaming in fear|😱
confounded face|😖
persevering face|😣
disappointed face|😞
downcast face with sweat|😓
weary face|😩
tired face|😫
yawning face|🥱
face with steam from nose|😤
enraged face|😡
angry face|😠
face with symbols on mouth|🤬
smiling face with horns|😈
angry face with horns|👿
skull|💀
pile of poo|💩
clown face|🤡
ghost|👻
alien|👽
robot|🤖
smiling cat with heart-eyes|😻
grinning cat|😺
weary cat|🙀
red heart|❤️
orange heart|🧡
yellow heart|💛
green heart|💚
blue heart|💙
purple heart|💜
black heart|🖤
white heart|🤍
brown heart|🤎
broken heart|💔
heart exclamation|❣️
two hearts|💕
revolving hearts|💞
beating heart|💓
growing heart|💗
sparkling heart|💖
heart with ribbon|💝
heart with arrow|💘
heart decoration|💟
hundred points|💯
collision|💥
sleeping symbol|💤
`,
  },
  {
    key: "people",
    label: {
      en: "People & Body",
      zh: "人物",
      ja: "人物・身体",
      es: "Personas y cuerpo",
      pt: "Pessoas e corpo",
    },
    lines: `
waving hand|👋
raised back of hand|🤚
raised hand|✋
vulcan salute|🖖
OK hand|👌
pinched fingers|🤌
pinching hand|🤏
victory hand|✌️
crossed fingers|🤞
love-you gesture|🤟
sign of the horns|🤘
call me hand|🤙
backhand index pointing left|👈
backhand index pointing right|👉
backhand index pointing up|👆
backhand index pointing down|👇
index pointing up|☝️
thumbs up|👍
thumbs down|👎
raised fist|✊
oncoming fist|👊
left-facing fist|🤛
right-facing fist|🤜
clapping hands|👏
raising hands|🙌
open hands|👐
palms up together|🤲
handshake|🤝
folded hands|🙏
writing hand|✍️
nail polish|💅
selfie|🤳
flexed biceps|💪
ear|👂
nose|👃
brain|🧠
anatomical heart|🫀
eyes|👀
mouth|👄
baby|👶
person|🧑
man|👨
woman|👩
older adult|🧓
police officer|👮
person tipping hand|💁
person raising hand|🙋
person facepalming|🤦
person shrugging|🤷
mage|🧙
fairy|🧚
vampire|🧛
merperson|🧜
elf|🧝
baby angel|👼
Santa Claus|🎅
Mrs. Claus|🤶
superhero|🦸
supervillain|🦹
dancer|💃
man dancing|🕺
person in lotus position|🧘
person taking bath|🛀
person in bed|🛌
`,
  },
  {
    key: "animals",
    label: {
      en: "Animals & Nature",
      zh: "动物与自然",
      ja: "動物・自然",
      es: "Animales y naturaleza",
      pt: "Animais e natureza",
    },
    lines: `
dog face|🐶
cat face|🐱
mouse face|🐭
hamster|🐹
rabbit face|🐰
fox|🦊
bear|🐻
panda|🐼
koala|🐨
tiger face|🐯
lion|🦁
cow face|🐮
pig face|🐷
frog|🐸
monkey face|🐵
see-no-evil monkey|🙈
hear-no-evil monkey|🙉
speak-no-evil monkey|🙊
chicken|🐔
penguin|🐧
bird|🐦
baby chick|🐤
duck|🦆
eagle|🦅
owl|🦉
bat|🦇
boar|🐗
horse face|🐴
unicorn|🦄
honeybee|🐝
bug|🐛
butterfly|🦋
snail|🐌
lady beetle|🐞
ant|🐜
spider|🕷️
scorpion|🦂
mosquito|🦟
turtle|🐢
snake|🐍
lizard|🦎
t-rex|🦖
spouting whale|🐳
dolphin|🐬
fish|🐟
tropical fish|🐠
blowfish|🐡
shark|🦈
octopus|🐙
squid|🦑
shrimp|🦐
crab|🦀
crocodile|🐊
zebra|🦓
gorilla|🦍
elephant|🐘
rhinoceros|🦏
camel|🐪
giraffe|🦒
llama|🦙
sloth|🦥
hedgehog|🦔
dove|🕊️
turkey|🦃
peacock|🦚
parrot|🦜
paw prints|🐾
bouquet|💐
cherry blossom|🌸
rose|🌹
sunflower|🌻
tulip|🌷
blossom|🌼
seedling|🌱
evergreen tree|🌲
deciduous tree|🌳
palm tree|🌴
cactus|🌵
four leaf clover|🍀
maple leaf|🍁
fallen leaf|🍂
leaf fluttering in wind|🍃
`,
  },
  {
    key: "food",
    label: {
      en: "Food & Drink",
      zh: "食物与饮料",
      ja: "食べ物・飲み物",
      es: "Comida y bebida",
      pt: "Comida e bebidas",
    },
    lines: `
green apple|🍏
red apple|🍎
pear|🍐
tangerine|🍊
lemon|🍋
banana|🍌
watermelon|🍉
grapes|🍇
strawberry|🍓
blueberries|🫐
melon|🍈
cherries|🍒
peach|🍑
mango|🥭
pineapple|🍍
coconut|🥥
kiwi fruit|🥝
tomato|🍅
eggplant|🍆
avocado|🥑
broccoli|🥦
leafy green|🥬
cucumber|🥒
ear of corn|🌽
carrot|🥕
garlic|🧄
onion|🧅
potato|🥔
croissant|🥐
bread|🍞
baguette bread|🥖
pretzel|🥨
bagel|🥯
cheese wedge|🧀
egg|🥚
cooking|🍳
waffle|🧇
pancakes|🥞
butter|🧈
bacon|🥓
hamburger|🍔
french fries|🍟
pizza|🍕
hot dog|🌭
sandwich|🥪
taco|🌮
burrito|🌯
stuffed flatbread|🥙
fried shrimp|🍤
cooked rice|🍚
curry rice|🍛
steaming bowl|🍜
spaghetti|🍝
roasted sweet potato|🍠
sushi|🍣
bento box|🍱
rice ball|🍙
dumpling|🥟
fortune cookie|🥠
pot of food|🍲
soft ice cream|🍦
doughnut|🍩
cookie|🍪
birthday cake|🎂
shortcake|🍰
cupcake|🧁
pie|🥧
chocolate bar|🍫
candy|🍬
lollipop|🍭
honey pot|🍯
baby bottle|🍼
glass of milk|🥛
hot beverage|☕
teacup without handle|🍵
bubble tea|🧋
beverage box|🧃
cup with straw|🥤
beer mug|🍺
clinking beer mugs|🍻
wine glass|🍷
cocktail glass|🍸
tropical drink|🍹
clinking glasses|🥂
tumbler glass|🥃
ice|🧊
chopsticks|🥢
fork and knife with plate|🍽️
fork and knife|🍴
spoon|🥄
salt|🧂
`,
  },
  {
    key: "activities",
    label: {
      en: "Activities",
      zh: "活动",
      ja: "アクティビティ",
      es: "Actividades",
      pt: "Atividades",
    },
    lines: `
soccer ball|⚽
basketball|🏀
american football|🏈
baseball|⚾
softball|🥎
tennis|🎾
volleyball|🏐
rugby football|🏉
flying disc|🥏
pool 8 ball|🎱
table tennis paddle|🏓
badminton|🏸
boxing glove|🥊
martial arts uniform|🥋
flag in hole|⛳
ice skate|⛸️
fishing pole|🎣
running shirt|🎽
skis|🎿
sled|🛷
curling stone|🥌
bullseye|🎯
yo-yo|🪀
kite|🪁
water pistol|🔫
video game|🎮
joystick|🕹️
game die|🎲
puzzle piece|🧩
teddy bear|🧸
spade suit|♠️
heart suit|♥️
diamond suit|♦️
club suit|♣️
chess pawn|♟️
joker|🃏
mahjong red dragon|🀄
flower playing cards|🎴
performing arts|🎭
artist palette|🎨
clapper board|🎬
microphone|🎤
headphone|🎧
musical keyboard|🎹
drum|🥁
saxophone|🎷
trumpet|🎺
guitar|🎸
violin|🎻
trophy|🏆
1st place medal|🥇
2nd place medal|🥈
3rd place medal|🥉
sports medal|🏅
military medal|🎖️
ticket|🎫
circus tent|🎪
party popper|🎉
confetti ball|🎊
balloon|🎈
wrapped gift|🎁
`,
  },
  {
    key: "travel",
    label: {
      en: "Travel & Places",
      zh: "旅行与地点",
      ja: "旅行・場所",
      es: "Viajes y lugares",
      pt: "Viagens e lugares",
    },
    lines: `
automobile|🚗
taxi|🚕
sport utility vehicle|🚙
bus|🚌
trolleybus|🚎
racing car|🏎️
police car|🚓
ambulance|🚑
fire engine|🚒
minibus|🚐
delivery truck|🚚
tractor|🚜
kick scooter|🛴
bicycle|🚲
motor scooter|🛵
motorcycle|🏍️
police car light|🚨
train|🚆
station|🚉
tram|🚊
monorail|🚝
helicopter|🚁
airplane|✈️
airplane departure|🛫
airplane arrival|🛬
rocket|🚀
flying saucer|🛸
sailboat|⛵
speedboat|🚤
passenger ship|🛳️
anchor|⚓
locomotive|🚂
world map|🗺️
compass|🧭
statue of liberty|🗽
tokyo tower|🗼
castle|🏰
japanese castle|🏯
stadium|🏟️
ferris wheel|🎡
roller coaster|🎢
mount fuji|🗻
snow-capped mountain|🏔️
mountain|⛰️
volcano|🌋
camping|🏕️
beach with umbrella|🏖️
desert|🏜️
desert island|🏝️
house|🏠
house with garden|🏡
office building|🏢
factory|🏭
foggy|🌁
night with stars|🌃
cityscape at dusk|🌆
sunset|🌇
bridge at night|🌉
hot springs|♨️
milky way|🌌
rainbow|🌈
cloud|☁️
sun behind cloud|⛅
tornado|🌪️
cloud with rain|🌧️
umbrella with rain drops|☔
high voltage|⚡
snowflake|❄️
snowman|☃️
water wave|🌊
sun|☀️
sun with face|🌞
crescent moon|🌙
full moon|🌕
star|⭐
glowing star|🌟
sparkles|✨
`,
  },
  {
    key: "objects",
    label: {
      en: "Objects",
      zh: "物品",
      ja: "物・道具",
      es: "Objetos",
      pt: "Objetos",
    },
    lines: `
watch|⌚
mobile phone|📱
mobile phone with arrow|📲
laptop|💻
keyboard|⌨️
desktop computer|🖥️
printer|🖨️
computer mouse|🖱️
floppy disk|💾
optical disk|💿
camera|📷
camera with flash|📸
video camera|📹
movie camera|🎥
television|📺
radio|📻
microscope|🔬
telescope|🔭
satellite antenna|📡
candle|🕯️
light bulb|💡
flashlight|🔦
red paper lantern|🏮
notebook|📓
books|📚
open book|📖
scroll|📜
page facing up|📄
newspaper|📰
bookmark tabs|📑
bookmark|🔖
label|🏷️
money bag|💰
coin|🪙
dollar banknote|💵
money with wings|💸
credit card|💳
receipt|🧾
envelope|✉️
e-mail|📧
incoming envelope|📨
outbox tray|📤
inbox tray|📥
package|📦
closed mailbox|📫
postbox|📮
ballot box with ballot|🗳️
pencil|✏️
pen|🖊️
paintbrush|🖌️
crayon|🖍️
memo|📝
briefcase|💼
file folder|📁
open file folder|📂
card index dividers|🗂️
calendar|📅
tear-off calendar|📆
chart increasing|📈
chart decreasing|📉
bar chart|📊
clipboard|📋
pushpin|📌
round pushpin|📍
paperclip|📎
linked paperclips|🖇️
straight ruler|📏
scissors|✂️
card file box|🗃️
wrench|🔧
hammer|🔨
axe|🪓
screwdriver|🪛
gear|⚙️
toolbox|🧰
magnet|🧲
pill|💊
syringe|💉
stethoscope|🩺
key|🔑
old key|🗝️
locked|🔒
unlocked|🔓
locked with pen|🔏
locked with key|🔐
shield|🛡️
broom|🧹
basket|🧺
roll of paper|🧻
toilet|🚽
shower|🚿
bathtub|🛁
lotion bottle|🧴
sponge|🧽
fire extinguisher|🧯
shopping cart|🛒
alarm clock|⏰
hourglass done|⌛
stopwatch|⏱️
`,
  },
  {
    key: "symbols",
    label: {
      en: "Symbols",
      zh: "符号",
      ja: "記号",
      es: "Símbolos",
      pt: "Símbolos",
    },
    lines: `
check mark button|✅
check box|☑️
check mark|✔️
cross mark|❌
cross mark button|❎
plus|➕
minus|➖
divide|➗
multiply|✖️
infinity|♾️
double exclamation mark|‼️
exclamation question mark|⁉️
red exclamation mark|❗
white exclamation mark|❕
red question mark|❓
white question mark|❔
anger symbol|💢
sweat droplets|💦
dashing away|💨
hole|🕳️
speech balloon|💬
thought balloon|💭
right anger bubble|🗯️
trade mark|™️
copyright|©️
registered|®️
wavy dash|〰️
curly loop|➰
double curly loop|➿
trident emblem|🔱
fleur-de-lis|⚜️
japanese beginner symbol|🔰
hollow red circle|⭕
prohibited|🚫
no entry|⛔
no mobile phones|📵
no one under eighteen|🔞
A button (blood type)|🅰️
B button (blood type)|🅱️
AB button (blood type)|🆎
CL button|🆑
COOL button|🆒
FREE button|🆓
NEW button|🆕
NG button|🆖
O button (blood type)|🅾️
OK button|🆗
UP! button|🆙
VS button|🆚
top arrow|🔝
soon arrow|🔜
up arrow|⬆️
down arrow|⬇️
left arrow|⬅️
right arrow|➡️
red circle|🔴
orange circle|🟠
yellow circle|🟡
green circle|🟢
blue circle|🔵
purple circle|🟣
brown circle|🟤
black circle|⚫
white circle|⚪
red square|🟥
orange square|🟧
yellow square|🟨
green square|🟩
blue square|🟦
purple square|🟪
brown square|🟫
black large square|⬛
white large square|⬜
`,
  },
];

export const EMOJI_GROUPS: EmojiGroup[] = GROUPS_RAW.map((g) => ({
  key: g.key,
  label: g.label,
  items: g.lines
    .trim()
    .split("\n")
    .map((line) => {
      const i = line.indexOf("|");
      return { name: line.slice(0, i), char: line.slice(i + 1) };
    }),
}));

export const EMOJI_ALL: EmojiItem[] = EMOJI_GROUPS.flatMap((g) => g.items);
