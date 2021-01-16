<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 */
class Task extends EntityRef
{
    /**
     * @ORM\OneToMany(targetEntity=Question::class, mappedBy="task")
     */
    private $questions;

    /**
     * @ORM\OneToMany(targetEntity=ActionMarketing::class, mappedBy="task")
     */
    private $actionMarketings;

//    /**
//     * @ORM\ManyToOne(targetEntity=Campagne::class, inversedBy="tasks")
//     */
//    private $campagne;
//
//    /**
//     * @ORM\ManyToOne(targetEntity=TypeAction::class, inversedBy="tasks")
//     */
//    private $typeAction;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
        $this->actionMarketings = new ArrayCollection();
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        $this->questions->add($question);
        $question->setTask($this);
//        if (!$this->questions->contains($question)) {
//            $this->questions[] = $question;
//            $question->setTask($this);
//        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getTask() === $this) {
                $question->setTask(null);
            }
        }

        return $this;
    }

//    public function getCampagne(): ?Campagne
//    {
//        return $this->campagne;
//    }
//
//    public function setCampagne(?Campagne $campagne): self
//    {
//        $this->campagne = $campagne;
//
//        return $this;
//    }
//
//    public function getTypeAction(): ?TypeAction
//    {
//        return $this->typeAction;
//    }
//
//    public function setTypeAction(?TypeAction $typeAction): self
//    {
//        $this->typeAction = $typeAction;
//
//        return $this;
//    }

/**
 * @return Collection|ActionMarketing[]
 */
public function getActionMarketings(): Collection
{
    return $this->actionMarketings;
}

public function addActionMarketing(ActionMarketing $actionMarketing): self
{
    if (!$this->actionMarketings->contains($actionMarketing)) {
        $this->actionMarketings[] = $actionMarketing;
        $actionMarketing->setTask($this);
    }

    return $this;
}

public function removeActionMarketing(ActionMarketing $actionMarketing): self
{
    if ($this->actionMarketings->removeElement($actionMarketing)) {
        // set the owning side to null (unless already changed)
        if ($actionMarketing->getTask() === $this) {
            $actionMarketing->setTask(null);
        }
    }

    return $this;
}


}
