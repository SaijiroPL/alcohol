import { StandardDrinkInfo } from 'types/drinks'
import * as Icons from 'const/icons'

export const DRINK_INFO: StandardDrinkInfo[] = [
  {
    id: 'beerLight',
    icon: Icons.beerLight, 
    type: 'ビール', 
    subType: 'アルコール度数', 
    percent: 5, 
    volume1: 350, 
    volume2: 500, 
    unit: '杯'
  },
  {
    id: 'beerStrong',
    icon: Icons.beerStrong, 
    type: 'ビール', 
    subType: 'ストロング', 
    percent: 9, 
    volume1: 350, 
    volume2: 500, 
    unit: '杯'
  },
  {
    id: 'chuhai',
    icon: Icons.chuhai, 
    type: 'チューハイ', 
    percent: 5, 
    volume1: 350, 
    volume2: 500, 
    unit: '杯'
  },
  {
    id: 'chuhaiStrong',
    icon: Icons.chuhaiStrong, 
    type: 'チューハイ', 
    subType: 'ストロング', 
    percent: 9, 
    volume1: 350, 
    volume2: 500, 
    unit: '杯'
  },
  {
    id: 'jpWine',
    icon: Icons.jpWine, 
    type: '日本酒', 
    percent: 15,
    volume1: 180, 
    volumeStr: '',
    unit: '合'
  },
  {
    id: 'awamori',
    icon: Icons.awamori, 
    type: '泡盛(生地)', 
    percent: 35,
    volume1: 180, 
    volumeStr: 'グラス', 
    unit:'杯'
  },
  {
    id: 'shochuOrigin',
    icon: Icons.shochuStrong, 
    type: '焼酎(生地)', 
    percent: 25,
    volume1: 180, 
    volumeStr: 'グラス', 
    unit: '杯'
  },
  {
    id: 'shochuStrong',
    icon: Icons.shochuStrong, 
    type: '焼酎水割り', 
    subType: '濃いめ(6:4)', 
    percent: 15,
    volume1: 180, 
    volumeStr: 'グラス', 
    unit: '杯'
  },
  {
    id: 'shochu',
    icon: Icons.shochu, 
    type: '焼酎水割り',
    subType: '(5:5)',
    percent: 12.5,
    volume1: 180, 
    volumeStr: 'グラス', 
    unit: '杯'
  },
  {
    id: 'shochuLight',
    icon: Icons.shochuLight, 
    type: '焼酎水割り', 
    subType: '薄め(3:7)', 
    percent: 10,
    volume1: 180, 
    volumeStr: 'グラス', 
    unit: '杯'
  },
  {
    id: 'wine',
    icon: Icons.wine, 
    type: 'ワイン', 
    percent: 12, 
    volume1: 120, 
    unit: '杯'
  },
  {
    id: 'umeshurokku',
    icon: Icons.umeshurokku, 
    type: '梅酒ロック', 
    percent: 15, 
    volume1: 180, 
    unit: '杯'
  },
  {
    id: 'uisukidaburu',
    icon: Icons.uisukidaburu, 
    type: 'ウイスキーダブル', 
    percent: 43, 
    volume1: 60, 
    unit: '杯'
  },
  {
    id: 'uisukidaburuDouble',
    icon: Icons.uisukidaburu, 
    type: 'ウイスキーシングル', 
    percent: 43, 
    volume1: 30, 
    unit: '杯'
  },
  {
    id: 'haiboru',
    icon: Icons.haiboru, 
    type: 'ハイボール', 
    percent: 7, 
    volume1: 350, 
    volume2: 500, 
    unit: '杯'
  }
]