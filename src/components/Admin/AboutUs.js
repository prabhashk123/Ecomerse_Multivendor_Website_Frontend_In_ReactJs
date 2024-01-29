import owner from "../assets/images/owner.png.jpg";

function AboutUs() {
    return (
        <>
            <br />
            <h1 className="d-flex justify-content-center mt-5">ABOUT US</h1>
            <div className="container d-flex justify-content-center">
                <div className="col-md-10 w-75 ">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-success">Web development</strong>
                            <h3 className="mb-0">Prabhash kumar</h3>
                            <div className="mb-1 text-warning">OWNER</div>
                            <p className="mb-auto">I'm an Electronics & communication Engineer having CGPA of 7.01 who founds her
                                true passion in web development. I was curious about how this web development works and I have
                                knowledge of PYTHON ,HTML5, CSS and JAVASCRIPT. Almost immediately, I know this is what I wanted
                                to do in life! I love to make Websites Design and Website Development. And I love how there's
                                always more to learn.
                                I am seeking employment with a company where I can grow professionally and personally.
                            </p>
                            <div className="mb-1 text-warning">Goals</div>
                            <p className="mb-auto">My short term goal is to get in repuated like this field company
                                and My long term goal is to become more responser knowledgeble person.

                            </p>
                            <div className="mb-1 text-warning">Our vision</div>
                            <p className="mb-auto"> To create, share, and apply knowledge in Computer Science,
                                including in interdisciplinary areas that extend the scope of Computer Science
                                and benefit humanity; to educate students to be successful, ethical, and effective
                                problem-solvers and life-long learners who will contribute positively to the
                                economic well-being of our region and nation and who are prepared to tackle
                                complex 21st Century challenges facing the world.</p>

                            <a href="https://www.linkedin.com/in/prabhash-kumar-89a4a9170/" className="text-decoration-none"
                                target="_blank">read mores</a>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <img src={owner} className="bd-placeholder-img" width="200" height="250" alt="owner" />
                            {/* after image then name */}
                            <div data-v-5ed4af32="" className="row mt-4">
                                <div data-v-5ed4af32="" className="col-md-2"></div>
                                <div data-v-5ed4af32="" className="col-md-10">
                                    <p data-v-5ed4af32="" className="mb-0">
                                        <strong data-v-5ed4af32="">Prabhash kumar</strong>
                                    </p>

                                    <p data-v-5ed4af32="" className="mb-0 mx-3">
                                        <strong data-v-5ed4af32="">Ece.Engineer</strong>
                                    </p>
                                </div>
                            </div>
                            {/*  for gmail */}
                            <div data-v-5ed4af32="" className="row mt-2">
                                <div data-v-5ed4af32="" className="col-md-1">
                                    <i data-v-5ed4af32="" aria-hidden="true" className="fa fa-envelope mt-1"></i>
                                </div>
                                <div data-v-5ed4af32="" className="col-md-10 "><small data-v-5ed4af32="">
                                    <a data-v-5ed4af32="" href="https://mail.google.com/mail/u/1/?ogbl#"
                                        className="text-decoration-none"
                                        target="_blank">prabhashbhagat1999.bh@gmail.com</a></small></div>
                            </div>
                            {/*  for phone */}
                            <div data-v-5ed4af32="" className="row mt-1">
                                <div data-v-5ed4af32="" className="col-md-2">
                                    <i data-v-5ed4af32="" aria-hidden="true" className="fa fa-phone mt-1" ></i>
                                </div>
                                <div data-v-5ed4af32="" className="col-md-10">
                                    <small data-v-5ed4af32="">
                                        <a data-v-5ed4af32="" href="tel:+91-95705-88189" className="text-decoration-none"
                                            target="_blank">+91-95705-88189</a>
                                    </small>
                                </div>
                            </div>
                            {/*end*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
        // </section>
    )
}
export default AboutUs;