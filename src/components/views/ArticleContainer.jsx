import React from 'react'
import Image from 'next/image'

export default function Article() {
  return (
    <div className='container md:shadow-lg max-w-screen-md mx-auto p-4 bg-white dark:bg-neutral-800'>
      <div className=''>
          <article className='prose lg:prose-lg dark:prose-invert max-w-none font-serif'>
          <h1 className='font-sans'>Garlic bread with cheese: What the science tells us</h1>
          <p>
            For years parents have espoused the health benefits of eating garlic bread with cheese to their
            children, with the food earning such an iconic status in our culture that kids will often dress
            up as warm, cheesy loaf for Halloween.
          </p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/773px-Monet_-_Impression%2C_Sunrise.jpg" alt="There should be image" />
          <p>
          Полотно впервые экспонировалось на выставке 1874 года в бывшей мастерской фотографа Надара. С лёгкой руки журналиста Луи Леруа название произведения стало именем направления, представители которого принимали участие в этой выставке. В своей статье «Выставка импрессионистов» (1874, газета Le Charivari) Леруа написал: «Обои, и те смотрелись бы более законченно, чем это „Впечатление“!»
          </p>
          <p>Каждая секунда восхода солнца уникальна и неповторима, утверждал Моне. Мы видим на полотне бесчисленное количество оттенков серого. Резкими мазками даны мачты и доки. И огненными тонами само солнце. Такие смелые размашистые мазки многим современникам казались неопрятными, даже грубоватыми. Немало было тех, кто посчитал полотно незавершенным этюдом. Посетители выставки, на которой картина была представлена, возмущались, заявляя, что даже обойная бумага смотрелась бы лучше.</p>
          <p>
            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
            springing up around the country.
          </p>
          <Image src="/../../../assets/pexels-james-wheeler-1519088.jpg" width={400} height={288} alt="night sity"></Image>
          <p>
          Lorem Ipsum，也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野
          </p>
        </article>
      </div>
    </div>
  )
}
