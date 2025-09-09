import React, { Suspense, useState, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import GlobalContext from "./Context/Context";
import ScrollToTopButton from "./Components/ScrollToTop"
import { useSelector } from "react-redux";
import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import { InventoryLoader } from "./dashboard/components/extra/Inventory";
// import { MassagesLoader } from "./dashboard/components/extra/Massages";
import { CommentsLoader } from "./dashboard/components/extra/Comments";
import { FavoriteTilesLoader } from "./dashboard/components/extra/FavoriteTiles";
import { UploadFileLoader } from "./dashboard/components/extra/UploadFile";
import { ResumeLoader } from "./dashboard/components/extra/Resume";
import { ResumePageLoader } from "./dashboard/components/extra/ResumePage";
import { UploadInventoryLoader } from "./dashboard/components/extra/UploadInventory";
import { UploadLoader } from "./dashboard/components/extra/Upload";
import { FilesLoader } from "./dashboard/components/extra/Files";
// import { SingleMassagesLoader } from "./dashboard/components/extra/SingleMassage";
const InteriorDesignPage = lazy(() => import("./Pages/Home/InteriorDesign"))
const ImageGalleryPage = lazy(() => import("./Pages/Elements/ImageGallery")) // بخش افتخارات و گواهی نامه ها
const ImageGalleryPage02 = lazy(() => import("./Pages/Elements/ImageGallery02"))
const ImageGalleryPage03 = lazy(() => import("./Pages/Elements/ImageGallery03"))
const WhiteHeaderPage = lazy(() => import("./Pages/Header/WhiteHeaderPage")) // header & footer
const AboutUsPage = lazy(() => import("./Pages/About/AboutUsPage"))
const ContactUsClassicPage = lazy(() => import("./Pages/Contact/ContactUsClassicPage"))
const SearchResultPage = lazy(() => import("./Pages/AdditionalPages/SearchResultPage"))
const LoginRegister = lazy(() => import("./Pages/Shop/LoginRegister"))
const SingleProduct = lazy(() => import("./Pages/Shop/SingleProduct"))
const LeftSidebar = lazy(() => import("./Pages/Shop/LeftSideBar"))
const LeftSideBarGroups = lazy(() => import( "./Pages/Shop/LeftSideBarGroups"))
const LeftSideBarTilse = lazy(() => import( "./Pages/Shop/LeftSideBarTilse"))
const BlogSimplePage = lazy(() => import("./Pages/Blogs/BlogSimple")) // آرشیو مقالات
const BlogSideImPage = lazy(() => import("./Pages/Blogs/BlogSideImg"))// آرشیو اخبار
const BlogSideImg2 = lazy(() => import( "./Pages/Blogs/BlogSideImg2"))
const BlogStandardPostPage = lazy(() => import("./Pages/Blogs/PostTypes/BlogStandardPostPage"))
const BlogStandardPostPage02 = lazy(() => import("./Pages/Blogs/PostTypes/BlogStandardPostPage02"))
const Internal = lazy(() => import( "./Pages/Egents/Internal"))
const External = lazy(() => import( "./Pages/Egents/External"))
const Collection = lazy(() => import( "./Pages/Collection/Collection"))
const Group = lazy(() => import( "./Pages/Group/Group"))
const BlogSideImage03 = lazy(() => import( "./Components/Blogs/BlogSideImage03"))
const Main = lazy(() => import( "./main"))
const ThemeProvider = lazy(() => import( './theme'))
const IndexPage = lazy(() => import( "./Pages/app"))
const Inventory = lazy(() => import( "./dashboard/components/extra/Inventory"))
const Massages = lazy(() => import( "./dashboard/components/extra/Massages"))
const Comments = lazy(() => import( "./dashboard/components/extra/Comments"))
const FavoriteTiles = lazy(() => import( "./dashboard/components/extra/FavoriteTiles"))
const Files = lazy(() => import("./dashboard/components/extra/Files"))
const Recruitment = lazy(() => import("./Pages/Recruitment"))
const Resume = lazy(() => import("./dashboard/components/extra/Resume"))
const ResumePage = lazy(() => import("./dashboard/components/extra/ResumePage"))
const UploadInventory = lazy(() => import("./dashboard/components/extra/UploadInventory"))
const Upload = lazy(() => import("./dashboard/components/extra/Upload"))
const UploadFile = lazy(() => import("./dashboard/components/extra/UploadFile"))
const Profile = lazy(() => import("./dashboard/components/extra/Profile"))
const ChangeProfileImage = lazy(() => import("./dashboard/components/extra/ChangeProfileImage"))
const ChangeProfileInfo = lazy(() => import("./dashboard/components/extra/ChangeProfileInfo"))
const SingleMassage = lazy(() => import("./dashboard/components/extra/SingleMassage"))
const BlogFullWidthPost = lazy(() => import("./Pages/Blogs/PostTypes/BlogFullWidthPost"))
// BlogFullWidthPost

export const router = createBrowserRouter(createRoutesFromElements(<>
    <Route path="login" element={<LoginRegister />} />
    <Route path="dashboard" element={<Main />} > 
      <Route index element={<IndexPage />} />
      <Route path="inventory" element={<Inventory />} loader={InventoryLoader}/>
      <Route path="massages" element={<Massages />} />
      <Route path="massages/:id" element={<SingleMassage />}/>
      <Route path="comments" element={<Comments />} loader={CommentsLoader}/>
      <Route path="favorite-tile" element={<FavoriteTiles loader={FavoriteTilesLoader}/>} />
      <Route path="files" element={<Files />} loader={FilesLoader}/>
      <Route path="files/upload" element={<UploadFile />} loader={UploadFileLoader}/>
      <Route path="resume" element={<Resume />} loader={ResumeLoader}/>
      <Route path="resume/:id" element={<ResumePage />} loader={ResumePageLoader}/>
      <Route path="upload-inventory" element={<UploadInventory />} loader={UploadInventoryLoader}/>
      <Route path="upload-inventory/upload" element={<Upload />} loader={UploadLoader}/>
      <Route path="profile" element={<Profile />} />
      <Route path="profile/edit-profile-image" element={<ChangeProfileImage />} />
      <Route path="profile/edit-profile-info" element={<ChangeProfileInfo />} />
    </Route>
    <Route element={<WhiteHeaderPage />} >
      <Route path="/" element={<InteriorDesignPage style={{ "--base-color": "#BF0D19" }} />}/>
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="certificate" >
        <Route path="internal-ce" element={<ImageGalleryPage />} />
        <Route path="internal-ce/:id" element={<BlogFullWidthPost />} />
        <Route path="external-ce" element={<ImageGalleryPage02 />} />
        <Route path="external-ce/:id" element={<BlogFullWidthPost />} />
        <Route path="honors" element={<ImageGalleryPage03 />} />
        <Route path="honors/:id" element={<BlogFullWidthPost />} />
      </Route>  
      <Route path="news" element={<BlogSideImPage />} />
      <Route path="news/:id" element={<BlogStandardPostPage style={{ "--base-color": "#C80C0C" }} />} />
      <Route path="visits" element={<BlogSideImg2 />} />
      <Route path="visits/:id" element={<BlogStandardPostPage style={{ "--base-color": "#C80C0C" }} />} />
      <Route path="product-collection" element={<LeftSidebar />} />
      <Route path="product-groups" element={<LeftSideBarGroups />} />
      <Route path="product-tilse" element={<LeftSideBarTilse />} />
      <Route path="product-collection/:id" element={<Collection />} />
      <Route path="product-groups/:id" element={<Group />} />
      <Route path="product-tilse/:id" element={<SingleProduct />} />
      <Route path="catalog" element={<BlogSideImage03 />} />
      <Route path="research" element={<BlogSimplePage />} />
      <Route path="research/:id" element={<BlogStandardPostPage02 style={{ "--base-color": "#C80C0C" }} />} /> 
      <Route path="agent"> 
        <Route path="internal-agent" element={<Internal />} />
        <Route path="external-agent" element={<External />} />
      </Route>
      <Route path="contact-us" element={<ContactUsClassicPage />} />
      <Route path="recruitment" element={<Recruitment />} /> {/* */}
      <Route path="search-result/:searched" element={<SearchResultPage />} />
    </Route>
    <Route path="*" element={<>404 not found</>} />
  </>
))

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModal, setCustomModal] = useState({
    el: null,
    isOpen: false
  })
  const language = useSelector(state => state.State.language)
  return (
    <GlobalContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        footerHeight,
        setFooterHeight,
        isModalOpen,
        setIsModalOpen,
        customModal,
        setCustomModal,}}>
      <div className={`App relative ${language === "fa-IR" ? "dir-rtl iran-sans" : "dir-ltr mulish"} `} style={{ "--header-height": `${headerHeight}px` }}>
        {<main className="relative" style={{ marginTop: headerHeight, marginBottom: footerHeight }}>
            <ScrollToTopButton />
            <AnimatePresence exitBeforeEnter>
              <ThemeProvider>
                <HelmetProvider>
                  <Suspense fallback={<></>}>
                    <RouterProvider router={router} />
                  </Suspense>
                </HelmetProvider>
              </ThemeProvider>
            </AnimatePresence>
        </main>}
      </div>
    </GlobalContext.Provider>)}

export default App;