import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className=" w-full mx-auto max-w-7xl">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 flex justify-center items-center">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Dnyan
              </span>
              Blog
            </Link>
          </div>
          <div>
            <div className=" grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/sign-up" target="_blank">
                    Projects
                  </Footer.Link>
                </Footer.LinkGroup>
                <Footer.LinkGroup col>
                  <Footer.Link href="/sign-up" target="_blank">
                    Dnyanu blogs
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/sign-up" target="_blank">
                    Git hub
                  </Footer.Link>
                </Footer.LinkGroup>
                <Footer.LinkGroup col>
                  <Footer.Link href="/sign-up" target="_blank">
                    Slack
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/sign-up" target="_blank">
                    Privacy policy
                  </Footer.Link>
                </Footer.LinkGroup>
                <Footer.LinkGroup col>
                  <Footer.Link href="/sign-up" target="_blank">
                    Terms & Condition
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full sm:flex sm:justify-between sm:items-center">
          <Footer.Copyright
            href="dnyanu.waghunde@gmail.com"
            by="Dnyanu's Blog"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-2 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon className="text-blue-500" href="#" icon={BsFacebook} />
            <Footer.Icon className="text-red-400" href="#" icon={BsInstagram} />
            <Footer.Icon className="text-blue-400" href="#" icon={BsTwitter} />
            <Footer.Icon className="text-blue-800" href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
