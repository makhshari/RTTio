export closeModal() {
    this.setState({attPromptVisible:false});
    this.setState({couplingPromptVisible:false});
    this.setState({modePromptVisible:false});
  }
export openAttModal() {
    this.setState({attPromptVisible:true});
  }
export openModeModal() {
    this.setState({modePromptVisible:true});
  }