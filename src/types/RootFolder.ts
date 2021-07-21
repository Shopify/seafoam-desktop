export default class RootFolder {
  dumps: {
    id: string;
    content: string;
    methods: { name: string; seafoamNodes: SeafoamNode[] }[];
  }[];
  constructor(_filepath: string) {
    this.dumps = [
      {
        id: "dump-folder-1",
        content: "2021.07.20.13.16.44.111",
        methods: [
          {
            name: "TruffleHotSpotCompilation-17080[String#include?].bgv",
            seafoamNodes: [
              new SeafoamNode(
                "TruffleIR::String#include?()/Call Tree/Before Inline"
              ),
              new SeafoamNode(
                "TruffleIR::String#include?()/Call Tree/After Inline"
              ),
              new SeafoamNode(
                "TruffleIR::String#include?()/After phase org.graalvm.compiler.truffle.compiler.phases.inlining.AgnosticInliningPhase"
              ),
            ],
          },
          {
            name: "TruffleHotSpotCompilation-17080[String#include?]_1.bgv",
            seafoamNodes: [
              new SeafoamNode(
                "TruffleIR::String#include?()/Call Tree/Before Inline"
              ),
              new SeafoamNode(
                "TruffleIR::String#include?()/Call Tree/After Inline"
              ),
              new SeafoamNode(
                "TruffleIR::String#include?()/After phase org.graalvm.compiler.truffle.compiler.phases.inlining.AgnosticInliningPhase"
              ),
            ],
          },
        ],
      },
      {
        id: "dump-folder-2",
        content: "2021.07.20.13.16.44.999",
        methods: [
          {
            name: "TruffleHotSpotCompilation-11279[Array#size].bgv",
            seafoamNodes: [
              new SeafoamNode(
                "TruffleIR::Array#size()/Call Tree/Before Inline"
              ),
              new SeafoamNode("TruffleIR::Array#size()/Call Tree/After Inline"),
              new SeafoamNode(
                "TruffleIR::Array#size()/After phase org.graalvm.compiler.truffle.compiler.phases.inlining.AgnosticInliningPhase"
              ),
            ],
          },
          {
            name: "TruffleHotSpotCompilation-11279[Array#size]_1.bgv",
            seafoamNodes: [
              new SeafoamNode(
                "TruffleIR::Array#size()/Call Tree/Before Inline"
              ),
              new SeafoamNode("TruffleIR::Array#size()/Call Tree/After Inline"),
              new SeafoamNode(
                "TruffleIR::Array#size()/After phase org.graalvm.compiler.truffle.compiler.phases.inlining.AgnosticInliningPhase"
              ),
            ],
          },
        ],
      },
    ];
  }
}

export class SeafoamNode {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  dot(): string {
    return `
      digraph G {
        graph [bgcolor="white"];
        node0 [label="0 Start",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#e98693",fontcolor="#1a1919"];
        node31 [label="31 PiArray",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#f9f9f9",fontcolor="#1a1919"];
        node33 [label="33 π",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#f9f9f9",fontcolor="#1a1919"];
        node43 [label="43 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node59 [label="59 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node74 [label="74 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node92 [label="92 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node110 [label="110 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node125 [label="125 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node130 [label="130 π",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#f9f9f9",fontcolor="#1a1919"];
        node143 [label="143 LoadIndexed",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node293 [label="293 LoadField RubyEncoding.name",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#da2d4f",fontcolor="#ffffff"];
        node312 [label="312 Guard not, else TransferToInterpreter",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#ffa500",fontcolor="#1a1919"];
        node313 [label="313 IsNull",shape="diamond",fontname="Arial",style="filled",color="black",fillcolor="#3cb4a4",fontcolor="#1a1919"];
        node322 [label="322 Return",shape="rectangle",fontname="Arial",style="filled",color="black",fillcolor="#e98693",fontcolor="#1a1919"];
        node0 -> node43 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        inline2x31 [label="2 P(1)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline2x31 -> node31 [label="object",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        inline30x31 [label="30 C(7)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline30x31 -> node31 [label="length",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node31 -> node33 [label="object",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        node33 -> node43 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline5x43 [label="5 C(0)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline5x43 -> node43 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node43 -> node59 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node33 -> node59 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline23x59 [label="23 C(1)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline23x59 -> node59 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node59 -> node74 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node33 -> node74 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline69x74 [label="69 C(2)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline69x74 -> node74 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node74 -> node92 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node33 -> node92 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline87x92 [label="87 C(3)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline87x92 -> node92 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node92 -> node110 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node33 -> node110 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline105x110 [label="105 C(4)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline105x110 -> node110 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node110 -> node125 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node33 -> node125 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline120x125 [label="120 C(5)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline120x125 -> node125 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node125 -> node143 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node125 -> node130 [label="object",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        node33 -> node143 [label="array",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        inline138x143 [label="138 C(6)",shape="oval",fontname="Arial",style="filled",color="black",fillcolor="#d7ede7",fontcolor="#1a1919",fontsize="8"];
        inline138x143 -> node143 [label="index",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4",arrowhead="none",fontsize="8"];
        node143 -> node293 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node130 -> node293 [label="object",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        node293 -> node312 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node313 -> node312 [label="?",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        node312 -> node322 [fontname="arial",color="#da2d4f",fontcolor="#da2d4f",penwidth="2"];
        node293 -> node313 [label="value",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
        node293 -> node322 [label="result",fontname="arial",color="#3cb4a4",fontcolor="#3cb4a4"];
      }    
    `;
  }
}
