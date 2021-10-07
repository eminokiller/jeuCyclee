<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 */
class Task extends EntityRef
{
    /**
     * @Groups({"survey"})
     * @ORM\OneToMany(targetEntity=Question::class, mappedBy="task")
     */
    private $questions;

    /**
     * @ORM\OneToMany(targetEntity=ActionMarketing::class, mappedBy="task")
     */
    private $actionMarketings;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $taskColor;

    /**
     * @ORM\ManyToOne(targetEntity=Admin::class, inversedBy="tasks")
     */
    private $owner;

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

    public function getTaskColor(): ?string
    {
        return $this->taskColor;
    }

    public function setTaskColor(?string $taskColor): self
    {
        $this->taskColor = $taskColor;

        return $this;
    }

    public function getOwner(): ?Admin
    {
        return $this->owner;
    }

    public function setOwner(?Admin $owner): self
    {
        $this->owner = $owner;

        return $this;
    }


}
