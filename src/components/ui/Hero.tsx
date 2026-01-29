import { Link } from "react-router-dom";
import { Button } from "./Button";

const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-40 pb-20">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-10">
                <div className="space-y-6 max-w-3xl animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/50 border border-border/50 text-foreground text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">
                        New Collection 2025
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-foreground leading-[0.9]">
                        Curated Luxury <br />
                        <span className="text-muted-foreground italic font-serif">Everyday Living</span>
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl font-light tracking-wide leading-relaxed">
                        Minimalist design, maximalist quality. The new standard.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200" style={{ animationDelay: "0.2s" }}>
                    <Link to="/search">
                        <Button size="lg" className="min-w-[180px] h-12 text-base shadow-xl shadow-primary/10">
                            Shop Collection
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="outline" size="lg" className="min-w-[180px] h-12 text-base bg-background/50 backdrop-blur-sm">
                            Our Story
                        </Button>
                    </Link>
                </div>

                {/* Refined Feature Graphic - Less Dominant */}
                <div className="mt-12 w-full max-w-4xl rounded-xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/5 animate-fade-in-up delay-500 opacity-0 fill-mode-forwards" style={{ animationDelay: "0.4s" }}>
                    <div className="aspect-[2.5/1] bg-secondary/10 relative flex items-center justify-center overflow-hidden group">
                        {/* Elegant Pattern instead of solid block */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>

                        <div className="relative z-10 text-center transform transition-transform duration-700 group-hover:scale-105">
                            <span className="block text-muted-foreground/30 font-heading text-8xl font-black uppercase tracking-tighter opacity-50 mix-blend-overlay">
                                Lifestyle
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero };
