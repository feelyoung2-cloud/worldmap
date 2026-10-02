import { CountryData, LandmarkItem, QuizMatchingQuestion, LocationMissionQuestion, ConfusedPair, BadgeItem } from '../types';

export const AVATAR_IMG = "https://lh3.googleusercontent.com/aida/AEtjO1VxMw3qw9Q0AteRtw-2Aibi2BycCpYB-I06rkW9A75JA16V-AbDyyUstZQujPqVk3y1HqLNQSj5aaaBXgOVfKq_tioXLkugo3mK6qn6NskSD4tQWFJXrHPgpc6A_a9wM-l4yHNd2p4PEhGzGQXOv2_lqx4P9ebt2QzymcYaDYJDWe9ZC6vDyutqVKPq9zTOzmMAAqeVba18PXUDVozFVTgKPgQ3mC7Rt1uPu-1lDzSswBqUyQOOyse_-Sc";

// Countries dataset
export const COUNTRIES_DATA: CountryData[] = [
  {
    id: 'korea',
    name: '대한민국',
    nameEn: 'Republic of Korea',
    continent: 'asia',
    continentName: '아시아 (동아시아)',
    subRegion: '동아시아 반도',
    capital: '서울 (Seoul)',
    capitalEn: 'Seoul',
    flagEmoji: '🇰🇷',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmK-yAHe-puB5nZtzRfKJ4wDf2SCt5wr4E1quFdYQRrEacmoh_KL-IN4Pcon64UWKL1oB_OvFy7P-7kZpTHGRGahE7WkXUhyninbBAljw90gN8DO16OMu-9pmxB52Mae-Rbs_nAqLIJxN0sJzlqdP6YSxfnG_sBiZTHPIg_6bBBf4Ky0lCBo6yK_TqPamDx6RpqbWJdyk7qr6jjYyVYDqhz9qUuhGQSK4JN8Z4Lv26i4zUrMipV74dg',
    description: '대한민국은 아시아 대륙의 동쪽에 위치한 반도 국가입니다. 삼면이 바다로 둘러싸여 있으며 서쪽으로는 황해 건너 중국, 동쪽으로는 동해 건너 일본 사이에 자리잡고 있어 해양과 대륙을 잇는 중요한 위치에 있습니다.',
    keyLandmarks: ['백두산', '한강', '제주도', '동해·독도', '한라산'],
    photos: [
      {
        title: '제주 화산섬과 용암동굴',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKzpgTMMHu8e4iE_PSifPUpzx6gCcpoDTEQAzgREdiPNrdYCy1h61joTPtL5HzJgF7n8V19-Heu_qEIW2hCpI-_jHFgPDfgsSTO_H2RH6cjV0Uy-YYVaSSKy_1pJUdFWp8wHvqbpOVKPOBHHO5VSUMHm5N4VJ8W4-vRyewri3o4wwHt9Jt8F67JTcibuybHkQJ-8oINX705thbS-iYYEY3Ho1VsrkCTYIu__pXkVtgnE32Bskfq2Rwhg',
        caption: '유네스코 세계자연유산'
      },
      {
        title: '수도 서울과 한강',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT0k8QVDXwvXWY7fqDFZQT0_oKfRo7PVAKyak8Eg2wCNoNvLcEO2LLld2BYsZsuk1x7QBdJrMCZFlX9eAqULZlTT_onPv2Io3hFgJteteeY27mMcdES3vflmihIGRDEHEXYqUNraVF735D1yH0vQUOBKpRT0ns1IAE5lJX3HFOBjzA9UgicnbvKXqIE3Vh5Jnw1VI0GbtvlF2wmvh7QBwOkH2boV5-OU7Iu9fpag_3_ZbMo-gSeQFaYQ',
        caption: '정치·경제·문화의 중심지'
      }
    ],
    coordinates: { x: 760, y: 168 },
    isDiscovered: true,
    xpReward: 100
  },
  {
    id: 'brazil',
    name: '브라질',
    nameEn: 'Brazil (Federative Republic of Brazil)',
    continent: 'samerica',
    continentName: '남아메리카',
    subRegion: '남아메리카 중앙·동부',
    capital: '브라질리아 (Brasília)',
    capitalEn: 'Brasília',
    flagEmoji: '🇧🇷',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLjo-nA8dBkY90o_bTtdTkqKFn7ahBlWQjyqqVdd_GNsM0RLqze1zYc24Le3mreQ44zgfwjiTjxCnz0eoSnOS_Kv2JWlAw4FhEkV__AJbwMEG8hfyiRhuYweQgp2-VCczlF4En5XOxIYcdx1aWqEtfQDMmNQWRSKwyi6rGnvn57AABAkt9ecSR34I_B68kfpb3wJYXHFkt6ltjCC9hbfi_hhm6phdji2Bl_Ux1J-fj0VRP0ajWoRNRlg',
    description: '남아메리카에서 가장 넓은 영토와 인구를 가진 나라입니다. 지구의 허파라 불리는 아마존 열대 우림과 세계 최대의 유량을 자랑하는 아마존강이 흐르며 풍부한 생태계를 품고 있습니다.',
    keyLandmarks: ['아마존강', '열대우림', '이구아수폭포', '구속자 그리스도상'],
    photos: [
      {
        title: '아마존 열대우림과 지류',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk3wIyGpIR8Anf1iYtwqqPU60GCoJ_OrwZLDdLEjgLGS_Q3-hwGs0wqh0BzThMYFx_Bj0lTztIQKYKdj0b26S6FFrKHmsLdTwD358tVWDs58tGi0ONbImZYmr5pCrGV0P2ERPKm3f1Qg8IXBEo1Bw5pbKvcRSKA1Ztms7VAig40aZs1eFwr3vsJwJ4S5ay-Wzx384z2TOclZ5D10qigXFF08_KJrFQ3ih3oAGoQCCIXEZgnh4z-bF8WQ',
        caption: '지구의 허파 아마존'
      },
      {
        title: '수도 브라질리아 전경',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT0k8QVDXwvXWY7fqDFZQT0_oKfRo7PVAKyak8Eg2wCNoNvLcEO2LLld2BYsZsuk1x7QBdJrMCZFlX9eAqULZlTT_onPv2Io3hFgJteteeY27mMcdES3vflmihIGRDEHEXYqUNraVF735D1yH0vQUOBKpRT0ns1IAE5lJX3HFOBjzA9UgicnbvKXqIE3Vh5Jnw1VI0GbtvlF2wmvh7QBwOkH2boV5-OU7Iu9fpag_3_ZbMo-gSeQFaYQ',
        caption: '계획도시 브라질리아'
      }
    ],
    coordinates: { x: 250, y: 330 },
    isDiscovered: true,
    xpReward: 80
  },
  {
    id: 'france',
    name: '프랑스',
    nameEn: 'France (French Republic)',
    continent: 'europe',
    continentName: '유럽 (서유럽)',
    subRegion: '서유럽',
    capital: '파리 (Paris)',
    capitalEn: 'Paris',
    flagEmoji: '🇫🇷',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAH_1U9HjilYZ0oLA5KowX0mpZ0aRczlCkDGPmIHoQ0IDPlQDcmILR5fl33HZ7mW2UbWmEp87prraC7zVjrojhN7y3BiXMeMLNJiSd0TCS8hJhhAhB8fSyhNZJPTN4SURC0tgk5nq167ht8Snd3MLe2zdIvmIHcQbhZ6QjKy885kortP2hAr3rZs2BwtBYhY46XDfA4ZOJGUkORi4tkVyO5LEAo6YXSBBe7jq3LIKsWaZ8jjmx-QPuKw',
    description: '서유럽에 위치한 문화와 예술의 중심지입니다. 동남쪽에는 웅장한 알프스산맥이 국경을 이루며, 수도 파리를 가로지르는 센강을 따라 유서 깊은 문화재와 건축물이 자리 잡고 있습니다.',
    keyLandmarks: ['알프스산맥', '센강', '에펠탑', '루브르 박물관'],
    photos: [
      {
        title: '파리 에펠탑과 센강',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD95oyqs8Ud0yMUmF1KyK6LHsT_IbouEa9-4_fuxpYImKSsAKRXmk5qWqNO8wUjzFDA_hp7Aa387ZzO7OzCTl-SNBWBCMr_2AejJ_EHOrlHmm0PeRR9VAXEB36x1Qq4hDFo4LGQtbw8zj8TAo5bavKkxOcFC1pyU-ZVsnDkfY9d3YRW2Pmf42h17y8ULDqqByl3hdnYWJjEGzhQ1yMB3hE7WKY69flh6JWGKx9Bz9Gy13Fyp_8dqxkprA',
        caption: '센강변의 파리 야경'
      }
    ],
    coordinates: { x: 500, y: 130 },
    isDiscovered: true,
    xpReward: 80
  },
  {
    id: 'egypt',
    name: '이집트',
    nameEn: 'Egypt (Arab Republic of Egypt)',
    continent: 'africa',
    continentName: '아프리카 (북동아프리카)',
    subRegion: '북아프리카 권역',
    capital: '카이로 (Cairo)',
    capitalEn: 'Cairo',
    flagEmoji: '🇪🇬',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmK-yAHe-puB5nZtzRfKJ4wDf2SCt5wr4E1quFdYQRrEacmoh_KL-IN4Pcon64UWKL1oB_OvFy7P-7kZpTHGRGahE7WkXUhyninbBAljw90gN8DO16OMu-9pmxB52Mae-Rbs_nAqLIJxN0sJzlqdP6YSxfnG_sBiZTHPIg_6bBBf4Ky0lCBo6yK_TqPamDx6RpqbWJdyk7qr6jjYyVYDqhz9qUuhGQSK4JN8Z4Lv26i4zUrMipV74dg',
    description: '아프리카 대륙 북동쪽에 위치하며 지중해와 홍해를 접하고 있습니다. 세계에서 가장 긴 강 중 하나인 나일강 유역을 중심으로 찬란한 고대 문명을 꽃피웠으며, 서쪽으로는 사하라사막이 끝없이 이어집니다.',
    keyLandmarks: ['나일강', '기자의 피라미드', '스핑크스', '사하라사막'],
    photos: [
      {
        title: '기자의 피라미드',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANxBazDmZ7OfLunOQJ9VeenDZnx8T56F2QFlHT7HgDc07yvXR8uzenAdVn-0WoC002eRTiEUUHT9XeiG3ZibfcF7LJYLeUg0J72gSKb74YSF-qYK2lsHIIQTntYqSlqZUBm_EhOG1bdf8UeRXHds6xgccakMpyAct8SxWc61MmOh8nSnu-JsP735wcNQbRLHZM4dz8mYZAmmYOWLeBx9HKEtCSNqwxVIe-x69hY-VZV63xI0BERzCEOw',
        caption: '고대 7대 불가사의'
      },
      {
        title: '생명의 나일강',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt6wR-2rprbl7hg5c-tkfup_dYLt2pVx8gcjtaAGUNTOGlUbWEOrXZMTgbrvBoSyg8OBIJyRrYv_JHsMY2HY3ekUNXW9VNZVGE6RbcYSd_icpBD0kTA8Pwabuu_i8ijmUI_3PpjP05I6fnXIYG6NbRlOujnQ9lkNb64I08WxuD0l1hoznHBwIH7O1UxlGWk82fY60SRLSbk0LT_c3Tocyraefw6ASiiZ3i5brkbNlYaD9vWuvOf1GAWw',
        caption: '아프리카 문명의 젖줄'
      }
    ],
    coordinates: { x: 535, y: 225 },
    isDiscovered: true,
    xpReward: 90
  },
  {
    id: 'canada',
    name: '캐나다',
    nameEn: 'Canada',
    continent: 'namerica',
    continentName: '북아메리카',
    subRegion: '북아메리카 북부',
    capital: '오타와 (Ottawa)',
    capitalEn: 'Ottawa',
    flagEmoji: '🇨🇦',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbTeUUiwtfAeyhbmlUj0hg-scNVGON_zFf4V-Gurf1vV6JQjja2jCNBoj3M3jhRf5MRSQW6uxcD-GnZCmxRMilNEwGCqAGXTzTbtaRNo2B_gSUN5bTH0_IaiyueT8NW6b-_JBtsX2JfoaG5DBgEyysIBHVGcnsT4bJmk2CnxoX8vYx4mktRGVWPwQ-ey2BufQdvKbvds_B3SWBwONd3F6aYFFLlAStXD-s2aijAlI7d7AaL696GiWLXg',
    description: '러시아에 이어 세계에서 두 번째로 면적이 넓은 나라입니다. 광대한 삼림과 수많은 호수, 로키산맥 등 천혜의 자연경관을 자랑하며 국기 중앙의 단풍잎(Maple leaf)이 상징입니다.',
    keyLandmarks: ['로키산맥', '나이아가라 폭포', '오대호'],
    photos: [
      {
        title: '캐나디안 로키의 호수',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANSWItpFTEd1uDEnwtgqGPz0HKLH-9zwbhxmVVyWwMcyReiajr8qLvxcw9z4zIhMLA6xdMz5ReUqfi0ArVmMkrCDHrDgcY_awqbvIOEHPPGnwEzEukqufEF2MnX6_Is1Gpgulgv3lNkBTkLNo3Y4zdKPBf9j5PszA6s_xygYbLirLkWgWZzYkmJacfSmE8DxLZaE5YHskTbU__tRCH252wQLJmQJFtsfmOww9DMTvCcPUky_eNtWoFiw',
        caption: '빙하와 침엽수림'
      }
    ],
    coordinates: { x: 190, y: 120 },
    isDiscovered: true,
    xpReward: 70
  },
  {
    id: 'japan',
    name: '일본',
    nameEn: 'Japan',
    continent: 'asia',
    continentName: '아시아 (동아시아)',
    subRegion: '동아시아 열도',
    capital: '도쿄 (Tokyo)',
    capitalEn: 'Tokyo',
    flagEmoji: '🇯🇵',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmK-yAHe-puB5nZtzRfKJ4wDf2SCt5wr4E1quFdYQRrEacmoh_KL-IN4Pcon64UWKL1oB_OvFy7P-7kZpTHGRGahE7WkXUhyninbBAljw90gN8DO16OMu-9pmxB52Mae-Rbs_nAqLIJxN0sJzlqdP6YSxfnG_sBiZTHPIg_6bBBf4Ky0lCBo6yK_TqPamDx6RpqbWJdyk7qr6jjYyVYDqhz9qUuhGQSK4JN8Z4Lv26i4zUrMipV74dg',
    description: '홋카이도, 혼슈, 시코쿠, 규슈 4개의 큰 섬과 수많은 부속 섬으로 이루어진 섬나라입니다. 환태평양 조산대에 속해 있어 화산과 온천이 많으며 최고봉은 후지산입니다.',
    keyLandmarks: ['후지산', '도쿄 타워', '혼슈섬'],
    photos: [
      {
        title: '눈 덮인 후지산',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANSWItpFTEd1uDEnwtgqGPz0HKLH-9zwbhxmVVyWwMcyReiajr8qLvxcw9z4zIhMLA6xdMz5ReUqfi0ArVmMkrCDHrDgcY_awqbvIOEHPPGnwEzEukqufEF2MnX6_Is1Gpgulgv3lNkBTkLNo3Y4zdKPBf9j5PszA6s_xygYbLirLkWgWZzYkmJacfSmE8DxLZaE5YHskTbU__tRCH252wQLJmQJFtsfmOww9DMTvCcPUky_eNtWoFiw',
        caption: '일본의 상징 화산'
      }
    ],
    coordinates: { x: 790, y: 165 },
    isDiscovered: true,
    xpReward: 70
  }
];

// Landmarks Dataset
export const LANDMARKS_DATA: LandmarkItem[] = [
  {
    id: 'sahara',
    name: '사하라사막',
    nameEn: 'Sahara Desert',
    category: 'rivers-deserts',
    categoryName: '강과 사막',
    categoryIcon: 'water_drop',
    continent: '아프리카 북부',
    locationText: '아프리카 북부 전역',
    description: '사하라사막은 아프리카 북부에 있는 세계에서 가장 넓은 고온 사막입니다. 동쪽의 홍해부터 서쪽의 대서양까지 넓게 펼쳐져 있으며, 건조 기후와 모래언덕, 암석 고원이 장관을 이룹니다.',
    highlightFact: '약 920만 ㎢ (한반도의 약 40배)',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk3wIyGpIR8Anf1iYtwqqPU60GCoJ_OrwZLDdLEjgLGS_Q3-hwGs0wqh0BzThMYFx_Bj0lTztIQKYKdj0b26S6FFrKHmsLdTwD358tVWDs58tGi0ONbImZYmr5pCrGV0P2ERPKm3f1Qg8IXBEo1Bw5pbKvcRSKA1Ztms7VAig40aZs1eFwr3vsJwJ4S5ay-Wzx384z2TOclZ5D10qigXFF08_KJrFQ3ih3oAGoQCCIXEZgnh4z-bF8WQ',
    relatedCountries: ['#이집트', '#알제리', '#리비아', '#모로코'],
    progress: 100,
    isStamped: true,
    mapCoords: { x: 46, y: 48 }
  },
  {
    id: 'himalayas',
    name: '히말라야산맥',
    nameEn: 'Himalayan Mountains',
    category: 'mountains',
    categoryName: '산맥',
    categoryIcon: 'landscape',
    continent: '아시아',
    locationText: '네팔, 중국, 인도 접경',
    description: '세계의 지붕 에베레스트산(8,848m)이 솟아 있으며, 아시아 대륙의 기후를 가르는 거대한 산맥입니다. 인도판과 유라시아판이 충돌하여 솟아올랐습니다.',
    highlightFact: '최고봉 에베레스트 8,848m',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANSWItpFTEd1uDEnwtgqGPz0HKLH-9zwbhxmVVyWwMcyReiajr8qLvxcw9z4zIhMLA6xdMz5ReUqfi0ArVmMkrCDHrDgcY_awqbvIOEHPPGnwEzEukqufEF2MnX6_Is1Gpgulgv3lNkBTkLNo3Y4zdKPBf9j5PszA6s_xygYbLirLkWgWZzYkmJacfSmE8DxLZaE5YHskTbU__tRCH252wQLJmQJFtsfmOww9DMTvCcPUky_eNtWoFiw',
    relatedCountries: ['#네팔', '#중국', '#인도', '#부탄'],
    progress: 80,
    isStamped: false,
    mapCoords: { x: 70, y: 38 }
  },
  {
    id: 'nile',
    name: '나일강',
    nameEn: 'Nile River',
    category: 'rivers-deserts',
    categoryName: '강과 사막',
    categoryIcon: 'water_drop',
    continent: '아프리카',
    locationText: '이집트, 수단 등 11개국 경유',
    description: '아프리카 대륙을 남에서 북으로 흐르는 약 6,650km의 긴 강으로 이집트 고대 문명의 젖줄이 되었습니다. 지중해로 유입되기 전 거대한 삼각주(델타)를 형성합니다.',
    highlightFact: '총 길이 약 6,650km',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgO3GIPnURXmyrzhap5kh536ek2ElGladJnGRcVMB79u4oqxMk6xfzYvv0a28Zs0B8SDgl0FFZUrb3ESyba1WBf7AkgvzaEIa1Y4-fU8vj40Cf60ZLEcPOaTu6jmsNIO6N-rROKP9PCqZFwO1wfAFn4xUSOldUBkTpfq4Cw5PLeloDQ3KG1SZ3xsBRplpswYjg_YHnegXJytnAyWYckDxWU6OoyhegcHzSWiq5riq3VpDkclC5_-nf1A',
    relatedCountries: ['#이집트', '#수단', '#에티오피아', '#우간다'],
    progress: 100,
    isStamped: true,
    mapCoords: { x: 55, y: 44 }
  },
  {
    id: 'london',
    name: '런던',
    nameEn: 'London',
    category: 'cities',
    categoryName: '수도와 도시',
    categoryIcon: 'location_city',
    continent: '유럽',
    locationText: '영국 잉글랜드 남동부',
    description: '영국의 수도이자 본초자오선(경도 0도)이 지나는 그리니치 천문대가 위치한 도시입니다. 템스강을 중심으로 발달한 세계적 역사와 금융의 중심지입니다.',
    highlightFact: '본초자오선(경도 0°)의 기준점',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD95oyqs8Ud0yMUmF1KyK6LHsT_IbouEa9-4_fuxpYImKSsAKRXmk5qWqNO8wUjzFDA_hp7Aa387ZzO7OzCTl-SNBWBCMr_2AejJ_EHOrlHmm0PeRR9VAXEB36x1Qq4hDFo4LGQtbw8zj8TAo5bavKkxOcFC1pyU-ZVsnDkfY9d3YRW2Pmf42h17y8ULDqqByl3hdnYWJjEGzhQ1yMB3hE7WKY69flh6JWGKx9Bz9Gy13Fyp_8dqxkprA',
    relatedCountries: ['#영국'],
    progress: 30,
    isStamped: false,
    mapCoords: { x: 48, y: 22 }
  },
  {
    id: 'alps',
    name: '알프스산맥',
    nameEn: 'Alps',
    category: 'mountains',
    categoryName: '산맥',
    categoryIcon: 'terrain',
    continent: '유럽',
    locationText: '스위스, 프랑스, 이탈리아 등',
    description: '유럽 중남부에 솟은 1,200km 길이의 산맥으로 최고봉은 몽블랑(4,809m)입니다. 빙하 침식으로 만들어진 U자곡과 아름다운 호수가 많습니다.',
    highlightFact: '최고봉 몽블랑 4,809m',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANSWItpFTEd1uDEnwtgqGPz0HKLH-9zwbhxmVVyWwMcyReiajr8qLvxcw9z4zIhMLA6xdMz5ReUqfi0ArVmMkrCDHrDgcY_awqbvIOEHPPGnwEzEukqufEF2MnX6_Is1Gpgulgv3lNkBTkLNo3Y4zdKPBf9j5PszA6s_xygYbLirLkWgWZzYkmJacfSmE8DxLZaE5YHskTbU__tRCH252wQLJmQJFtsfmOww9DMTvCcPUky_eNtWoFiw',
    relatedCountries: ['#스위스', '#프랑스', '#이탈리아', '#오스트리아'],
    progress: 70,
    isStamped: false,
    mapCoords: { x: 48, y: 28 }
  },
  {
    id: 'amazon',
    name: '아마존강',
    nameEn: 'Amazon River',
    category: 'rivers-deserts',
    categoryName: '강과 사막',
    categoryIcon: 'water_lux',
    continent: '남아메리카',
    locationText: '브라질, 페루, 콜롬비아',
    description: '세계에서 가장 유역 면적이 넓고 유량이 많은 강으로 안데스산맥에서 발원해 대서양으로 흘러 들어갑니다.',
    highlightFact: '세계 담수 수량의 약 20%',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk3wIyGpIR8Anf1iYtwqqPU60GCoJ_OrwZLDdLEjgLGS_Q3-hwGs0wqh0BzThMYFx_Bj0lTztIQKYKdj0b26S6FFrKHmsLdTwD358tVWDs58tGi0ONbImZYmr5pCrGV0P2ERPKm3f1Qg8IXBEo1Bw5pbKvcRSKA1Ztms7VAig40aZs1eFwr3vsJwJ4S5ay-Wzx384z2TOclZ5D10qigXFF08_KJrFQ3ih3oAGoQCCIXEZgnh4z-bF8WQ',
    relatedCountries: ['#브라질', '#페루', '#콜롬비아'],
    progress: 85,
    isStamped: true,
    mapCoords: { x: 30, y: 68 }
  }
];

// Matching Challenge Questions
export const MATCHING_QUIZZES: QuizMatchingQuestion[] = [
  {
    id: 'match-stage-3',
    stage: 3,
    title: '문제 3 / 5',
    flags: [
      {
        id: 'flag-brazil',
        flagNo: 'NO.1',
        name: '국기 A',
        flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLjo-nA8dBkY90o_bTtdTkqKFn7ahBlWQjyqqVdd_GNsM0RLqze1zYc24Le3mreQ44zgfwjiTjxCnz0eoSnOS_Kv2JWlAw4FhEkV__AJbwMEG8hfyiRhuYweQgp2-VCczlF4En5XOxIYcdx1aWqEtfQDMmNQWRSKwyi6rGnvn57AABAkt9ecSR34I_B68kfpb3wJYXHFkt6ltjCC9hbfi_hhm6phdji2Bl_Ux1J-fj0VRP0ajWoRNRlg',
        alt: '브라질 국기 초록색 바탕 노란 마름모 파란 원'
      },
      {
        id: 'flag-france',
        flagNo: 'NO.2',
        name: '국기 B',
        flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAH_1U9HjilYZ0oLA5KowX0mpZ0aRczlCkDGPmIHoQ0IDPlQDcmILR5fl33HZ7mW2UbWmEp87prraC7zVjrojhN7y3BiXMeMLNJiSd0TCS8hJhhAhB8fSyhNZJPTN4SURC0tgk5nq167ht8Snd3MLe2zdIvmIHcQbhZ6QjKy885kortP2hAr3rZs2BwtBYhY46XDfA4ZOJGUkORi4tkVyO5LEAo6YXSBBe7jq3LIKsWaZ8jjmx-QPuKw',
        alt: '프랑스 삼색기 파랑 하양 빨강'
      },
      {
        id: 'flag-canada',
        flagNo: 'NO.3',
        name: '국기 C',
        flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbTeUUiwtfAeyhbmlUj0hg-scNVGON_zFf4V-Gurf1vV6JQjja2jCNBoj3M3jhRf5MRSQW6uxcD-GnZCmxRMilNEwGCqAGXTzTbtaRNo2B_gSUN5bTH0_IaiyueT8NW6b-_JBtsX2JfoaG5DBgEyysIBHVGcnsT4bJmk2CnxoX8vYx4mktRGVWPwQ-ey2BufQdvKbvds_B3SWBwONd3F6aYFFLlAStXD-s2aijAlI7d7AaL696GiWLXg',
        alt: '캐나다 단풍잎 국기'
      },
      {
        id: 'flag-korea',
        flagNo: 'NO.4',
        name: '국기 D',
        flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmK-yAHe-puB5nZtzRfKJ4wDf2SCt5wr4E1quFdYQRrEacmoh_KL-IN4Pcon64UWKL1oB_OvFy7P-7kZpTHGRGahE7WkXUhyninbBAljw90gN8DO16OMu-9pmxB52Mae-Rbs_nAqLIJxN0sJzlqdP6YSxfnG_sBiZTHPIg_6bBBf4Ky0lCBo6yK_TqPamDx6RpqbWJdyk7qr6jjYyVYDqhz9qUuhGQSK4JN8Z4Lv26i4zUrMipV74dg',
        alt: '대한민국 태극기'
      }
    ],
    countries: [
      { id: 'france', name: '프랑스', pronounceText: '프랑스, France' },
      { id: 'korea', name: '대한민국', pronounceText: '대한민국, Republic of Korea' },
      { id: 'brazil', name: '브라질', pronounceText: '브라질, Brazil' },
      { id: 'canada', name: '캐나다', pronounceText: '캐나다, Canada' }
    ],
    correctPairs: {
      'flag-brazil': 'brazil',
      'flag-france': 'france',
      'flag-canada': 'canada',
      'flag-korea': 'korea'
    },
    successInfo: {
      countryName: '브라질',
      flagEmoji: '🇧🇷',
      continentName: '남아메리카 • 브라질 연방공화국',
      capital: '브라질리아',
      title: '🎉 정답이에요!',
      description: '이 국기는 브라질의 국기예요. 남아메리카 대륙에서 가장 넓은 면적을 차지하는 나라랍니다!',
      xp: 20
    }
  }
];

// Location Mission Questions
export const LOCATION_MISSION_EGYPT: LocationMissionQuestion = {
  id: 'mission-egypt',
  targetCountry: '이집트',
  targetCountryEn: 'Egypt',
  pronunciationText: '이집트 [Egypt / ˈiːdʒɪpt]',
  subRegion: '북아프리카 권역',
  flagEmoji: '🇪🇬',
  flagColors: '빨강-하양-검정 삼색에 금빛 살라딘 독수리 문장',
  hints: [
    {
      id: 1,
      title: '힌트 1 • 대륙 확인',
      status: '완료',
      content: '🌍 아프리카 대륙에 있어요.'
    },
    {
      id: 2,
      title: '힌트 2 • 방위 & 주변 바다',
      status: '확인 중',
      content: '🧭 아프리카의 북동쪽에 위치하며 지중해와 홍해와 닿아 있어요.'
    },
    {
      id: 3,
      title: '힌트 3 • 지도 강조 효과',
      status: '지도 활성화',
      content: '🗺️ 지도에서 해당 구역이 황금색으로 반짝여요.'
    },
    {
      id: 4,
      title: '힌트 4 • 국가 상징',
      status: '국기 정보',
      content: '🇪🇬 빨강-하양-검정 삼색에 금빛 독수리 문장이 있는 국기예요. 수도는 카이로!'
    }
  ],
  landmarks: [
    {
      name: '기자의 피라미드',
      desc: '고대 세계 7대 불가사의 중 하나인 거대한 피라미드입니다.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANxBazDmZ7OfLunOQJ9VeenDZnx8T56F2QFlHT7HgDc07yvXR8uzenAdVn-0WoC002eRTiEUUHT9XeiG3ZibfcF7LJYLeUg0J72gSKb74YSF-qYK2lsHIIQTntYqSlqZUBm_EhOG1bdf8UeRXHds6xgccakMpyAct8SxWc61MmOh8nSnu-JsP735wcNQbRLHZM4dz8mYZAmmYOWLeBx9HKEtCSNqwxVIe-x69hY-VZV63xI0BERzCEOw'
    },
    {
      name: '생명의 나일강',
      desc: '이집트 문명을 꽃피운 아프리카 대륙의 젖줄입니다.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt6wR-2rprbl7hg5c-tkfup_dYLt2pVx8gcjtaAGUNTOGlUbWEOrXZMTgbrvBoSyg8OBIJyRrYv_JHsMY2HY3ekUNXW9VNZVGE6RbcYSd_icpBD0kTA8Pwabuu_i8ijmUI_3PpjP05I6fnXIYG6NbRlOujnQ9lkNb64I08WxuD0l1hoznHBwIH7O1UxlGWk82fY60SRLSbk0LT_c3Tocyraefw6ASiiZ3i5brkbNlYaD9vWuvOf1GAWw'
    }
  ]
};

// Badges Dataset
export const BADGES_DATA: BadgeItem[] = [
  {
    id: 'badge-flags',
    title: '국기 탐험가',
    icon: '🏅',
    desc: '30개 이상의 세계 국기 퀴즈 통과',
    description: '30개 이상의 세계 국기 퀴즈 통과',
    status: '획득 완료',
    unlocked: true
  },
  {
    id: 'badge-asia',
    title: '아시아 전문가',
    icon: '🌏',
    desc: '아시아 10개국 위치와 수도 모두 탐색',
    description: '아시아 10개국 위치와 수도 모두 탐색',
    status: '획득 완료',
    unlocked: true
  },
  {
    id: 'badge-atlas-doctor',
    title: '세계 지도 박사',
    icon: '🗺️',
    desc: '경위도선과 5대양 6대주 위치 마스터하기',
    description: '경위도선과 5대양 6대주 위치 마스터하기',
    status: '진행중',
    progressPercent: 70,
    progressText: '진행중 (70%)',
    unlocked: false
  },
  {
    id: 'badge-landmarks',
    title: '지명 찾기 달인',
    icon: '🏔️',
    desc: '산맥, 하천, 사막 등 15곳 이상 정확히 발견',
    description: '산맥, 하천, 사막 등 15곳 이상 정확히 발견',
    status: '획득 완료',
    unlocked: true
  },
  {
    id: 'badge-seven-continents',
    title: '일곱 대륙 탐험가',
    icon: '🧭',
    desc: '모든 대륙의 대표 지형과 주요 국가 탐색',
    description: '모든 대륙의 대표 지형과 주요 국가 탐색',
    status: '진행중',
    progressPercent: 71,
    progressText: '진행중 5/7',
    unlocked: false
  }
];

// Frequently Confused Pairs
export const CONFUSED_PAIRS: ConfusedPair[] = [
  {
    id: 'pair-monaco-indonesia',
    title: '국기 비율이 다른 빨강-하양 쌍둥이',
    errorRate: '오답률 45%',
    itemA: {
      name: '모나코',
      flagEmoji: '🇲🇨',
      detail: '비율 4:5 (더 통통하고 정사각에 가까움)'
    },
    itemB: {
      name: '인도네시아',
      flagEmoji: '🇮🇩',
      detail: '비율 2:3 (더 가로로 김)'
    },
    question: '위쪽은 빨강, 아래쪽은 하양인 두 국기 중, 가로세로 비율이 4:5로 더 정사각형에 가까운 유럽의 나라는 어디일까요?',
    options: ['모나코', '인도네시아', '폴란드', '싱가포르'],
    correctIndex: 0,
    explanation: '모나코는 4:5 비율로 더 통통하며, 인도네시아는 2:3 비율로 가로가 더 긴 직사각형입니다. 폴란드는 반대로 위가 하양, 아래가 빨강입니다!'
  },
  {
    id: 'pair-chad-romania',
    title: '파랑 명도가 살짝 다른 삼색기',
    errorRate: '오답률 40%',
    itemA: {
      name: '차드',
      flagEmoji: '🇹🇩',
      detail: '아프리카 (왼쪽 파란색이 짙은 남색)'
    },
    itemB: {
      name: '루마니아',
      flagEmoji: '🇷🇴',
      detail: '유럽 (왼쪽 파란색이 더 밝은 코발트블루)'
    },
    question: '파랑-노랑-빨강 수직 삼색기 중, 아프리카 사하라 남쪽에 위치하며 파란색이 짙은 남색(인디고)인 나라는?',
    options: ['차드', '루마니아', '벨기에', '몰도바'],
    correctIndex: 0,
    explanation: '차드의 국기는 과거 프랑스 삼색기와 범아프리카 색상을 조합하여 왼쪽 파란색이 짙은 인디고(남색)를 띱니다. 루마니아는 밝은 코발트블루입니다!'
  }
];

// Simple synthesizer sound effects using Web Audio API
class SoundPlayer {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(on?: boolean) {
    if (on !== undefined) {
      this.enabled = on;
    } else {
      this.enabled = !this.enabled;
    }
    return this.enabled;
  }

  public setMuted(muted: boolean) {
    this.enabled = !muted;
  }

  public isSoundEnabled() {
    return this.enabled;
  }

  public playPop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // ignore
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  public playChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime); // E5
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // ignore
    }
  }
}

export const soundEffects = new SoundPlayer();
export const soundPlayer = soundEffects;

// Text To Speech helper using browser SpeechSynthesis
export function speakKoreanText(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  } catch {
    // ignore
  }
}
