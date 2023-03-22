import LeftPanel from '../components/leftPanel/LeftPanel'
import Header from '../components/header/Header'
import RightContainer from '../components/containers/RightContainer'
import MainContainer from '../components/containers/MainContainer'
import ItemList from '../components/lists/ItemList'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading/Loading'

const HomePage = () => {
  const { loading, data, error } = useFetch(
    'http://localhost:5500/api/categories/all',
  )

  return (
    <MainContainer>
      <LeftPanel
        topImgOpt=''
        topBtnText='calculator'
        topBtnPath='/calculator'
        bottomCard
      />

      <RightContainer gap='lg:gap-32' padding='lg:p-10' overflowAuto>
        <Header
          title='ZombieMarkt Groceries'
          subtitle='Where prices are dropped dead'
          typeWritter
          opt='px-5 lg:px-0  mt-5 lg:mt-0'
        />
        {loading ? (
          <Loading />
        ) : (
          data.categories && (
            <div className='lg:m-0 '>
              <ItemList
                array={data.categories}
                gridOpt='grid-cols-1  lg:grid-cols-4 gap-y-10 gap-x-5 md:gap-x-20 lg:gap-y-20 lg:gap-x-40 p-10 lg:p-0'
                itemContainerOpt='w-[300px] h-[150px]  lg:w-[270px] lg:h-[200px] '
                itemImg='w-32 h-32  lg:w-48 lg:h-48 object-scale-down'
                redirectToDetail={false}
              />
            </div>
          )
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default HomePage
