
import ParticlesTriangles from "@/components/particles/ParticlesTriangles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSkills, mockEducation, mockCertifications } from "@/data/mock";
import { GraduationCap, Award, Code2 } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <div className="container max-w-5xl mx-auto py-12 px-4 md:px-8">
                <div className="space-y-6 text-center mb-12">
                    <h1 className="text-4xl font-bold font-heading">About Me</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        I am a dedicated software engineer with a strong foundation in modern web development technologies.
                        Here is a brief overview of my skills and academic background.
                    </p>
                </div>

                <Tabs defaultValue="skills" className="w-full text-center">
                    <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto mb-8">
                        <TabsTrigger value="skills">
                            <Code2 className="w-4 h-4 mr-2" />
                            Skills
                        </TabsTrigger>
                        <TabsTrigger value="education">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Education
                        </TabsTrigger>
                        <TabsTrigger value="certifications">
                            <Award className="w-4 h-4 mr-2" />
                            Certifications
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="skills" className="space-y-8 animate-in fade-in-50 zoom-in-95 duration-500">
                        <div className="grid md:grid-cols-3 gap-8 text-left mt-8">
                            {Object.entries(mockSkills).map(([category, skills]) => (
                                <div key={category} className="space-y-4">
                                    <h3 className="text-xl font-semibold border-b pb-2">{category}</h3>
                                    <ul className="space-y-3">
                                        {skills.map((skill, index) => (
                                            <li key={index} className="flex justify-between items-center group">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className="text-sm px-2 py-1 bg-primary/10 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                    {skill.level}%
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="education" className="space-y-8 animate-in fade-in-50 zoom-in-95 duration-500">
                        <div className="max-w-2xl mx-auto text-left space-y-6 mt-8">
                            {mockEducation.map((edu, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-primary/30 py-2">
                                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-4 ring-4 ring-background" />
                                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                                    <p className="text-lg text-muted-foreground">{edu.institution}</p>
                                    <div className="inline-block px-3 py-1 my-2 text-sm font-semibold rounded-full bg-secondary text-secondary-foreground">
                                        {edu.year}
                                    </div>
                                    <p className="text-muted-foreground mt-2">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="certifications" className="space-y-8 animate-in fade-in-50 zoom-in-95 duration-500">
                        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mt-8">
                            {mockCertifications.map((cert, index) => (
                                <div key={index} className="border p-6 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 text-primary rounded-full">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold leading-tight">{cert.name}</h3>
                                            <p className="text-muted-foreground mt-1">{cert.issuer}</p>
                                            <p className="text-sm font-medium mt-2">{cert.year}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="fixed inset-0 -z-1 w-screen h-screen overflow-hidden">
                <div
                    id="ParticlesTriangles"
                    className="w-full h-full transform-gpu"
                >
                    <ParticlesTriangles />
                </div>
            </div>
        </>
    );
}
