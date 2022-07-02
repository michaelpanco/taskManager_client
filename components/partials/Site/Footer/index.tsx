interface Props {}

export const Footer = (props: Props) => {
    return (
        <div className="lulu-bg-1 lulu-footer">
            <div className="lulu-global-width m-auto py-10">
                <div className="flex text-white">
                    <div className="w-3/12">
                        <img src="/carelulu_logo_square_white.png" width={153} />
                    </div>
                    <div className="w-2/12">
                        <div className="text-sm mb-2 uppercase">For Parents</div>
                        <div className="text-size-13">
                            <div className="text-sm">
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Parent Resources
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    How It Works
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Testimonials
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Terms of Use
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div className="text-size-13">
                            <div className="text-sm mb-2 uppercase">For Providers</div>
                            <div className="text-sm">
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Provider Resources
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    How It Works
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Testimonials
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Terms and Conditions
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    List Your Program
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div className="text-sm mb-2 uppercase">More</div>
                        <div className="text-size-13">
                            <div className="text-sm">
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    About Us
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Press
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Jobs
                                </a>
                                <a href="" className="hover:text-slate-200 hover:underline block">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-3/12">
                        <div className="flex mb-2 justify-center">
                            <div className="footer-icon footer-icon-fb mr-2"></div>
                            <div className="footer-icon footer-icon-twitter mr-2"></div>
                            <div className="footer-icon footer-icon-instagram"></div>
                        </div>

                        <a href="" className="footer-button">
                            Help Center
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
